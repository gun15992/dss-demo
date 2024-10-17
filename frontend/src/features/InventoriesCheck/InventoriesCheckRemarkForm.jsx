// Import Libraries
import React from 'react';
import { Form } from 'react-bootstrap';

// Import Assets
import '@assets/css/features/InventoriesCheck/InventoriesCheckRemarkForm.css';

function InventoriesCheckRemarkForm({ selectedRemark, onSelectRemark }) {

    return (
        <div className="inventories-check-remark-form">
            <div className="form-container" title="หมายเหตุ">
                <label className="form-label">
                    <strong>{'หมายเหตุ'}</strong>
                </label>
                <Form.Control className="remark-input" as="textarea" rows={5} placeholder="หากต้องการอธิบายเพิ่มเติม สามารถพิมพ์ได้ที่นี่..." value={selectedRemark || ''} onChange={(e) => onSelectRemark(e.target.value)} />
            </div>
        </div>
    );
}

export default InventoriesCheckRemarkForm;