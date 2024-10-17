// Import Libraries
import React from 'react';
import QRCode from 'qrcode.react';
import { Modal, Button, Row, Col, Card } from 'react-bootstrap';

// Import Assets
import '../../assets/css/features/InventoriesCheckList/InventoriesCheckListDetailModal.css';

// Import Components
import { GrayOutlineButton } from '../../components/buttons/OutlineButton';
import { GreenPillBadge, RedPillBadge, YellowPillBadge, GrayPillBadge } from '../../components/badges/PillBadges';

// Import Icons
import { IoClose } from "react-icons/io5";
import { MdInfoOutline } from 'react-icons/md';
import { GrDocumentText } from 'react-icons/gr';
import { RiCloseCircleLine } from 'react-icons/ri';

const InventoriesCheckListDetailModal = ({ show, onHide, inventory, title }) => {
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
                                        <strong>{'หน่วยงาน : '}</strong> 
                                        {inventory.division ? inventory.division.org_name : 'ไม่ระบุ'}
                                    </p>
                                    <p>
                                        <strong>{'สถานที่ตั้ง : '}</strong> 
                                        {inventory.check_location ? inventory.check_location : 'ไม่ระบุ'}
                                    </p>
                                    <p>
                                        <strong>{'ผู้รับผิดชอบ : '}</strong> 
                                        {inventory.employee ? inventory.employee.emp_name : 'ไม่ระบุ'}
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

export default InventoriesCheckListDetailModal;
