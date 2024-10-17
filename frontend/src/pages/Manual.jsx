// Import Libraries
import React from 'react';
import Swal from 'sweetalert2';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Container, Card, Row, Col } from 'react-bootstrap';

// Import Assets
import '@assets/css/global.css';
import '@assets/css/pages/Manual.css';

// Import Components
import Layout from '@components/layouts/Layout';
import { BlueOutlineButton, GrayOutlineButton } from '@components/buttons/OutlineButton';

// Import Utilities
import { getApiUrl, getPublicUrl, getPdfUrl } from '@utils/getUrl';

// Import Icons
import { FiDownload } from "react-icons/fi";
import { MdOutlineCollectionsBookmark } from "react-icons/md";

function Manual() {
    const webTitle = 'คู่มือการใช้งานระบบ';

    const apiUrl = getApiUrl();
    const pdfUrl = getPdfUrl('manual.pdf');
    const logoImage = getPublicUrl('logo.png');

    const handleDownload = () => {
        Swal.fire({
            title: "ต้องการดาวน์โหลดคู่มือการใช้งานระบบตรวจนับครุภัณฑ์หรือไม่?",
            text: "หากต้องการดาวน์โหลดคู่มือการใช้งานระบบตรวจนับครุภัณฑ์เป็นไฟล์ PDF กรุณากดปุ่มดาวน์โหลด",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "ดาวน์โหลด",
            cancelButtonColor: "#d33",
            cancelButtonText: "ยกเลิก"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    const link = document.createElement('a');
                    link.href = pdfUrl;
                    link.download = 'Manual.pdf';
                    link.click();
                    Swal.fire({
                        icon: 'success',
                        title: 'ดาวน์โหลดคู่มือการใช้งานระบบตรวจนับครุภัณฑ์สำเร็จ!',
                        text: 'ดาวน์โหลดไฟล์ PDF เรียบร้อยแล้ว',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "ตกลง"
                    });
                }
                catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาดขณะดาวน์โหลดคู่มือการใช้งานระบบตรวจนับครุภัณฑ์!',
                        text: 'กรุณาลองใหม่อีกครั้ง',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "ตกลง"
                    });
                    console.error('เกิดข้อผิดพลาดระหว่างดาวน์โหลดคู่มือการใช้งานระบบตรวจนับครุภัณฑ์', error);
                }
            }
        });
    };

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
                                <Card.Body>
                                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                                        <Col md={6}>
                                            <h2 className="card-title responsive-header">
                                                <MdOutlineCollectionsBookmark size={30} className="m-3" />
                                                {'คู่มือการใช้งานระบบ'}
                                            </h2>
                                        </Col>
                                        <Col md={6} className="d-flex justify-content-end align-items-center mt-0">
                                            <GrayOutlineButton onClick={handleDownload}>
                                                <FiDownload size={16} className="m-1" />
                                                <span className="responsive-text-hidden">ดาวน์โหลดคู่มือ</span>
                                            </GrayOutlineButton>
                                        </Col>
                                    </div>
                                    <div className="iframe-preview">
                                        <iframe src={pdfUrl} title="PDF Preview" width="100%" height="600px" style={{ border: '1px solid #ddd', borderRadius: '8px' }}></iframe>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </HelmetProvider>        
            </Container>
        </Layout>
    );
}

export default Manual;