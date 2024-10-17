// Import Libraries
import "jspdf-autotable";
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom';
import QRCode from 'qrcode.react';
import html2pdf from 'html2pdf.js';
import { Font } from "@react-pdf/renderer";
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Container, Card, Row, Col, Form, Button, ButtonGroup, Pagination, Spinner } from 'react-bootstrap';

// Import Assets
import '../assets/css/global.css';
import '../assets/css/pages/InventoriesQrCodeGenerator.css';
import THSarabunNew from '../../src/assets/font/Sarabun-Bold.ttf';

// Import Components
import Loader from '../components/loader/Loader';
import Layout from '../components/layouts/Layout';
import { DataCount } from '../components/datacount/DataCount';
import { BlueOutlineButton } from '../components/buttons/OutlineButton';

// Import Utilities
import { getApiUrl, getPublicUrl } from '../utils/getUrl';

// Import Icons
import { IoQrCode } from "react-icons/io5";
import { CiBoxList } from 'react-icons/ci';
import { FiDownload } from 'react-icons/fi';
import { IoMdRefresh } from 'react-icons/io';
import { LuLayoutList } from "react-icons/lu";
import { FaCheckSquare, FaSpinner } from "react-icons/fa";
import { GoMoveToTop, GoOrganization } from 'react-icons/go';
import { MdClear, MdIndeterminateCheckBox } from "react-icons/md";

