// Import Libraries
import React from 'react';
import QRCode from 'qrcode.react';
import { Modal, Button, Row, Col, Card } from 'react-bootstrap';

// Import Assets
import '../../assets/css/features/Inventories/InventoriesDetailModal.css';

// Import Components
import { GrayOutlineButton } from '../../components/buttons/OutlineButton';
import { GreenPillBadge, RedPillBadge, YellowPillBadge, GrayPillBadge } from '../../components/badges/PillBadges';

// Import Icons
import { IoClose } from "react-icons/io5";
import { MdInfoOutline } from 'react-icons/md';
import { GrDocumentText } from 'react-icons/gr';
import { RiCloseCircleLine } from 'react-icons/ri';

const InventoriesDetailModal = ({ show, onHide, inventory, title }) => {
    const qrValue = inventory.inv_id;
    
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header>
                <Modal.Title>
                    <GrDocumentText size={26} className="m-2" />
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="main-row">
                    <Card className="detail-card" title="รายละเอียดครุภัณฑ์">
                        <Card.Header>
                            <MdInfoOutline className="detail-info-icon" size={20} />
                            <strong className="inventory-detail-tag">รายละเอียดครุภัณฑ์</strong>
                        </Card.Header>
                        <Card.Body>
                            <Row className="g-3">
                                <Col xs={12} md={12} className="detail-info-col">
                                    <p>
                                        <strong>{'หมายเลขครุภัณฑ์ : '}</strong>
                                        {inventory.inv_sn}
                                    </p>
                                    <p>
                                        <strong>{'ชื่อครุภัณฑ์ : '}</strong> 
                                        {inventory.inv_name ? inventory.inv_name : 'ไม่ระบุ'}
                                    </p>
                                    <p>
                                        <strong>{'ยี่ห้อ : '}</strong> 
                                        {inventory.band ? inventory.band : 'ไม่ระบุ'}
                                    </p>
                                    <p>
                                        <strong>{'ประเภทครุภัณฑ์ : '}</strong> 
                                        {inventory.inv_type ? inventory.inv_type : 'ไม่ระบุ'}
                                    </p>
                                    <p>
                                        <strong>{'หน่วยงาน : '}</strong> 
                                        {Array.isArray(inventory.move_histories) && inventory.move_histories.length > 0 ? (
                                            `${inventory.move_histories[0].sub_division?.org_name}`
                                        ): inventory.org && inventory.org.org_id ? (
                                            [1767].includes(inventory.org.org_id) ? 'ส่วนกลาง' :
                                            [1768].includes(inventory.org.org_id) ? 'กลุ่มตรวจสอบภายใน (ตน.)' :
                                            [1769].includes(inventory.org.org_id) ? 'กลุ่มพัฒนาระบบบริหาร (พร.)' :
                                            [252, 711, 1111, 1382, 1608, 1770].includes(inventory.org.org_id) ? 'สำนักงานเลขานุการกรม (สล.)' :
                                            [167, 192, 267, 767, 1447, 1627, 1778].includes(inventory.org.org_id) ? 'กองเทคโนโลยีชุมชน (ทช.)' :
                                            [274, 807, 1172, 1454, 1687, 1785].includes(inventory.org.org_id) ? 'กองบริหารและรับรองห้องปฏิบัติการ (บร.)' :
                                            [187, 280, 1692, 1790].includes(inventory.org.org_id) ? 'กองพัฒนาศักยภาพนักวิทยาศาสตร์ห้องปฏิบัติการ (พศ.)' :
                                            [188, 286, 819, 1401, 1698, 1796].includes(inventory.org.org_id) ? 'กองหอสมุดและศูนย์สารสนเทศวิทยาศาสตร์และเทคโนโลยี (สท.)' :
                                            [189, 291, 827, 1190, 1465, 1704, 1802].includes(inventory.org.org_id) ? 'กองเคมีภัณฑ์และผลิตภัณฑ์อุปโภค (คอ.)' :
                                            [190, 299, 835, 1198, 1473, 1712, 1810].includes(inventory.org.org_id) ? 'กองวัสดุวิศวกรรม (วว.)' :
                                            [191, 309, 587, 848, 1207, 1482, 1721, 1869].includes(inventory.org.org_id) ? 'กองผลิตภัณฑ์อาหารและวัสดุสัมผัสอาหาร (อว.)' :
                                            [1729, 1877].includes(inventory.org.org_id) ? 'กองสอบเทียบเครื่องมือวัด (สค.)' :
                                            [548, 856, 1733, 1881].includes(inventory.org.org_id) ? 'กองบริหารจัดการทดสอบความชำนาญห้องปฏิบัติการ (บท.)' :
                                            [1739, 1887].includes(inventory.org.org_id) ? 'กองยุทธศาสตร์และแผนงาน (ยผ.)' :
                                            [1215, 1490, 1736, 1908].includes(inventory.org.org_id) ? 'กองตรวจและรับรองคุณภาพผลิตภัณฑ์ (รผ.)' :
                                            'ไม่ระบุ'
                                        ): (
                                            'ไม่ระบุ'
                                        )}
                                    </p>
                                    <p>
                                        <strong>{'สถานที่ตั้ง : '}</strong> 
                                        {Array.isArray(inventory.move_histories) && inventory.move_histories.length > 0 ? (
                                            `${inventory.move_histories[0].location}`
                                        ): inventory.inv_uom ? ( 
                                            `${inventory.inv_uom}`
                                        ):( 
                                            'ไม่ระบุ'
                                        )}
                                    </p>
                                    <p>
                                        <strong>{'ผู้รับผิดชอบ : '}</strong> 
                                        {Array.isArray(inventory.move_histories) && inventory.move_histories.length > 0 ? (
                                            `${inventory.move_histories[0].employee.emp_name}`
                                        ):( 
                                            'ไม่ระบุ'
                                        )}
                                    </p>
                                    <p>
                                        <strong>{'สถานะ : '}</strong>
                                        {inventory.dispense_flg === 'N' ? (
                                            <GreenPillBadge>
                                                {'ใช้งานอยู่'}
                                            </GreenPillBadge>
                                        ): inventory.dispense_flg === 'F' ? (
                                            <YellowPillBadge>
                                                {'จำหน่ายบางส่วน'}
                                            </YellowPillBadge>
                                        ): inventory.dispense_flg === 'W' ? (
                                            <YellowPillBadge>
                                                {'รอจำหน่าย'}
                                            </YellowPillBadge>
                                        ): inventory.dispense_flg === 'Y' ? (
                                            <RedPillBadge>
                                                {'จำหน่ายออก'}
                                            </RedPillBadge>
                                        ): inventory.dispense_flg === 'T' ? (
                                            <RedPillBadge>
                                                {'โอนย้าย'}
                                            </RedPillBadge>
                                        ): inventory.dispense_flg === 'C' ? (
                                            <RedPillBadge>
                                                {'ถูกโจรกรรม'}
                                            </RedPillBadge>
                                        ): inventory.dispense_flg === 'D' ? (
                                            <RedPillBadge>
                                                {'ชำรุด/เสื่อมสภาพ'}
                                            </RedPillBadge>
                                        ): inventory.dispense_flg === 'U' ? (
                                            <RedPillBadge>
                                                {'หมดความจำเป็นใช้งาน'}
                                            </RedPillBadge>
                                        ):( 
                                            <GrayPillBadge>
                                                {'ไม่ทราบสถานะ'}
                                            </GrayPillBadge>
                                        )}
                                    </p>
                                </Col>
                                {/* <Col xs={12} md={5} className="d-flex justify-content-center align-items-center mb-4">
                                    <QRCode title={`รหัสครุภัณฑ์: ${inventory.inv_id}`} value={qrValue} size={150} />
                                </Col> */}
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <GrayOutlineButton className="check-btn me-2" title="ยกเลิก" onClick={onHide}>
                    <IoClose size={16} className="m-1" />
                    {'ปิด'}
                </GrayOutlineButton>
            </Modal.Footer>
        </Modal>
    );
}

export default InventoriesDetailModal;
