// Import Libraries
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';

// Import Assets
import '../assets/css/global.css';
import '../assets/css/pages/InventoriesType.css';

// Import Components
import Loader from '../components/loader/Loader';
import Layout from '../components/layouts/Layout';

// Import Utilities
import { getApiUrl, getPublicUrl } from '../utils/getUrl';

// Import Icons
import { AiOutlineProduct } from 'react-icons/ai';

function InventoriesType() {
    const webTitle = 'ประเภทครุภัณฑ์';
    
    const apiUrl = getApiUrl();
    const logoImage = getPublicUrl('logo.png');

    const [inventoriesCount, setInventoriesCount] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCountInventories();
    }, []);

    async function fetchCountInventories() {
        try {
            const response = await axios.get(`${apiUrl}api/getCountInventories`);
            setInventoriesCount(response.data.data);
        } 
        catch (error) {
            console.error('เกิดข้อผิดพลาดระหว่างดึงข้อมูลจาก API', error);
        }
        finally {
            setLoading(false);
        }
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
                                    <div className="d-flex flex-wrap justify-between align-items-center">
                                        <Col md={6}>
                                            <h2 className="card-title responsive-header">
                                                <AiOutlineProduct size={30} className="m-3" />
                                                {'ประเภทครุภัณฑ์'}
                                            </h2>
                                        </Col>
                                    </div>
                                    {loading ? (
                                        <Loader className="loader-bar" />
                                    ):(
                                        <>
                                            <Row className="mt-3">
                                                <Col md={12} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์ที่ใช้งานอยู่</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.total.total_sum_all : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์ที่ระบุประเภทครุภัณฑ์</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.total.total_sum_have_type : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์ที่ไม่ได้ระบุประเภทครุภัณฑ์</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.total.total_sum_have_not_type : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์ก่อสร้าง</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.building : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์การเกษตร</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.agri : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์การแพทย์และวิทยาศาสตร์</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.med_sci : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์การศึกษา</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.edu : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์กีฬา/กายภาพ</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.sport : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์คอมพิวเตอร์</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.com : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์โฆษณาและการเผยแพร่</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.pr : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์งานบ้าน/งานครัว</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.kitchen : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์ดนตรี/นาฏศิลป์</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.art : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์ที่ดินของหน่วยงาน</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.land : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์ไฟฟ้าและวิทยุ</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.electric : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์ยานพาหนะและขนส่ง</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.car : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์โรงงาน</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.factory : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์สนาม</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.ground : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์สำนักงาน</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.office : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์สำรวจ</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.survey : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์อาวุธ</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.weapon : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์ที่ดิน/ที่ราชพัสดุ</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.gov_ground : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์โปรแกรมคอมพิวเตอร์</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.program : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">สิ่งก่อสร้าง</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.build : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">สิ่งปลูกสร้าง</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.construct : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">สินทรัพย์โครงสร้าง</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.asset : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">สินทรัพย์ไม่มีตัวตน</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.blank_asset : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">อาคารชั่วคราว/โรงเรือน</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.temp_building : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    {/* Blank Card */}
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">อาคารถาวร</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.permanent_building : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md={3} className="mb-3">
                                                    <Card className="inventory-type-card">
                                                        <Card.Body className="p-4">
                                                            <h5 className="inventory-type-nametag">ครุภัณฑ์อื่นๆ</h5>
                                                            <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.other : 0} รายการ</p>
                                                        </Card.Body>
                                                        <Card.Footer className="inventory-type-footer">
                                                            <Link to="/inventories" className="text-decoration-none text-black">
                                                                ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                            </Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </HelmetProvider>        
            </Container>
        </Layout>
    );
}

export default InventoriesType;