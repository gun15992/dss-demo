// Import Libraries
import React from 'react';

// Import Assets
import '../../assets/css/features/InventoriesCheck/InventoriesCheckTabs.css';

// Import Icons
import { MdOutlineQrCodeScanner } from "react-icons/md";

const InventoriesCheckTabs = ({ activeTab, onTabClick }) => {
    return (
        <ul className="nav nav-tabs mt-4">
            <li className="tab-item nav-item">
                <a className={`check-tab tab-link nav-link ${activeTab === 'qrcode' ? 'active' : ''}`} onClick={() => onTabClick('qrcode')} title="ตรวจนับครุภัณฑ์จากรหัสคิวอาร์">
                    <MdOutlineQrCodeScanner className="logo-qrcode" size={20} />
                    <span className="tab-text">{'ตรวจนับครุภัณฑ์จากรหัสคิวอาร์'}</span>
                </a>
            </li>
        </ul>
    );
}

export default InventoriesCheckTabs;
