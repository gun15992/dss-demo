// Import Libraries
import React from 'react';
import Select from 'react-select';

// Import Assets
import '../../assets/css/features/InventoriesCheck/InventoriesCheckStatusDropdown.css';

function InventoriesCheckStatusDropdown({ selectedStatus, onSelectedStatus }) {
    const statusOptions = [
        { value: 'N', label: 'ใช้งานอยู่' },
        { value: 'F', label: 'จำหน่ายบางส่วน' },
        { value: 'W', label: 'รอจำหน่าย' },
        { value: 'Y', label: 'จำหน่ายออก' },
        { value: 'T', label: 'โอนย้าย' },
        { value: 'C', label: 'ถูกโจรกรรม' },
        { value: 'D', label: 'ชำรุด/เสื่อมสภาพ' },
        { value: 'U', label: 'หมดความจำเป็นใช้งาน' },
    ];

    const selectedOption = statusOptions.find(option => option.value === selectedStatus) || null;

    return (
        <div className="inventories-check-status-dropdown">
            <label className="dropdown-label">
                <strong>{'สถานะ'}</strong>
                <strong className="require-star">{' *'}</strong>
            </label>
            <div className="inventories-check-status-dropdown" title="สถานะของครุภัณฑ์">
                <Select className="select-status-dropdown" value={selectedOption} onChange={(option) => onSelectedStatus(option ? option.value : '')} options={statusOptions} placeholder="- เลือกสถานะ -" noOptionsMessage={() => 'ไม่พบตัวเลือก'} isClearable />
            </div>
        </div>
    );
}

export default InventoriesCheckStatusDropdown;
