// Import Libraries
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { CNavbar, CNavbarNav, CNavLink, CContainer, CNavbarBrand, CNavItem, CNavbarToggler, CCollapse, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider, CForm, CFormInput, CButton } from '@coreui/react';

// Import Assets
import '@assets/css/components/layouts/Header.css';

// Import Components
import Navbar from '../navbar/Navbar';

function Header() {    
    return (
        <>
            <Navbar />
        </>
    );
}

export default Header;