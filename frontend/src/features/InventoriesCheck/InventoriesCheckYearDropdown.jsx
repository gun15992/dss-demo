// Import Libraries
import React from 'react';
import { Dropdown } from 'react-bootstrap';

// Import Assets
import '../../assets/css/features/InventoriesCheck/InventoriesCheckYearDropdown.css';

function InventoriesCheckYearDropdown({ selectedYear, onSelectYear }) {
    const currentYear = new Date().getFullYear();
    const buddhistYears = [currentYear + 543];

    return (
        <div className="inventories-check-location-dropdown">
            <div className="dropdown-container">
                <label className="dropdown-label">
                    <strong>{'ปีที่ตรวจนับครุภัณฑ์'}</strong>
                </label>
                <Dropdown className="mb-3" align="end">
                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" title="ปีที่ตรวจนับครุภัณฑ์">
                        {selectedYear || "- เลือกปี -"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item key={0} onClick={() => onSelectYear('')}>
                            {'- เลือกปี -'}
                        </Dropdown.Item>
                        {buddhistYears.map((year) => (
                            <Dropdown.Item key={year} onClick={() => onSelectYear(year)}>
                                {year}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default InventoriesCheckYearDropdown;