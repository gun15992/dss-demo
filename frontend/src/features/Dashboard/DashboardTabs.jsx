// Import Libraries
import React from 'react';

// Import Assets
import '@assets/css/features/Dashboard/DashboardTabs.css';

// Import Icons
import { BsBox } from "react-icons/bs";
import { GrOrganization } from "react-icons/gr";
import { GoOrganization } from "react-icons/go";
import { AiOutlineProduct } from 'react-icons/ai';
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

const DashboardTabs = ({ activeTab, onTabClick }) => {
    return (
        <ul className="nav nav-tabs mt-4">
            <li className="tab-item nav-item">
                <a className={`dashboard-tab tab-link nav-link ${activeTab === 'inventory-summary' ? 'active' : ''}`} onClick={() => onTabClick('inventory-summary')} title="ข้อมูลครุภัณฑ์">
                    <BsBox className="logo-inventory-summary" size={20} />
                    <span className="tab-text">{'ข้อมูลครุภัณฑ์ (ทั้งหมด)'}</span>
                </a>
            </li>
            <li className="tab-item nav-item">
                <a className={`dashboard-tab tab-link nav-link ${activeTab === 'inventory-org-summary' ? 'active' : ''}`} onClick={() => onTabClick('inventory-org-summary')} title="ข้อมูลครุภัณฑ์">
                    <GoOrganization className="logo-inventory-org-summary" size={20} />
                    <span className="tab-text">{'ข้อมูลครุภัณฑ์ (ตามหน่วยงาน)'}</span>
                </a>
            </li>
            <li className="tab-item nav-item">
                <a className={`dashboard-tab tab-link nav-link ${activeTab === 'inventory-check-summary' ? 'active' : ''}`} onClick={() => onTabClick('inventory-check-summary')} title="ข้อมูลการตรวจนับครุภัณฑ์">
                    <HiOutlineClipboardDocumentCheck className="logo-inventory-check-summary" size={20} />
                    <span className="tab-text">{'ข้อมูลการตรวจนับครุภัณฑ์ (ทั้งหมด)'}</span>
                </a>
            </li>
            <li className="tab-item nav-item">
                <a className={`dashboard-tab tab-link nav-link ${activeTab === 'inventory-check-org-summary' ? 'active' : ''}`} onClick={() => onTabClick('inventory-check-org-summary')} title="ข้อมูลการตรวจนับครุภัณฑ์">
                    <GrOrganization className="logo-inventory-check-org-summary" size={20} />
                    <span className="tab-text">{'ข้อมูลการตรวจนับครุภัณฑ์ (ตามหน่วยงาน)'}</span>
                </a>
            </li>
            <li className="tab-item nav-item">
                <a className={`dashboard-tab tab-link nav-link ${activeTab === 'inventory-type-summary' ? 'active' : ''}`} onClick={() => onTabClick('inventory-type-summary')} title="ข้อมูลครุภัณฑ์">
                    <AiOutlineProduct className="logo-inventory-type-summary" size={20} />
                    <span className="tab-text">{'ข้อมูลประเภทครุภัณฑ์'}</span>
                </a>
            </li>
        </ul>
    );
}

export default DashboardTabs;
