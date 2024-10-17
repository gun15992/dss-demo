//  Import Libraries
import Select from 'react-select';
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

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

const typeOptions = [
    { value: 1, label: 'ครุภัณฑ์ก่อสร้าง' },
    { value: 2, label: 'ครุภัณฑ์การเกษตร' },
    { value: 3, label: 'ครุภัณฑ์การแพทย์และวิทยาศาสตร์' },
    { value: 4, label: 'ครุภัณฑ์การศึกษา' },
    { value: 5, label: 'ครุภัณฑ์กีฬา/กายภาพ' },
    { value: 6, label: 'ครุภัณฑ์คอมพิวเตอร์' },
    { value: 7, label: 'ครุภัณฑ์โฆษณาและการเผยแพร่' },
    { value: 8, label: 'ครุภัณฑ์งานบ้าน/งานครัว' },
    { value: 9, label: 'ครุภัณฑ์ดนตรี/นาฏศิลป์' },
    { value: 10, label: 'ครุภัณฑ์ที่ดินของหน่วยงาน' },
    { value: 11, label: 'ครุภัณฑ์ไฟฟ้าและวิทยุ' },
    { value: 12, label: 'ครุภัณฑ์ยานพาหนะและขนส่ง' },
    { value: 13, label: 'ครุภัณฑ์โรงงาน' },
    { value: 14, label: 'ครุภัณฑ์สนาม' },
    { value: 15, label: 'ครุภัณฑ์สำนักงาน' },
    { value: 16, label: 'ครุภัณฑ์สำรวจ' },
    { value: 17, label: 'ครุภัณฑ์อาวุธ' },
    { value: 18, label: 'ครุภัณฑ์อื่นๆ' },
    { value: 19, label: 'ครุภัณฑ์ที่ดิน/ที่ราชพัสดุ' },
    { value: 20, label: 'ครุภัณฑ์โปรแกรมคอมพิวเตอร์' },
    { value: 21, label: 'สิ่งก่อสร้าง' },
    { value: 22, label: 'สิ่งปลูกสร้าง' },
    { value: 23, label: 'สินทรัพย์โครงสร้าง' },
    { value: 24, label: 'สินทรัพย์ไม่มีตัวตน' },
    { value: 25, label: 'อาคารชั่วคราว/โรงเรือน' },
    { value: 26, label: 'อาคารถาวร' }
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

const InventoriesAdvancedSearchDropdown = ({ onSearch }) => {
    const [selectedOrgs, setSelectedOrgs] = useState([]);

    const [selectedTypes, setSelectedTypes] = useState([]);
    
    const [selectedStatus, setSelectedStatus] = useState([]);

    const handleStatusChange = (selected) => {
        setSelectedStatus(selected);
        notifyParent(selected, selectedTypes, selectedOrgs);
    };

    const handleTypeChange = (selected) => {
        setSelectedTypes(selected);
        notifyParent(selectedStatus, selected, selectedOrgs);
    };

    const handleOrgChange = (selected) => {
        setSelectedOrgs(selected);
        notifyParent(selectedStatus, selectedTypes, selected);
    };

    const notifyParent = (status, types, orgs) => {
        const statusValues = status.map(option => option.value);
        const typesValues = types.map(option => option.value);
        const orgValues = orgs.map(option => option.value);
        onSearch({
            status: statusValues,
            type: typesValues,
            org: orgValues,
        });
    };

    const handleClear = () => {
        setSelectedStatus([]);
        setSelectedTypes([]);
        setSelectedOrgs([]);
        notifyParent([], [], []);
    };

    return (
        <>
            <Row>
                <Col md={4}>
                    <label>ประเภทครุภัณฑ์</label>
                    <Select className="advanced-search-options" options={typeOptions} isMulti value={selectedTypes} onChange={handleTypeChange} placeholder="- เลือกประเภท -" />
                </Col>
                <Col md={4}>
                    <label>หน่วยงาน</label>
                    <Select className="advanced-search-options" options={orgOptions} isMulti value={selectedOrgs} onChange={handleOrgChange} placeholder="- เลือกหน่วยงาน -" />
                </Col>
                <Col md={4}>
                    <label>สถานะครุภัณฑ์</label>
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

export default InventoriesAdvancedSearchDropdown;