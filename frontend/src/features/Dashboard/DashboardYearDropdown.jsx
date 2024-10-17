// Import Libraries
import React from 'react';
import Select from 'react-select';

// Import Assets
import '../../assets/css/features/Dashboard/DashboardYearDropdown.css';

function DashboardYearDropdown({ years, selectedYear, onSelectYear }) {
    const options = years.map((year) => ({
        value: year,
        label: year,
    }));

    const selectedOption = selectedYear ? {
        value: selectedYear,
        label: selectedYear,
    }: null;

    return (
        <div className="mb-3" title="ปีที่ตรวจนับครุภัณฑ์">
            <Select className="select-year-dropdown" value={selectedOption} onChange={(option) => onSelectYear(option ? option.value : '')} options={options} placeholder="- เลือกปี -" noOptionsMessage={() => 'ไม่พบตัวเลือก'} isClearable />
        </div>
    );
}

export default DashboardYearDropdown;