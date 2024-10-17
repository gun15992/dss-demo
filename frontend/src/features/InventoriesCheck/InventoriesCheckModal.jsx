// Import Libraries
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';

// Import Assets
import '../../assets/css/features/InventoriesCheck/InventoriesCheckModal.css';

// Import Components
import { GreenOutlineButton, GrayOutlineButton } from '../../components/buttons/OutlineButton';
import { GreenPillBadge, RedPillBadge, YellowPillBadge, GrayPillBadge } from '../../components/badges/PillBadges';

// Import Features
import InventoriesCheckYearForm from '../../features/InventoriesCheck/InventoriesCheckYearForm';
import InventoriesCheckRemarkForm from '../../features/InventoriesCheck/InventoriesCheckRemarkForm';
// import InventoriesCheckYearDropdown from '../../features/InventoriesCheck/InventoriesCheckYearDropdown';
import InventoriesCheckStatusDropdown from '../../features/InventoriesCheck/InventoriesCheckStatusDropdown';
import InventoriesCheckEmployeeDropdown from '../../features/InventoriesCheck/InventoriesCheckEmployeeDropdown';
import InventoriesCheckLocationDropdown from '../../features/InventoriesCheck/InventoriesCheckLocationDropdown';
import InventoriesCheckOrganizationDropdown from '../../features/InventoriesCheck/InventoriesCheckOrganizationDropdown';

// Import Utilities
import { getApiUrl } from '../../utils/getUrl';

// Import Icons
import { IoClose } from "react-icons/io5";
import { GoChecklist } from 'react-icons/go';
import { MdInfoOutline } from 'react-icons/md';
import { GrDocumentText } from 'react-icons/gr';
import { LuClipboardEdit } from "react-icons/lu";
import { FaCheck, FaSpinner } from "react-icons/fa6";

const getOrgName = (org_id) => {
    if ([1767].includes(org_id)) return 'ส่วนกลาง';
    if ([1768].includes(org_id)) return 'กลุ่มตรวจสอบภายใน (ตน.)';
    if ([1769].includes(org_id)) return 'กลุ่มพัฒนาระบบบริหาร (พร.)';
    if ([252, 711, 1111, 1382, 1608, 1770].includes(org_id)) return 'สำนักงานเลขานุการกรม (สล.)';
    if ([167, 192, 267, 767, 1447, 1627, 1778].includes(org_id)) return 'กองเทคโนโลยีชุมชน (ทช.)';
    if ([274, 807, 1172, 1454, 1687, 1785].includes(org_id)) return 'กองบริหารและรับรองห้องปฏิบัติการ (บร.)';
    if ([187, 280, 1692, 1790].includes(org_id)) return 'กองพัฒนาศักยภาพนักวิทยาศาสตร์ห้องปฏิบัติการ (พศ.)';
    if ([188, 286, 819, 1401, 1698, 1796].includes(org_id)) return 'กองหอสมุดและศูนย์สารสนเทศวิทยาศาสตร์และเทคโนโลยี (สท.)';
    if ([189, 291, 827, 1190, 1465, 1704, 1802].includes(org_id)) return 'กองเคมีภัณฑ์และผลิตภัณฑ์อุปโภค (คอ.)';
    if ([190, 299, 835, 1198, 1473, 1712, 1810].includes(org_id)) return 'กองวัสดุวิศวกรรม (วว.)';
    if ([191, 309, 587, 848, 1207, 1482, 1721, 1869].includes(org_id)) return 'กองผลิตภัณฑ์อาหารและวัสดุสัมผัสอาหาร (อว.)';
    if ([1729, 1877].includes(org_id)) return 'กองสอบเทียบเครื่องมือวัด (สค.)';
    if ([548, 856, 1733, 1881].includes(org_id)) return 'กองบริหารจัดการทดสอบความชำนาญห้องปฏิบัติการ (บท.)';
    if ([1739, 1887].includes(org_id)) return 'กองยุทธศาสตร์และแผนงาน (ยผ.)';
    if ([1215, 1490, 1736, 1908].includes(org_id)) return 'กองตรวจและรับรองคุณภาพผลิตภัณฑ์ (รผ.)';
    return 'ไม่ระบุ';
};

