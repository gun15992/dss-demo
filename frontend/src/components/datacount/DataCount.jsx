// Import Libraries
import React from 'react';

// Import Assets
import '../../assets/css/components/datacount/DataCount.css';

export const DataCount = ({ children, ...props }) => {
    return (
        <div className="data-count" {...props}>
            <h6>
                {'พบข้อมูล'}
                <span className="badge bg-secondary">
                    {children}
                </span>
                {'รายการ'}
            </h6>
        </div>
    );
}