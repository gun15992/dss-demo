// Import Libraries
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Form, Spinner, Alert } from 'react-bootstrap';

// Import Assets
import '../assets/css/global.css';
import '../assets/css/pages/InventoriesCheck.css';

// Import Components
import Loader from '../components/loader/Loader';
import Layout from '../components/layouts/Layout';
import { GreenPillBadge, RedPillBadge, YellowPillBadge, GrayPillBadge } from '../components/badges/PillBadges';
import { BlueOutlineButton, GreenOutlineButton, YellowOutlineButton } from '../components/buttons/OutlineButton';

// Import Features
import InventoriesCheckTabs from '../features/InventoriesCheck/InventoriesCheckTabs';
import InventoriesCheckModal from '../features/InventoriesCheck/InventoriesCheckModal';
import InventoriesCheckImageModal from '../features/InventoriesCheck/InventoriesCheckImageModal';
import InventoriesCheckQrCodeScanner from '../features/InventoriesCheck/InventoriesCheckQrCodeScanner';

// Import Utilities
import { getApiUrl, getPublicUrl } from '../utils/getUrl';

// Import Icons
import { FiEdit3 } from 'react-icons/fi';
import { FaCheck, FaSpinner } from "react-icons/fa6";
import { TbDeviceDesktopExclamation } from "react-icons/tb";
import { IoMdRefresh, IoMdCheckmark } from "react-icons/io";
import { IoWarningOutline, IoSearch } from "react-icons/io5";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { GoProjectRoadmap, GoNumber, GoChecklist } from 'react-icons/go';
import { MdClear, MdInfoOutline, MdOutlineImageNotSupported, MdOutlineQrCodeScanner } from "react-icons/md";

