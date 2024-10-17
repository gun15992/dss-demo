// Import Libraries
import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Import Assets
import '@assets/css/global.css';
import '@assets/css/pages/Home.css';

// Import Components
import Layout from '@components/layouts/Layout';
import { ModernBackground } from '@components/background/Background';
import { DarkOutlineButton } from '@components/buttons/OutlineButton';

// Import Utilities
import { getPublicUrl } from '@utils/getUrl';

// Import Icons
import { IoArrowForwardCircleOutline } from "react-icons/io5";

function Home() {
    const webTitle = 'หน้าหลัก';

    const logoImage = getPublicUrl('logo.png');

    return (
        <Container fluid>
            <HelmetProvider>
                <Helmet>
                    <title>{webTitle}</title>
                    <link rel='icon' type='image/png' href={logoImage} />
                </Helmet>
            </HelmetProvider>
            <ModernBackground>
                <div className="main-content">
                    <div className="home-discription">
                        <img src={logoImage} className='m-1 mt-0' width="100" height="100" />
                        <h1>{'ยินดีต้อนรับเข้าสู่'}</h1>
                        <h3>{'ระบบจัดการครุภัณฑ์ (DSS Inventory)'}</h3>
                        <DarkOutlineButton className="using-system-button" href={"/dashboard"}>
                            {'เข้าใช้งานระบบ'}
                            <IoArrowForwardCircleOutline className="using-system-icon" size={20} />
                        </DarkOutlineButton>
                    </div>
                </div>
                <div className="home-credit">
                    &copy;{' 2024 กรมวิทยาศาสตร์บริการ (วศ.)'}<br/>
                    {'กระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม (อว.)'}
                </div>
            </ModernBackground>
        </Container>
    );
}

export default Home;