const fetchInvInfo = async () => {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}api/getQrCodeInventories`);
    if (!response.ok) {
        throw new Error('เซิร์ฟเวอร์ไม่ตอบสนอง กรุณาลองใหม่อีกครั้ง');
    }
    const result = await response.json();
    return result.data.map(item => ({
        ...item,
        org_name: mapOrgIdToName(item.org_id)
    }));
};

const orgMap = {
    '1767': 'ส่วนกลาง',
    '1768': 'กลุ่มตรวจสอบภายใน (ตน.)',
    '1769': 'กลุ่มพัฒนาระบบบริหาร (พร.)',
    '252,711,1111,1382,1608,1770': 'สำนักงานเลขานุการกรม (สล.)',
    '167,192,267,767,1447,1627,1778': 'กองเทคโนโลยีชุมชน (ทช.)',
    '274,807,1172,1454,1687,1785': 'กองบริหารและรับรองห้องปฏิบัติการ (บร.)',
    '187,280,1692,1790': 'กองพัฒนาศักยภาพนักวิทยาศาสตร์ห้องปฏิบัติการ (พศ.)',
    '188,286,819,1401,1698,1796': 'กองหอสมุดและศูนย์สารสนเทศวิทยาศาสตร์และเทคโนโลยี (สท.)',
    '189,291,827,1190,1465,1704,1802': 'กองเคมีภัณฑ์และผลิตภัณฑ์อุปโภค (คอ.)',
    '190,299,835,1198,1473,1712,1810': 'กองวัสดุวิศวกรรม (วว.)',
    '191,309,587,848,1207,1482,1721,1869': 'กองผลิตภัณฑ์อาหารและวัสดุสัมผัสอาหาร (อว.)',
    '1729,1877': 'กองสอบเทียบเครื่องมือวัด (สค.)',
    '548,856,1733,1881': 'กองบริหารจัดการทดสอบความชำนาญห้องปฏิบัติการ (บท.)',
    '1739,1887': 'กองยุทธศาสตร์และแผนงาน (ยผ.)',
    '1215,1490,1736,1908': 'กองตรวจและรับรองคุณภาพผลิตภัณฑ์ (รผ.)',
};

const mapOrgIdToName = (org_id) => {
    for (const [key, value] of Object.entries(orgMap)) {
        if (key.split(',').includes(org_id.toString())) {
            return value;
        }
    }
    return 'ไม่ทราบหน่วยงาน';
};

function InventoriesQrCodeGenerator() {
    const webTitle = 'สร้างรหัสคิวอาร์ครุภัณฑ์';

    const apiUrl = getApiUrl();
    const logoImage = getPublicUrl('logo.png');

    const navigate = useNavigate();

    const location = useLocation();

    const { data, error, isLoading } = useQuery({
        queryKey: ['invInfo'],
        queryFn: fetchInvInfo,
    });

    const [showData, setShowData] = useState(false);

    const [organization, setOrganization] = useState('');

    const [filteredCount, setFilteredCount] = useState(0);

    const [downloadProgress, setDownloadProgress] = useState(0);
    
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(0);
    
    const [searchTerm, setSearchTerm] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]);

    const [loading, setLoading] = useState(true);
    const [displayMode, setDisplayMode] = useState('qr');
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        if (isLoading) {
            setLoading(true);
        } else {
            setLoading(false);
            if (data) {
                setShowData(organization !== '');
            }
        }
    }, [isLoading, data, organization]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const orgParam = queryParams.get('org');
        if (orgParam) {
            setOrganization(orgParam);
            setShowData(true);
        }
    }, [location.search]);

    const organizations = data ? Array.from(new Set(data.map(item => item.org_name))) : [];

    const filteredData = showData && data ? data.filter(item =>
        item.org_name === organization && (
            String(item.inv_name || '').toLowerCase().includes(String(searchTerm || '').toLowerCase()) ||
            String(item.inv_sn || '').toLowerCase().includes(String(searchTerm || '').toLowerCase())
        )
    ) : [];

    useEffect(() => {
        setFilteredCount(filteredData.length);
    }, [filteredData]);

    const handleOrganizationChange = (e) => {
        const selectedOrg = e.target.value;
        setOrganization(selectedOrg);
        if (data && selectedOrg) {
            const encodeOrg = encodeURIComponent(selectedOrg);
            setShowData(true);
            navigate(`/inventories/qrcode?org=${encodeOrg}`);
        } 
        else {
            setShowData(false);
            navigate('/inventories/qrcode');
        }
    };

    const handleSelectItem = (id) => {
        setSelectedItems(prevSelectedItems => {
            const updatedSelectedItems = prevSelectedItems.includes(id)
                ? prevSelectedItems.filter(item => item !== id)
                : [...prevSelectedItems, id];
                console.log('รหัสรายการที่เลือก:', updatedSelectedItems);
            return updatedSelectedItems;
        });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRefresh = () => {
        navigate('/inventories/qrcode');
        window.location.reload();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber - 1);
    };

    const handleDownloadPDF = async (chunks) => {
        for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
            const chunk = chunks[chunkIndex];
            let htmlContent = `
                <p style="margin-top: 10px; width: 100%; text-align: start; font-size: 16px; font-weight: bold; margin-bottom: 10px;">รายการสติ๊กเกอร์สำหรับติดบนครุภัณฑ์ (${chunk.length} รายการ)</p>
                <div style="display: flex; flex-wrap: wrap; page-break-inside: avoid;">
            `;

            const itemHeights = [];
            chunk.forEach((item, index) => {
                const tempDiv = document.createElement('div');
                tempDiv.style.cssText = `
                    display: flex; align-items: center; border: 1px solid #000; padding: 10px;
                    width: 50%; box-sizing: border-box; margin-bottom: 10px; page-break-inside: avoid;
                `;
                tempDiv.innerHTML = `
                    <div style="margin-right: 10px;">
                        <img src=${logoImage} style="width: 50px; height: auto;" alt="Logo" />
                    </div>
                    <div style="font-size: 8px; display: flex; flex-direction: column; justify-content: center; width: calc(100% - 130px);">
                        <p style="margin: 0;"><b>กรมวิทยาศาสตร์บริการ (วศ.)</b></p>
                        <p style="margin: 0;"><b>หมายเลขครุภัณฑ์ : </b>${item.inv_sn || 'ไม่ระบุ'}</p>
                        <p style="margin: 0;"><b>ชื่อครุภัณฑ์ : </b>${item.inv_name || 'ไม่ระบุ'}</p>
                        <p style="margin: 0;"><b>หน่วยงาน : </b>${item.org_name || 'ไม่ระบุ'}</p>
                        <p style="margin: 0;"><b>สถานที่ตั้ง : </b>
                            ${item.building_name ? item.location : (item.inv_uom ? item.inv_uom : 'ไม่ระบุ')}
                        </p>
                        <p style="margin: 0;"><b>ผู้รับผิดชอบ : </b>${item.emp_name || 'ไม่ระบุ'}</p>
                    </div>
                `;
                document.body.appendChild(tempDiv);
                itemHeights.push(tempDiv.offsetHeight);
                document.body.removeChild(tempDiv);
            });

            const maxHeight = Math.max(...itemHeights);

            chunk.forEach((item, index) => {
                if (index > 0 && index % 20 === 0) {
                    htmlContent += `</div><div style="display: flex; flex-wrap: wrap; page-break-before: always;">`;
                }

                htmlContent += `
                    <div style="width: 50%; box-sizing: border-box; padding: 0px; page-break-inside: avoid;">
                        <div style="margin-bottom: 0px; display: flex; align-items: center; border: 1px solid #000; padding: 10px; height: ${maxHeight}px;">
                            <div style="margin-right: 10px;">
                                <img src=${logoImage} style="width: 50px; height: auto;" alt="Logo" />
                            </div>
                            <div style="font-size: 8px; display: flex; flex-direction: column; justify-content: center; width: calc(100% - 130px);">
                                <p style="margin: 0;"><b>กรมวิทยาศาสตร์บริการ (วศ.)</b></p>
                                <p style="margin: 0;"><b>หมายเลขครุภัณฑ์ : </b>${item.inv_sn || 'ไม่ระบุ'}</p>
                                <p style="margin: 0;"><b>ชื่อครุภัณฑ์ : </b>${item.inv_name || 'ไม่ระบุ'}</p>
                                <p style="margin: 0;"><b>หน่วยงาน : </b>${item.org_name || 'ไม่ระบุ'}</p>
                                <p style="margin: 0;"><b>สถานที่ตั้ง : </b>
                                    ${item.building_name ? item.location : (item.inv_uom ? item.inv_uom : 'ไม่ระบุ')}
                                </p>
                                <p style="margin: 0;"><b>ผู้รับผิดชอบ : </b>${item.emp_name || 'ไม่ระบุ'}</p>
                            </div>
                            <div style="margin-left: auto;">
                                <div id="qr-code-${chunkIndex}-${index}"></div>
                            </div>
                        </div>
                    </div>
                `;

                if ((index + 1) % 2 === 0) {
                    htmlContent += '</div><div style="display: flex; flex-wrap: wrap; page-break-inside: avoid;">';
                }
            });

            htmlContent += `</div>`;
            const element = document.createElement('div');
            element.innerHTML = htmlContent;
            document.body.appendChild(element);

            chunk.forEach((item, index) => {
                const qrCodeElement = document.getElementById(`qr-code-${chunkIndex}-${index}`);
                ReactDOM.render(<QRCode className="mt-2" value={item.id ? item.id.toString() : ''} size={55} />, qrCodeElement);
            });

            await new Promise(resolve => setTimeout(resolve, 100));

            const opt = {
                margin: 0.5,
                filename: `inventory_Sticker_part_${chunkIndex + 1}.pdf`,
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 4 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            await html2pdf().from(element).set(opt).toPdf().get('pdf').then((pdf) => {
                const totalPages = pdf.internal.getNumberOfPages();
                for (let i = 1; i <= totalPages; i++) {
                    setDownloadProgress(Math.round((i / totalPages) * 100));
                }
            }).save().then(() => {
                document.body.removeChild(element);
                setDownloadProgress(0);
                Swal.fire({
                    icon: 'success',
                    title: `ดาวน์โหลดรายการสติ๊กเกอร์สำหรับติดบนครุภัณฑ์สำเร็จ!`,
                    text: 'ดาวน์โหลดไฟล์ PDF เรียบร้อยแล้ว',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "ตกลง"
                });
            });
        }
        setSelectedItems([]);
    };        

    const confirmDownloadPDF = () => {
        const downloadItems = filteredData.filter(item => selectedItems.includes(item.id));
        if (downloadItems.length === 0) {
            Swal.fire({
                icon: 'error',
                title: `ไม่สามารถดาวน์โหลดข้อมูลได้!`,
                text: 'กรุณาเลือกรายการครุภัณฑ์ที่ต้องการก่อนทำการดาวน์โหลด',
                confirmButtonColor: '#3085d6',
                confirmButtonText: "ตกลง"
            });
            return;
        }
        const chunkSize = 210;
        const chunks = [];
        for (let i = 0; i < downloadItems.length; i += chunkSize) {
            chunks.push(downloadItems.slice(i, i + chunkSize));
        }
        Swal.fire({
            title: 'ต้องการดาวน์โหลดรายการสติ๊กเกอร์สำหรับติดบนครุภัณฑ์หรือไม่?',
            text: `หากต้องการดาวน์โหลดรายการสติ๊กเกอร์สำหรับติดบนครุภัณฑ์เป็นไฟล์ PDF กรุณากดปุ่มดาวน์โหลด`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ดาวน์โหลด',
            cancelButtonColor: '#d33',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDownloadPDF(chunks);
            }
        });
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(filteredCount / itemsPerPage);
        const paginationItems = [];

        const pageLimit = 5;
        const startPage = Math.max(1, currentPage + 1 - Math.floor(pageLimit / 2));
        const endPage = Math.min(totalPages, startPage + pageLimit - 1);

        paginationItems.push(
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 0} />
        );
        paginationItems.push(
            <Pagination.Prev onClick={() => handlePageChange(currentPage)} disabled={currentPage === 0} />
        );
        if (startPage > 1) {
            paginationItems.push(<Pagination.Ellipsis disabled />);
        }
        for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
            paginationItems.push(
                <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === currentPage + 1}
                    onClick={() => handlePageChange(pageNumber)}
                >
                    {pageNumber}
                </Pagination.Item>
            );
        }
        if (endPage < totalPages) {
            paginationItems.push(<Pagination.Ellipsis disabled />);
        }
        paginationItems.push(
            <Pagination.Next onClick={() => handlePageChange(currentPage + 2)} disabled={currentPage === totalPages - 1} />
        );
        paginationItems.push(
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages - 1} />
        );
        return (
            <Pagination className="justify-content-center">
                {paginationItems}
            </Pagination>
        );
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
                                                <IoQrCode size={30} className="m-3" />
                                                {'สร้างรหัสคิวอาร์ครุภัณฑ์'}
                                            </h2>
                                        </Col>
                                        <Col md={6} className="d-flex justify-content-end align-items-center mt-0">
                                            <BlueOutlineButton className='refresh-btn' title="รีเฟรชข้อมูล" onClick={() => handleRefresh()} disabled={loading}>
                                                {loading ? <FaSpinner size={16} className="m-1 spin" /> : <IoMdRefresh className="refresh-btn-icon" size={16} />}
                                                {loading ? <span className="responsive-text-hidden">กำลังโหลด...</span> : <span className="responsive-text-hidden">รีเฟรช</span>}
                                            </BlueOutlineButton>
                                        </Col>
                                    </div>
                                    {loading ? (
                                        <Loader className="loader-bar" />
                                    ):(
                                        <div>
                                            <Card className="mt-3 mb-3">
                                                <Card.Body>
                                                    <Form>
                                                        <Form.Group controlId="organization">
                                                            <Form.Label>
                                                                <h5 className="card-title responsive-header">
                                                                    <GoOrganization size={23} className="icon-co-header" />
                                                                    {'หน่วยงาน'}
                                                                </h5>
                                                            </Form.Label>
                                                            <Form.Control as="select" value={organization} onChange={handleOrganizationChange}>
                                                                <option value="">
                                                                    {'- เลือกหน่วยงาน -'}
                                                                </option>
                                                                {organizations.map((orgName, index) => (
                                                                    <option key={index} value={orgName}>
                                                                        {orgName}
                                                                    </option>
                                                                ))}
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Form>
                                                </Card.Body>
                                            </Card>
                                            {showData && (
                                                <Card>
                                                    <Card.Body>
                                                        <div className="d-flex flex-wrap justify-between align-items-center">
                                                            <Col md={6}>
                                                                <h5 className="card-title responsive-header">
                                                                    <LuLayoutList size={25} className="icon-co-header" />
                                                                    {'รายการครุภัณฑ์'}
                                                                </h5>
                                                            </Col>
                                                            <Col md={6} className="text-datacount d-flex justify-content-end align-items-center">
                                                                <DataCount className="datacount">{filteredCount}</DataCount>
                                                            </Col>
                                                        </div>
                                                        <Form.Group controlId="search">
                                                            <Form.Control type="text" placeholder="ค้นหาชื่อครุภัณฑ์ / หมายเลขครุภัณฑ์" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); handlePageChange(1);}} />
                                                        </Form.Group>
                                                        <ButtonGroup className="mt-3 mb-3">
                                                            <Button variant={selectedItems.length === filteredData.length ? "outline-danger" : "outline-success"} size="sm" className="qrcode-list-btn me-2 btn-shadow"
                                                                onClick={() => {
                                                                    if (selectedItems.length === filteredData.length) {
                                                                        setSelectedItems([]);
                                                                        console.log('ยกเลิกการเลือกทั้งหมด');
                                                                    } else {
                                                                        const allItemIds = filteredData.map(item => item.id);
                                                                        setSelectedItems(allItemIds);
                                                                        console.log('รหัสรายการที่เลือก:', allItemIds);
                                                                    }
                                                                }}
                                                            >
                                                                {selectedItems.length === filteredData.length ? (
                                                                    <>
                                                                        <MdIndeterminateCheckBox className="me-1" size={23} />
                                                                        <span>{`ยกเลิก (${selectedItems.length} รายการ)`}</span>
                                                                    </>
                                                                ):(
                                                                    <>
                                                                        <FaCheckSquare className="me-1" size={20} />
                                                                        <span>{`เลือกทั้งหมด (${selectedItems.length} รายการ)`}</span>
                                                                    </>
                                                                )}
                                                            </Button>
                                                            <Button variant="outline-danger" size="sm" className="qrcode-list-btn me-2 btn-shadow" onClick={() => { setSelectedItems([]); console.log('ล้างการเลือกไอเทมทั้งหมด'); }} disabled={selectedItems.length === 0}>
                                                                <MdClear className="me-1" size={23} />
                                                                {'ล้างการเลือก'}
                                                            </Button>
                                                            <Button variant="outline-success" size="sm" className="qrcode-list-btn me-2 btn-shadow" onClick={confirmDownloadPDF} disabled={selectedItems.length === 0}>
                                                                <FiDownload className="me-1" size={18} />
                                                                {`ดาวน์โหลด (${selectedItems.length} รายการ)`}
                                                            </Button>
                                                        </ButtonGroup>
                                                        {downloadProgress > 0 && (
                                                            <div className="progress mb-3">
                                                                <div className="progress-bar" role="progressbar" style={{ width: `${downloadProgress}%` }} aria-valuenow={downloadProgress} aria-valuemin="0" aria-valuemax="100">
                                                                    {downloadProgress}%
                                                                </div>
                                                            </div>
                                                        )}
                                                        <Row className="sticker-inventory">
                                                            {filteredData.length > 0 ? (
                                                                filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((item, index) => (
                                                                    <Col xs={12} sm={6} md={6} lg={6} key={index} className="mb-2"> 
                                                                        <Card className={`sticker ${selectedItems.includes(item.id) ? 'selected' : ''}`} title={`รหัสครุภัณฑ์: ${item.id} - ${item.inv_name}`}>
                                                                            <Card.Body className="sticker-body" onClick={() => handleSelectItem(item.id)}>
                                                                                <div className="d-flex justify-content-between align-items-center">
                                                                                    <div className="logo-display">
                                                                                        <img src={logoImage} width="75" height="75" />
                                                                                    </div>
                                                                                    <div className="info" style={{ width: '70%' }}>
                                                                                        <Form.Check className="hidden-checkbox" type="checkbox" checked={selectedItems.includes(item.id)} 
                                                                                            onChange={(e) => {
                                                                                                e.stopPropagation();
                                                                                                handleSelectItem(item.id);
                                                                                            }}
                                                                                        />
                                                                                        <span><b>{'รหัสครุภัณฑ์: '}</b>{item.id}</span>
                                                                                        <p className="sticker-data"><b>{'หมายเลขครุภัณฑ์ : '}</b>{item.inv_sn || 'ไม่ระบุ'}</p>
                                                                                        <p className="sticker-data"><b>{'ชื่อครุภัณฑ์ : '}</b>{item.inv_name || 'ไม่ระบุ'}</p>
                                                                                        <p className="sticker-data"><b>{'หน่วยงาน : '}</b>{item.org_name || 'ไม่ระบุ'}</p>
                                                                                        <p className="sticker-data">
                                                                                            <b>{'สถานที่ตั้ง : '}</b>
                                                                                            {item.building_name ? (
                                                                                                `${item.location}`
                                                                                            ): item.inv_uom ? ( 
                                                                                                `${item.inv_uom}`
                                                                                            ):( 
                                                                                                'ไม่ระบุ'
                                                                                            )}
                                                                                        </p>
                                                                                        <p className="sticker-data"><b>{'ผู้รับผิดชอบ : '}</b>{item.emp_name || 'ไม่ระบุ'}</p>
                                                                                    </div>
                                                                                    {/* <div className="qrcode-display" style={{ width: '30%', textAlign: 'center' }}>
                                                                                        <QRCode value={item.inv_id ? item.inv_id.toString() : ''} size={100} />
                                                                                    </div> */}
                                                                                </div>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                ))
                                                            ) : (
                                                                <p>ไม่ระบุ</p>
                                                            )}
                                                        </Row>
                                                        {renderPagination()}
                                                    </Card.Body>
                                                </Card>
                                            )}
                                            {showScrollToTop && (
                                                <Button variant="success" className="scroll-to-top text-white" onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
                                                    <GoMoveToTop className="me-1" />
                                                    {'กลับไปที่ด้านบน'}
                                                </Button>
                                            )}
                                        </div>
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

export default InventoriesQrCodeGenerator;