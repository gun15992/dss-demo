// Import Libraries
import Select from 'react-select';
import React, { useState, useEffect } from 'react';

// Import Assets
import '@assets/css/features/Dashboard/DashBoardCheckOrganizationDropdown.css';

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

function DashboardCheckOrganizationDropdown({ selectedCheckOrg, onSelect }) {
    const [selectedCheckOrgs, setSelectedCheckOrgs] = useState([]);

    useEffect(() => {
        setSelectedCheckOrgs(selectedCheckOrg ? orgOptions.find(option => option.value.toString() === selectedCheckOrg.toString()) : null);
    }, [selectedCheckOrg]);

    const handleOrgChange = (selected) => {
        setSelectedCheckOrgs(selected);
        notifyParent(selected);
    };

    const notifyParent = (org) => {
        onSelect(org ? org.value : []);
    };

    const handleClear = () => {
        setSelectedCheckOrgs(null);
        notifyParent(null);
    };

    return (
        <div className="mb-3" title="หน่วยงานที่ดูแลครุภัณฑ์">
            <Select className="select-org-dropdown" value={selectedCheckOrgs} onChange={handleOrgChange} options={orgOptions} placeholder="- เลือกหน่วยงาน -" noOptionsMessage={() => 'ไม่พบตัวเลือก'} isClearable />
        </div>
    );
}

export default DashboardCheckOrganizationDropdown;