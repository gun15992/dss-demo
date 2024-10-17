//  Import Libraries
import Select from 'react-select';
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// Import Assets
import '../../assets/css/features/inventoriesCheckList/InventoriesCheckListAdvancedSearchDropdown.css';

// Import Components
import { DarkOutlineButton, RedOutlineButton } from '../../components/buttons/OutlineButton';

// Import Icons
import { IoClose } from "react-icons/io5";

const statusOptions = [
    { value: 'N', label: 'ใช้งานอยู่' },
    { value: 'F', label: 'จำหน่ายบางส่วน' },
    { value: 'W', label: 'รอจำหน่าย' },
    { value: 'Y', label: 'จำหน่ายออก' },
    { value: 'T', label: 'โอนย้าย' },
    { value: 'C', label: 'ถูกโจรกรรม' },
    { value: 'D', label: 'ชำรุด/เสื่อมสภาพ' },
    { value: 'U', label: 'หมดความจำเป็นใช้งาน' }
];

const orgOptions = [
    { value: [1767], label: 'ส่วนกลาง' },
    { value: [1768], label: 'กลุ่มตรวจสอบภายใน (ตน.)' },
    { value: [1769], label: 'กลุ่มพัฒนาระบบบริหาร (พร.)' },
    { value: [252, 711, 1111, 1382, 1608, 1770], label: 'สำนักงานเลขานุการกรม (สล.)' },
    { value: [167, 192, 267, 767, 1447, 1627, 1778], label: 'กองเทคโนโลยีชุมชน (ทช.)' },
    { value: [274, 807, 1172, 1454, 1687, 1785], label: 'กองบริหารและรับรองห้องปฏิบัติการ (บร.)' },
    { value: [187, 280, 1692, 1790], label: 'กองพัฒนาศักยภาพนักวิทยาศาสตร์ห้องปฏิบัติการ (พศ.)' },
    { value: [188, 286, 819, 1401, 1698, 1796], label: 'กองหอสมุดและศูนย์สารสนเทศวิทยาศาสตร์และเทคโนโลยี (สท.)' },
    { value: [189, 291, 827, 1190, 1465, 1704, 1802], label: 'กองเคมีภัณฑ์และผลิตภัณฑ์อุปโภค (คอ.)' },
    { value: [190, 299, 835, 1198, 1473, 1712, 1810], label: 'กองวัสดุวิศวกรรม (วว.)' },
    { value: [191, 309, 587, 848, 1207, 1482, 1721, 1869], label: 'กองผลิตภัณฑ์อาหารและวัสดุสัมผัสอาหาร (อว.)' },
    { value: [1729, 1877], label: 'กองสอบเทียบเครื่องมือวัด (สค.)' },
    { value: [548, 856, 1733, 1881], label: 'กองบริหารจัดการทดสอบความชำนาญห้องปฏิบัติการ (บท.)' },
    { value: [1739, 1887], label: 'กองยุทธศาสตร์และแผนงาน (ยผ.)' },
    { value: [1215, 1490, 1736, 1908], label: 'กองตรวจและรับรองคุณภาพผลิตภัณฑ์ (รผ.)' }
];

const InventoriesCheckListAdvancedSearchDropdown = ({ onSearch }) => {
    const [endYear, setEndYear] = useState('');
    const [startYear, setStartYear] = useState('');
    
    const [selectedOrgs, setSelectedOrgs] = useState([]);

    const [selectedStatus, setSelectedStatus] = useState([]);

    const handleYearChange = (e, type) => {
        const value = e.target.value;
        if (type === 'start') {
            setStartYear(value);
            notifyParent(selectedStatus, selectedOrgs, value, endYear);
        } else {
            setEndYear(value);
            notifyParent(selectedStatus, selectedOrgs, startYear, value);
        }
    };

    const handleStatusChange = (selected) => {
        setSelectedStatus(selected);
        notifyParent(selected, selectedOrgs, startYear, endYear);
    };

    const handleOrgChange = (selected) => {
        setSelectedOrgs(selected);
        notifyParent(selectedStatus, selected, startYear, endYear);
    };

    const notifyParent = (status, orgs, startYear, endYear) => {
        const statusValues = status.map(option => option.value);
        const orgValues = orgs.map(option => option.value);
        onSearch({
            status: statusValues,
            org: orgValues,
            startYear: startYear,
            endYear: endYear,
        });
    };

    const handleClear = () => {
        setSelectedStatus([]);
        setSelectedOrgs([]);
        setStartYear('');
        setEndYear('');
        notifyParent([], [], '', '');
    };

    return (
        <>
            <Row>
                <Col md={4}>
                    <strong>ช่วงปีที่ตรวจนับ</strong>
                    <Row className="form-inline">
                        <Col xs={12} md={5}>
                            <input type="number" className="form-control" value={startYear} onChange={(e) => handleYearChange(e, 'start')} placeholder="ปีเริ่มต้น" />
                        </Col>
                        <Col xs={12} md={1} className="from-label-text">
                            <label>ถึง</label>
                        </Col>
                        <Col xs={12} md={5}>
                            <input type="number" className="form-control" value={endYear} onChange={(e) => handleYearChange(e, 'end')} placeholder="ปีสิ้นสุด" />
                        </Col>                
                    </Row>
                </Col>
                <Col md={4}>
                    <strong>หน่วยงาน</strong>
                    <Select className="advanced-search-options" options={orgOptions} isMulti value={selectedOrgs} onChange={handleOrgChange} placeholder="- เลือกหน่วยงาน -" />
                </Col>
                <Col md={4}>
                    <strong>สถานะครุภัณฑ์</strong>
                    <Select className="advanced-search-options" options={statusOptions} isMulti value={selectedStatus} onChange={handleStatusChange} placeholder="- เลือกสถานะ -" />
                </Col>
            </Row>
            <Row>
                <Col md={12} className="d-flex justify-content-end">
                    <RedOutlineButton className="clear-btn mt-3" title="ล้างข้อมูล" onClick={handleClear}>
                        <IoClose size={16} className="m-1" />
                        {'ล้างข้อมูล'}
                    </RedOutlineButton>
                </Col>
            </Row>
        </>
    );
};

export default InventoriesCheckListAdvancedSearchDropdown;