// Import Libraries
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { CNavbar, CNavbarNav, CNavLink, CContainer, CNavbarBrand, CNavItem, CNavbarToggler, CCollapse, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider, CForm, CFormInput, CButton } from '@coreui/react';

// Import Assets
import '@assets/css/components/navbar/Navbar.css';

// Import Utilities
import { getPublicUrl } from '../../utils/getUrl';

// Import Icons
import Hamburger from 'hamburger-react'
import { LuLogOut } from 'react-icons/lu';
import { BsPersonFill } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";

function Navbar() {
    const logoImage = getPublicUrl('logo.png');

    const location = useLocation();
    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    const handleNavLinkClick = (path) => {
        setIsHamburgerOpen(false);
        navigate(path);
    };

    const handleLogoutClick = () => {
        setIsDropdownOpen(false);
        navigate('/logout');
    };
    
    return (
        <CNavbar expand="lg" colorScheme="dark" className="bg-dark position-fixed top-0 w-100" style={{ zIndex: 100 }}>
            <CContainer fluid className="core-container">
                <div className="full-navbar d-flex align-items-center w-100">
                    <CNavbarBrand className="navbar-band" href="/dashboard">
                        <img src={logoImage} className="logo-image" width="30" height="30" />{' '}
                        {'ระบบตรวจนับครุภัณฑ์'}
                    </CNavbarBrand>
                    <Hamburger color="#8e8e8e" size={30} toggled={isHamburgerOpen} toggle={setIsHamburgerOpen} />
                    <CCollapse className="navbar-collapse" visible={isHamburgerOpen}>
                        <CNavbarNav className="me-auto w-100 d-flex justify-content-center">
                            <CNavItem>
                                <CNavLink className={location.pathname === '/dashboard' ? 'active' : ''} onClick={() => handleNavLinkClick('/dashboard')}>
                                    {'สรุปข้อมูล'}
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className={location.pathname === '/inventories' ? 'active' : ''} onClick={() => handleNavLinkClick('/inventories')}>
                                    {'ข้อมูลครุภัณฑ์'}
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className={location.pathname === '/inventories/qrcode' ? 'active' : ''} onClick={() => handleNavLinkClick('/inventories/qrcode')}>
                                    {'สร้างรหัสคิวอาร์ครุภัณฑ์'}
                                </CNavLink>
                            </CNavItem>
                            {/* <CNavItem>
                                <CNavLink className={location.pathname === '/inventories/type' ? 'active' : ''} onClick={() => handleNavLinkClick('/inventories/type')}>
                                    {'ประเภทครุภัณฑ์'}
                                </CNavLink>
                            </CNavItem> */}
                            <CNavItem>
                                <CNavLink className={location.pathname === '/inventories/check' ? 'active' : ''} onClick={() => handleNavLinkClick('/inventories/check')}>
                                    {'ตรวจนับครุภัณฑ์'}
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className={location.pathname === '/inventories/check/list' ? 'active' : ''} onClick={() => handleNavLinkClick('/inventories/check/list')}>
                                    {'ประวัติการตรวจนับครุภัณฑ์'}
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className={location.pathname === '/manual' ? 'active' : ''} onClick={() => handleNavLinkClick('/manual')}>
                                    {'คู่มือการใช้งานระบบ'}
                                </CNavLink>
                            </CNavItem>
                            {/* <CNavItem>
                                <CNavLink className={location.pathname === '/about' ? 'active' : ''} onClick={() => handleNavLinkClick('/about')}>
                                    {'เกี่ยวกับระบบ'}
                                </CNavLink>
                            </CNavItem> */}
                        </CNavbarNav>
                        <CDropdown className="navbar-login-dropdown" visible={isDropdownOpen} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <CDropdownToggle>
                                <BsPersonFill className="bs-person" size={20} />
                                {'ผู้ดูแลระบบ'}
                                <MdKeyboardArrowDown className={`arrow-toggle ${isDropdownOpen ? 'rotate' : ''}`} size={20} />
                            </CDropdownToggle>
                            <CDropdownMenu className="navbar-login-menu">
                                <CDropdownItem onClick={handleLogoutClick}>
                                    <LuLogOut className="lu-logout" title="ออกจากระบบ" size={20} />
                                    {'ออกจากระบบ'}
                                </CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </CCollapse>
                </div>
            </CContainer>
        </CNavbar>
    );
}

export default Navbar;