const InventoriesCheckModal = ({ show, onHide, inventory, division, location, title, onCheckConfirm }) => {
    const apiUrl = getApiUrl();

    const navigate = useNavigate();

    const currentDate = new Date();

    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear() + 543);

    const [selectedRemark, setSelectedRemark] = useState('');

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState({ 
        empId: null
    });

    const [selectedStatus, setSelectedStatus] = useState(inventory?.dispense_flg ?? null);

    const [selectedDivision, setSelectedDivision] = useState({ 
        divisionId: null, 
        subDivisionId: null 
    });
    
    const [selectedLocation, setSelectedLocation] = useState(() => {
        const moveHistory = inventory.move_histories?.[0];
        const selectedBuilding = location.find(building => building.building_code === moveHistory?.building_code);
        const selectedFloor = selectedBuilding?.floors.find(floor => floor.floor_no === moveHistory?.floor);
        const selectedRoom = selectedFloor?.rooms.find(room => room.room_name === moveHistory?.room_number);
        return {
            buildingCode: selectedBuilding?.building_code || null,
            buildingName: selectedBuilding?.building_name || null,
            floorCode: selectedFloor?.floor_code || null,
            floorNo: selectedFloor?.floor_no || null,
            roomId: selectedRoom?.room_id || null,
            roomName: selectedRoom?.room_name || null,
        };
    });
    
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDetailsVisible, setIsDetailsVisible] = useState(show);

    const orgName = inventory.org && inventory.org.org_id ? getOrgName(inventory.org.org_id) : 'ไม่ระบุ';

    useEffect(() => {
        fetchEmployees(selectedDivision.divisionId);
    }, [selectedDivision.divisionId]);

    async function fetchEmployees(divisionId) {
        if (!divisionId) return;
        try {
            setLoading(true);
            const response = await axios.get(`http://backoffice-api.dss.local/api/getEmployeeGroup/v2/${divisionId}`);
            setEmployees(response.data.employee || []);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดระหว่างดึงข้อมูลจาก API', error);
            notifyError('เกิดข้อผิดพลาดในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง');
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    };

    const notifySuccess = (message) => {
        toast.success(message, {
            position: "bottom-right",
            autoClose: 10000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            progressClassName: 'toast-progress-bar',
        });
    };

    const notifyError = (message) => {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 10000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            progressClassName: 'toast-progress-bar',
        });
    };

    const handleConfirm = () => {
        setIsDetailsVisible(false);
        setShowConfirm(true);
    };

    const handleCancel = () => {
        onHide();
    };
    
    const handleCheckCancel = () => {
        setShowConfirm(false);
        setIsDetailsVisible(true);
    };

    const handleCheckConfirm = async () => {
        setLoading(true);
        try {
            console.log(
                "inv_id:", inventory.id,
                "inv_sn:", inventory.inv_sn,
                "inv_name:", inventory.inv_name,
                "selectedYear:", selectedYear,
                "selectedStatus:", selectedStatus,
                "buildingCode:", selectedLocation.buildingCode,
                "buildingName:", selectedLocation.buildingName,
                "floorCode:", selectedLocation.floorCode,
                "floorNo:", selectedLocation.floorNo,
                "roomId:", selectedLocation.roomId,
                "roomName:", selectedLocation.roomName,
                "divisionId:", selectedDivision.divisionId,
                "subDivisionId:", selectedDivision.subDivisionId,
                "empId:", selectedEmployee.empId,
                "selectedRemark:", selectedRemark
            );
            await axios.post(`${apiUrl}api/postCheckHistories`, {
                inv_id: inventory.id,
                inv_sn: inventory.inv_sn,
                inv_name: inventory.inv_name,
                fiscal_year: selectedYear,
                dispense_flg: selectedStatus,
                building_code: selectedLocation.buildingCode,
                building_name: selectedLocation.buildingName,
                floor_code: selectedLocation.floorCode,
                floor_no: selectedLocation.floorNo,
                room_id: selectedLocation.roomId,
                room_name: selectedLocation.roomName,
                division_id: selectedDivision.divisionId,
                sub_division_id: selectedDivision.subDivisionId,
                owner_emp_id: selectedEmployee.empId,
                remarks: selectedRemark
            });
            console.log(
                "inv_id:", inventory.id,
                "detail:", selectedRemark,
                "building_id:", location.find(building => building.building_code === selectedLocation.buildingCode)?.building_id || null,
                "floor:", selectedLocation.floorNo,
                "room_number:", selectedLocation.roomName,
                "sub_division_id:", selectedDivision.subDivisionId,
                "owner_emp_id:", selectedEmployee.empId
            );
            await axios.post(`${apiUrl}api/postMoveHistories`, {
                inv_id: inventory.id,
                detail: selectedRemark,
                building_id: location.find(building => building.building_code === selectedLocation.buildingCode)?.building_id || null,
                floor: selectedLocation.floorNo,
                room_number: selectedLocation.roomName,
                sub_division_id: selectedDivision.subDivisionId,
                owner_emp_id: selectedEmployee.empId,
            });
            console.log(
                "check_fiscal_year:", selectedYear,
                "dispense_flg:", selectedStatus
            );
            await axios.put(`${apiUrl}api/putInventories/${inventory.id}`, {
                check_fiscal_year: selectedYear,
                dispense_flg: selectedStatus
            });
            notifySuccess('บันทึกการตรวจนับครุภัณฑ์สำเร็จ');
            setShowConfirm(false);
            setIsDetailsVisible(false);
            onHide();
            window.location.reload();
            navigate('/inventories/check'); 
        } catch (error) {
            notifyError('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal show={isDetailsVisible && show} onHide={handleCancel} size="lg" centered>
                <Modal.Header>
                    <Modal.Title>
                        <GrDocumentText size={26} className="m-2" />
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card title="รายละเอียดครุภัณฑ์">
                        <Card.Header>
                            <MdInfoOutline className="detail-info-icon" size={20} />
                            <strong className="inventory-detail-tag">รายละเอียดครุภัณฑ์</strong>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <p className="paragraph-detail-inventory">
                                <strong>{'หมายเลขครุภัณฑ์ : '}</strong>
                                {inventory.inv_sn ? inventory.inv_sn : 'ไม่ระบุ'}
                            </p>
                            <p className="paragraph-detail-inventory">
                                <strong>{'ชื่อครุภัณฑ์ : '}</strong>
                                {inventory.inv_name ? inventory.inv_name : 'ไม่ระบุ'}
                            </p>
                            <p className="paragraph-detail-inventory">
                                <strong>{'หน่วยงาน : '}</strong>
                                {Array.isArray(inventory.move_histories) && inventory.move_histories.length > 0 ? (
                                    orgName
                                ) : (
                                    'ไม่ระบุ'
                                )}
                            </p>
                            <p className="paragraph-detail-inventory">
                                <strong>{'สถานที่ตั้ง : '}</strong>
                                {inventory.move_histories[0] ? (
                                    `${inventory.move_histories[0].location}`
                                ): inventory.inv_uom ? ( 
                                    `${inventory.inv_uom}`
                                ):( 
                                    'ไม่ระบุ'
                                )}
                            </p><p className="paragraph-detail-inventory-sub-last">
                                <strong>{'ผู้รับผิดชอบ : '}</strong>
                                {inventory.move_histories[0] ? (
                                    `${inventory.move_histories[0].employee.emp_name}`
                                ):( 
                                    'ไม่ระบุ'
                                )}
                            </p>
                            <p className="paragraph-detail-inventory-last">
                                <strong>{'สถานะ : '}</strong>
                                {inventory.dispense_flg === 'N' ? (
                                    <GreenPillBadge>
                                        {'ใช้งานอยู่'}
                                    </GreenPillBadge>
                                ): inventory.dispense_flg === 'F' ? (
                                    <YellowPillBadge>
                                        {'จำหน่ายบางส่วน'}
                                    </YellowPillBadge>
                                ): inventory.dispense_flg === 'W' ? (
                                    <YellowPillBadge>
                                        {'รอจำหน่าย'}
                                    </YellowPillBadge>
                                ): inventory.dispense_flg === 'Y' ? (
                                    <RedPillBadge>
                                        {'จำหน่ายออก'}
                                    </RedPillBadge>
                                ): inventory.dispense_flg === 'T' ? (
                                    <RedPillBadge>
                                        {'โอนย้าย'}
                                    </RedPillBadge>
                                ): inventory.dispense_flg === 'C' ? (
                                    <RedPillBadge>
                                        {'ถูกโจรกรรม'}
                                    </RedPillBadge>
                                ): inventory.dispense_flg === 'D' ? (
                                    <RedPillBadge>
                                        {'ชำรุด/เสื่อมสภาพ'}
                                    </RedPillBadge>
                                ): inventory.dispense_flg === 'U' ? (
                                    <RedPillBadge>
                                        {'หมดความจำเป็นใช้งาน'}
                                    </RedPillBadge>
                                ):(
                                    <GrayPillBadge>
                                        {'ไม่ทราบสถานะ'}
                                    </GrayPillBadge>
                                )}
                            </p>
                        </Card.Body>
                    </Card>
                    <Card className="mt-3">
                        <Card.Header>
                            <LuClipboardEdit className="detail-info-icon" size={20} />
                            <strong className="check-history-record-tag">บันทึกการตรวจนับครุภัณฑ์</strong>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <InventoriesCheckYearForm selectedYear={selectedYear} onSelectYear={setSelectedYear} />
                            {/* <InventoriesCheckYearDropdown years={years} selectedYear={selectedYear} onSelectYear={setSelectedYear} /> */}
                            <InventoriesCheckLocationDropdown locations={location} selectedLocation={selectedLocation} onSelectLocation={setSelectedLocation} />
                            <InventoriesCheckOrganizationDropdown organizations={division} selectedOrganization={selectedDivision} onSelectOrganization={setSelectedDivision} />
                            {selectedDivision.divisionId && (
                                <InventoriesCheckEmployeeDropdown employees={employees} selectedEmployee={selectedEmployee} onSelectEmployee={setSelectedEmployee} />
                            )}
                            <InventoriesCheckStatusDropdown selectedStatus={selectedStatus} onSelectedStatus={setSelectedStatus} />
                            <InventoriesCheckRemarkForm selectedRemark={selectedRemark} onSelectRemark={setSelectedRemark} />
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <GreenOutlineButton className="check-btn me-2" title="ตรวจนับครุภัณฑ์" onClick={handleConfirm}>
                        <GoChecklist size={16} className="m-1" />
                        {'ยืนยันการตรวจนับ'}
                    </GreenOutlineButton>
                    <GrayOutlineButton className="check-btn me-2" title="ยกเลิก" onClick={handleCancel}>
                        <IoClose size={16} className="m-1" />
                        {'ยกเลิก'}
                    </GrayOutlineButton>
                </Modal.Footer>
            </Modal>
            <Modal show={showConfirm} onHide={handleCheckCancel} centered>
                <Modal.Header>
                    <Modal.Title>
                        <GoChecklist size={26} className="m-2" />
                        {'ยืนยันการตรวจนับครุภัณฑ์'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {'ต้องการยืนยันการตรวจนับครุภัณฑ์นี้หรือไม่ ?'}
                </Modal.Body>
                <Modal.Footer>
                    <GreenOutlineButton className="check-btn me-2" title="ยืนยันการตรวจนับครุภัณฑ์" onClick={handleCheckConfirm} disabled={loading}>
                        {loading ? <FaSpinner size={16} className="m-1 spin" /> : <GoChecklist size={16} className="m-1" />}
                        {loading ? <span>กำลังบันทึก...</span> : <span>ยืนยันการตรวจนับ</span>}
                    </GreenOutlineButton>
                    <GrayOutlineButton className="check-btn me-2" title="ยกเลิก" onClick={handleCheckCancel}>
                        <IoClose size={16} className="m-1" />
                        {'ยกเลิก'}
                    </GrayOutlineButton>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default InventoriesCheckModal;