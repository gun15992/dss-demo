// Import Libraries
import Select from 'react-select';
import React, { useState, useEffect } from 'react';

// Import Assets
import '@assets/css/features/InventoriesCheck/InventoriesCheckEmployeeDropdown.css';

function InventoriesCheckEmployeeDropdown({ employees, selectedEmployee, onSelectEmployee }) {
    const [selectedEmp, setSelectedEmp] = useState(selectedEmployee.empId || null);

    useEffect(() => {
        if (selectedEmployee && selectedEmployee.empId) {
            setSelectedEmp(selectedEmployee.empId);
        }
    }, [selectedEmployee]);

    const employeeList = employees || [];
    const selectedEmpData = employeeList.find(employee => employee.emp_id === selectedEmp);

    const updateEmp = (updatedFields) => {
        const newEmp = {
            empId: selectedEmp,
            ...updatedFields
        };
        onSelectEmployee(newEmp);
    };

    const handleEmpSelect = (emp) => {
        const newEmpId = emp ? emp.value : null;
        setSelectedEmp(newEmpId);
        updateEmp({ empId: newEmpId });
    };

    const empOptions = employeeList.map(employee => ({
        value: employee.emp_id,
        label: `${employee.pfix_name}${employee.emp_name}`,
    }));

    return (
        <div className="inventories-check-emp-dropdown">
            <label className="dropdown-label">
                <strong>{'ผู้รับผิดชอบ'}</strong>
                <strong className="require-star">{' *'}</strong>
            </label>
            <div className="dropdown-container" title="ผู้รับผิดชอบครุภัณฑ์">
                <Select className="select-emp-dropdown" value={empOptions.find(option => option.value === selectedEmp)} onChange={handleEmpSelect} options={empOptions} placeholder="- เลือกผู้รับผิดชอบ -" noOptionsMessage={() => "ไม่พบตัวเลือก"} isClearable />
            </div>
        </div>
    );
}

export default InventoriesCheckEmployeeDropdown;