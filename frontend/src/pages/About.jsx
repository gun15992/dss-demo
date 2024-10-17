// Import Libraries
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Container, Card, Row, Col, Button, Form, Spinner } from 'react-bootstrap';

// Import Assets
import '@assets/css/global.css';
import '@assets/css/pages/About.css';

// Import Components
import Layout from '@components/layouts/Layout';

// Import Utilities
import { getApiUrl, getPublicUrl } from '@utils/getUrl';

// Import Icons
import { MdInfoOutline } from 'react-icons/md';

function About() {
    const webTitle = 'เกี่ยวกับระบบ';
    
    const apiUrl = getApiUrl();
    const logoImage = getPublicUrl('logo.png');

    return (
        <Layout>
            <Container fluid>
                <HelmetProvider>
                    <Helmet>
                        <title>{webTitle}</title>
                        <link rel='icon' type='image/png' href={logoImage} />
                    </Helmet>
                    <Row>
                        <Col md={12}>
                            <Card className="main-card">
                                <Card.Body className="mb-3">
                                    <div className="d-flex flex-wrap justify-between align-items-center">
                                        <Col md={6}>
                                            <h2 className="card-title responsive-header">
                                                <MdInfoOutline size={30} className="m-3" />
                                                {'เกี่ยวกับระบบ'}
                                            </h2>
                                        </Col>
                                    </div>
                                    <p className="header-paragraph"><b>ระบบบริหารจัดการครุภัณฑ์ (DSS Inventory System)</b></p>
                                    <p className="paragraph">เป็นระบบที่ใช้ในการบริหารจัดการครุภัณฑ์ภายในกรมวิทยาศาสตร์บริการ (วศ.) โดยภายในระบบมีความสามารถในการทำงาน ดังนี้</p>
                                    
                                    <p className="co-header-paragraph paragraph-darkblue">* สำหรับผู้ดูแลระบบ *</p>
                                    <li><b>[ ข้อมูลบัญชีผู้ใช้ ]&nbsp; -</b>&nbsp; สามารถดู / เพิ่ม / แก้ไข / ลบบัญชีผู้ใช้ทั้งหมดของบุคลากรสังกัดกรมวิทยาศาสตร์บริการ (วศ.) ได้</li>
                                    <li><b>[ ประวัติสถานะระบบ ]&nbsp; -</b>&nbsp; สามารถดู / ลบประวัติการตรวจนับครุภัณฑ์ได้ เมื่อถึงรอบการตรวจนับครุภัณฑ์ประจำปีนั้นๆ</li>

                                    <p className="co-header-paragraph paragraph-darkorange">* สำหรับเจ้าหน้าที่กลุ่มงานคลัง *</p>
                                    <li><b>[ ข้อมูลครุภัณฑ์ ]&nbsp; -</b>&nbsp; สามารถดู / เพิ่ม / แก้ไข / ลบรายละเอียดครุภัณฑ์ทั้งหมดภายในกรมวิทยาศาสตร์บริการ (วศ.) ได้ อีกทั้งยังสามารถดาวน์โหลดข้อมูลออกมาในรูปแบบของไฟล์ CSV และ PDF</li>
                                    <li><b>[ ตรวจนับครุภัณฑ์ ]&nbsp; -</b>&nbsp; สามารถบันทึกประวัติการตรวจนับครุภัณฑ์ได้ เมื่อถึงรอบการตรวจนับครุภัณฑ์ประจำปีนั้นๆ</li>
                                    
                                    <p className="co-header-paragraph paragraph-darkgray">* สำหรับผู้ใช้งานทั่วไป *</p>
                                    <li><b>[ ข้อมูลครุภัณฑ์ ]&nbsp; -</b>&nbsp; สามารถดู / เพิ่ม / แก้ไข / ลบรายละเอียดครุภัณฑ์ทั้งหมดภายในกรมวิทยาศาสตร์บริการ (วศ.) ได้ อีกทั้งยังสามารถดาวน์โหลดข้อมูลออกมาในรูปแบบของไฟล์ CSV และ PDF</li>
                                    <li><b>[ ตรวจนับครุภัณฑ์ ]&nbsp; -</b>&nbsp; สามารถบันทึกประวัติการตรวจนับครุภัณฑ์ได้ เมื่อถึงรอบการตรวจนับครุภัณฑ์ประจำปีนั้นๆ</li>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </HelmetProvider>        
            </Container>
        </Layout>
    );
}

export default About;