function InventoriesCheck() {
    const webTitle = 'ตรวจนับครุภัณฑ์';
    
    const apiUrl = getApiUrl();
    const logoImage = getPublicUrl('logo.png');

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [scanResult, setScanResult] = useState(searchParams.get('scanResult') || '');

    const currentYear = (new Date().getFullYear() + 543).toString();

    const [inventories, setInventories] = useState([]);
    const [selectedInventory, setSelectedInventory] = useState(null);

    const [divisions, setDivisions] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState(null);

    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const [checkHistories, setCheckHistories] = useState([]);
    const [selectedCheckHistory, setSelectedCheckHistory] = useState(null);

    const [currentImages, setCurrentImages] = useState([]);
    const [imageModalTitle, setImageModalTitle] = useState('');
    const [showImageModal, setShowImageModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [checkModalTitle, setCheckModalTitle] = useState('');
    const [showCheckModal, setShowCheckModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState('qrcode');

    useEffect(() => {
        if (scanResult) {
            setLoading(true);
            fetchAllData(scanResult)
        }
    }, [scanResult])

    useEffect(() => {
        checkIfMobile();
    }, []);

    async function fetchAllData(id) {
        try {
            setLoading(true);
            const [inventoriesResponse, divisionsResponse, locationsResponse, checkHistoriesResponse] = await Promise.all([
                axios.get(`${apiUrl}api/getAllInventories/${id}`),
                axios.get(`http://backoffice-api.dss.local/api/getOrganization`),
                axios.get(`${apiUrl}api/getLocations`),
                axios.get(`${apiUrl}api/getCheckHistories`)
            ]);
            setInventories([inventoriesResponse.data.data]);
            setDivisions([divisionsResponse.data.data]);
            setLocations([locationsResponse.data.data]);
            setCheckHistories(checkHistoriesResponse.data.data);
        } 
        catch (error) {
            console.error('เกิดข้อผิดพลาดระหว่างดึงข้อมูลจาก API', error);
            setInventories([]);
            setDivisions([]);
            setLocations([]);
            setCheckHistories([]);
        }
        finally {
            setLoading(false);
        }
    }
    
    const checkIfMobile = () => {
        setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleScanResult = (data) => {
        setScanResult(data);
        setSearchParams({ scanResult: uuidv4(data) });
    };

    const handleRefresh = () => {
        navigate('/inventories/check');
        window.location.reload();
    };

    const handleImageClick = (images, title) => {
        setCurrentImages(images);
        setImageModalTitle(title);
        setShowImageModal(true);
    };

    const handleCheckClick = (inventory, divisions, locations, title) => {
        if (!inventory || !divisions || !locations) {
            console.error('Invalid arguments:', inventory, divisions, locations);
            return;
        }
        setSelectedInventory(inventory);
        setSelectedDivision(divisions);
        setSelectedLocation(locations);
        setCheckModalTitle(title);
        setShowCheckModal(true);
    };

    const handleCheckConfirm = () => {
        setShowCheckModal(false);
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
                                                <HiOutlineClipboardDocumentCheck className="inventory-check-icon m-3" size={30} />
                                                {'ตรวจนับครุภัณฑ์'}
                                            </h2>
                                        </Col>
                                        <Col md={6} className="d-flex justify-content-end align-items-center mt-0">
                                            <BlueOutlineButton className='refresh-btn' title="รีเฟรชข้อมูล" onClick={() => handleRefresh()} disabled={loading}>
                                                {loading ? <FaSpinner size={16} className="m-1 spin" /> : <IoMdRefresh className="refresh-btn-icon" size={16} />}
                                                {loading ? <span className="responsive-text-hidden">กำลังโหลด...</span> : <span className="responsive-text-hidden">รีเฟรช</span>}
                                            </BlueOutlineButton>
                                        </Col>
                                    </div>
                                    <InventoriesCheckTabs activeTab={activeTab} onTabClick={handleTabClick} />
                                    <Card className="tab-card">
                                        <Card.Body>
                                            <div className="tab-sub-content">
                                                {activeTab === 'qrcode' && (
                                                    <>  
                                                        <Row className="mt-3">
                                                            <Col md={12}>
                                                                <h3 className="inventory-check card-title responsive-header">
                                                                    <MdOutlineQrCodeScanner size={28} className="inventory-dashboard-icon" />
                                                                    {'ตรวจนับครุภัณฑ์จากรหัสคิวอาร์'}
                                                                </h3>
                                                            </Col>
                                                            {loading ? (
                                                                <Loader className="loader-bar" />
                                                            ):(
                                                                <>
                                                                    {isMobile ? (
                                                                        <>
                                                                            <Col md={12}>
                                                                                <Card className="qrcode-alert">
                                                                                    <Card.Body>
                                                                                        <MdInfoOutline className="me-2 success-sub-content" size={20} />
                                                                                        <span><strong>{'ข้อแนะนำ : '}</strong></span>
                                                                                        {'หากไม่สามารถสแกน QR Code ได้ กรุณารีเฟรชหน้าจอใหม่อีกครั้ง'}
                                                                                    </Card.Body>
                                                                                </Card>
                                                                            </Col>
                                                                            <InventoriesCheckQrCodeScanner onScanResult={handleScanResult} />
                                                                        </>
                                                                    ):(
                                                                        <Col md={12}>
                                                                            <Card className="warning-qrcode-mobile">
                                                                                <Card.Header className="warning-qrcode-mobile-head">
                                                                                    <IoWarningOutline className="qrcode-warning-icon" size={20} />
                                                                                    <strong className="qrcode-warning-tag">ไม่สามารถใช้งานระบบสแกนรหัสคิวอาร์ได้</strong>
                                                                                </Card.Header>
                                                                                <Card.Body className="warning-qrcode-mobile-body">
                                                                                    <TbDeviceDesktopExclamation className="device-warning-icon" size={150} />
                                                                                    {'อุปกรณ์นี้ไม่รองรับการใช้งาน กรุณาเปลี่ยนไปใช้บนสมาร์ทโฟน / แท็บเล็ต'}
                                                                                </Card.Body>
                                                                            </Card>
                                                                        </Col>
                                                                    )}
                                                                    {scanResult && inventories.length > 0 && (
                                                                        <>
                                                                            <Col md={6}>
                                                                                <h2 className="search-content card-title-hidden responsive-header">
                                                                                    <IoSearch className="m-2" size={30} />
                                                                                    {'ข้อมูลครุภัณฑ์ที่พบ'}
                                                                                </h2>
                                                                            </Col>
                                                                            {inventories.map((inventory, index) => (
                                                                                <Col md={12} key={index}>
                                                                                    <Card key={index} className="qrcode-result mb-3">
                                                                                        <Card.Body>
                                                                                            <Row>
                                                                                                <Col md={3}>
                                                                                                    {inventory.images && inventory.images.length > 0 ? ( 
                                                                                                        <div className="image-check-cropper" onClick={() => handleImageClick(inventory.images, inventory.inv_name)}>
                                                                                                            <img className="img-fluid" src={inventory.images[0].image_url} alt={`รหัสครุภัณฑ์: ${inventory.id} - ${inventory.inv_name}`} title={`รหัสครุภัณฑ์: ${inventory.id} - ${inventory.inv_name}`} />
                                                                                                        </div>
                                                                                                    ):( 
                                                                                                        <div className="image-check-cropper-none">
                                                                                                            <MdOutlineImageNotSupported className="check-inv-not-image" size={150} title="ไม่พบข้อมูล" />
                                                                                                        </div>
                                                                                                    )}
                                                                                                </Col>
                                                                                                <Col md={9}>
                                                                                                    <div className="inventory-check-sub">
                                                                                                        <h4 className="inventory-check-sub-title">{inventory.inv_name ? inventory.inv_name : 'ไม่พบข้อมูลครุภัณฑ์'}</h4>
                                                                                                        <p className="inventory-check-sub-serialnumber">
                                                                                                            <strong>{'หมายเลขครุภัณฑ์ : '}</strong>
                                                                                                            {inventory.inv_sn ? inventory.inv_sn : 'ไม่ระบุ'}
                                                                                                        </p>
                                                                                                        <p className="inventory-check-sub-location">
                                                                                                            <strong>{'สถานที่ตั้ง : '}</strong>
                                                                                                            {inventory.move_histories[0] ? (
                                                                                                                `${inventory.move_histories[0].location}`
                                                                                                            ): inventory.inv_uom ? ( 
                                                                                                                `${inventory.inv_uom}`
                                                                                                            ):( 
                                                                                                                'ไม่ระบุ'
                                                                                                            )}
                                                                                                        </p>
                                                                                                        <p className="inventory-check-sub-status">
                                                                                                            <strong className="inventory-check-sub-status">{'สถานะ : '}</strong>
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
                                                                                                    </div>
                                                                                                </Col>
                                                                                                <Col md={12}>
                                                                                                    <div className="d-flex justify-content-end">
                                                                                                        {['N', 'F', 'W'].includes(inventory.dispense_flg) && (
                                                                                                            inventory.check_fiscal_year === currentYear ? (
                                                                                                                <>
                                                                                                                    <GreenOutlineButton className="check-btn check-disable-btn me-2" title="ตรวจนับครุภัณฑ์แล้ว" disabled>
                                                                                                                        <FaCheck size={16} className="m-1" />
                                                                                                                        <span>ตรวจนับแล้ว</span>
                                                                                                                    </GreenOutlineButton>
                                                                                                                </>
                                                                                                            ):(
                                                                                                                <>
                                                                                                                    <GreenOutlineButton className="check-btn me-2" title="ตรวจนับครุภัณฑ์" onClick={() => handleCheckClick(inventory, divisions[0], locations[0], inventory.inv_name)}>
                                                                                                                        <GoProjectRoadmap size={16} className="m-1" />
                                                                                                                        <span>ตรวจนับ</span>
                                                                                                                    </GreenOutlineButton>
                                                                                                                </>
                                                                                                            )
                                                                                                        )}
                                                                                                    </div>
                                                                                                </Col>
                                                                                            </Row>
                                                                                        </Card.Body>
                                                                                    </Card>
                                                                                </Col>
                                                                            ))}
                                                                        </>
                                                                    )}
                                                                </>
                                                            )}
                                                        </Row>
                                                    </>
                                                )}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </HelmetProvider>        
            </Container>
            <InventoriesCheckImageModal show={showImageModal} onHide={() => setShowImageModal(false)} images={currentImages} title={imageModalTitle} initialIndex={currentImageIndex} />
            {selectedInventory && (
                <InventoriesCheckModal show={showCheckModal} onHide={() => setShowCheckModal(false)} inventory={selectedInventory} division={selectedDivision} location={selectedLocation} title={checkModalTitle} onCheckConfirm={handleCheckConfirm} />
            )}
        </Layout>
    );
}

export default InventoriesCheck;