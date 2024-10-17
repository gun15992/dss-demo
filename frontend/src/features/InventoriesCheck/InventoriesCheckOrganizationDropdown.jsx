// Import Libraries
import Select from 'react-select';
import React, { useState } from 'react';

// Import Assets
import '../../assets/css/features/InventoriesCheck/InventoriesCheckOrganizationDropdown.css';

function InventoriesCheckOrganizationDropdown({ organizations, selectedOrganization, onSelectOrganization }) {
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [selectedSubDivision, setSelectedSubDivision] = useState(null);

    const divisions = organizations || [];
    const selectedDivisionData = divisions.find(division => division.division_id === selectedDivision);
    const selectedSubDivisions = selectedDivisionData?.sub || [];

    const updateDivision = (updatedFields) => {
        const newDivision = {
            divisionId: selectedDivision,
            divisionName: divisions.find(division => division.division_id === selectedDivision)?.division_name || null,
            subDivisionId: selectedSubDivision,
            subDivisionName: selectedSubDivisions.find(subDivision => subDivision.sub_division_id === selectedSubDivision)?.sub_division_name || null,
            ...updatedFields
        };
        onSelectOrganization(newDivision);
    };

    const handleDivisionSelect = (division) => {
        const newDivisionId = division ? division.value : null;
        setSelectedDivision(newDivisionId);
        setSelectedSubDivision(null);
        updateDivision({ divisionId: newDivisionId, subDivisionId: null });
    };

    const handleSubDivisionSelect = (subDivision) => {
        const newSubDivisionId = subDivision ? subDivision.value : null;
        setSelectedSubDivision(newSubDivisionId);
        updateDivision({ subDivisionId: newSubDivisionId });
    };

    const divisionOptions = divisions.map(division => ({
        value: division.division_id,
        label: division.division_name,
    }));

    const subDivisionOptions = selectedSubDivisions.map(subDivision => ({
        value: subDivision.sub_division_id,
        label: subDivision.sub_division_name,
    }));

    return (
        <div className="inventories-check-division-dropdown">
            <label className="dropdown-label">
                <strong>{'หน่วยงาน'}</strong>
                <strong className="require-star">{' *'}</strong>
            </label>
            <div className="dropdown-container" title="กอง/สำนัก">
                <Select className="select-division-dropdown" value={divisionOptions.find(option => option.value === selectedDivision)} onChange={handleDivisionSelect} options={divisionOptions} placeholder="- เลือกกอง/สำนัก -" noOptionsMessage={() => "ไม่พบตัวเลือก"} isClearable />
            </div>
            {selectedDivision && selectedSubDivisions.length > 0 && (
                <div className="dropdown-container" title="กลุ่มงาน/ฝ่าย">
                    <Select className="select-sub-division-dropdown" value={subDivisionOptions.find(option => option.value === selectedSubDivision)} onChange={handleSubDivisionSelect} options={subDivisionOptions} placeholder="- เลือกกลุ่มงาน/ฝ่าย -" noOptionsMessage={() => "ไม่พบตัวเลือก"} isClearable />
                </div>
            )}
        </div>
    );
}

export default InventoriesCheckOrganizationDropdown;