// Import Libraries
import React from 'react';
import { Form } from 'react-bootstrap';

// Import Assets
import '../../assets/css/features/InventoriesCheck/InventoriesCheckYearForm.css';

function InventoriesCheckYearForm({ selectedYear, onSelectYear }) {
    const currentYear = new Date().getFullYear();
    const buddhistYears = [currentYear + 543];

    return (
        <div className="inventories-check-year-form">
            <div className="form-container" title="ปีที่ตรวจนับครุภัณฑ์">
                <label className="form-label">
                    <strong>{'ปีที่ตรวจนับครุภัณฑ์'}</strong>
                    <strong className="require-star">{' *'}</strong>
                </label>
                <Form.Control className="year-input" type="text" value={selectedYear || buddhistYear} onChange={(e) => onSelectYear(e.target.value)} disabled />
            </div>
        </div>
    );
}

export default InventoriesCheckYearForm;