// Import Libraries
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Container, Card, Row, Col, Button, Form, Dropdown } from 'react-bootstrap';

// Import Assets
import '@assets/css/global.css';
import '@assets/css/pages/Dashboard.css';

// Import Components
import Loader from '@components/loader/Loader';
import Layout from '@components/layouts/Layout';
import { GrayPillBadge } from '@components/badges/PillBadges';
import { BlueOutlineButton } from '@components/buttons/OutlineButton';

// Import Features
import DashboardTabs from '@features/Dashboard/DashboardTabs';
import DashboardYearDropdown from '@features/Dashboard/DashboardYearDropdown';
import DashboardOrganizationDropdown from '@features/Dashboard/DashboardOrganizationDropdown';
import DashBoardCheckOrganizationDropdown from '@features/Dashboard/DashBoardCheckOrganizationDropdown';

// Import Utilities
import { getApiUrl, getPublicUrl } from '@utils/getUrl';

// Import Icons
import { FaSpinner } from "react-icons/fa6";
import { IoMdRefresh } from 'react-icons/io';
import { GrOrganization } from "react-icons/gr";
import { GoOrganization } from "react-icons/go";
import { AiOutlineProduct } from 'react-icons/ai';
import { BsGraphUp, BsBox } from "react-icons/bs";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

function Dashboard() {
    const webTitle = 'สรุปข้อมูลครุภัณฑ์';

    const apiUrl = getApiUrl();
    const logoImage = getPublicUrl('logo.png');

    const navigate = useNavigate();

    const [inventoriesCount, setInventoriesCount] = useState(null);
    
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');

    const [selectedOrg, setSelectedOrg] = useState(null);
    const [selectedCheckOrg, setSelectedCheckOrg] = useState(null);

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('inventory-summary');

    useEffect(() => {
        fetchCountInventories();
    }, []);

    useEffect(() => {
        if (inventoriesCount && inventoriesCount.check) {
            generateYearOptions(inventoriesCount.check);
        }
    }, [inventoriesCount]);

    useEffect(() => {
        if (inventoriesCount && inventoriesCount.check && selectedYear) {
            const countByYear = getCountByYear(selectedYear);
            setInventoriesCount((prev) => ({ ...prev, countByYear }));
        }
    }, [selectedYear]);

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

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleRefresh = () => {
        navigate('/dashboard');
        window.location.reload();
    };

    const handleOrgSelect = (org) => {
        setSelectedOrg(org);
    };

    const handleCheckOrgSelect = (org) => {
        setSelectedCheckOrg(org);
    };

    const renderInventoryCount = () => {
        const orgCounts = inventoriesCount?.org || {};
    
        const orgMap = {
            '1767': orgCounts.org_01,
            '1768': orgCounts.org_02,
            '1769': orgCounts.org_03,
            '252,711,1111,1382,1608,1770': orgCounts.org_04,
            '167,192,267,767,1447,1627,1778': orgCounts.org_05,
            '274,807,1172,1454,1687,1785': orgCounts.org_06,
            '187,280,1692,1790': orgCounts.org_07,
            '188,286,819,1401,1698,1796': orgCounts.org_08,
            '189,291,827,1190,1465,1704,1802': orgCounts.org_09,
            '190,299,835,1198,1473,1712,1810': orgCounts.org_10,
            '191,309,587,848,1207,1482,1721,1869': orgCounts.org_11,
            '1729,1877': orgCounts.org_12,
            '548,856,1733,1881': orgCounts.org_13,
            '1739, 1887': orgCounts.org_14,
            '1215,1490,1736,1908': orgCounts.org_15,
        };
    
        const selectedOrgString = selectedOrg?.join(',');
    
        if (orgMap[selectedOrgString]) {
            return (
                <>
                    <p className="inventory-paragraph">จำนวน {orgMap[selectedOrgString]} รายการ</p>
                    <hr />
                    <Link to={`/inventories?page=1&search=&status=N,F,W&type=&org=${selectedOrgString}`} className="text-decoration-none text-black">
                        ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                    </Link>
                </>
            );
        } 
        else {
            return (
                <p className="inventory-paragraph">ไม่พบข้อมูล</p>
            );
        }
    };

    const renderNotInventoryCount = () => {
        const orgNotCounts = inventoriesCount?.not_org || {};
    
        const orgMap = {
            '1767': orgNotCounts.not_org_01,
            '1768': orgNotCounts.not_org_02,
            '1769': orgNotCounts.not_org_03,
            '252,711,1111,1382,1608,1770': orgNotCounts.not_org_04,
            '167,192,267,767,1447,1627,1778': orgNotCounts.not_org_05,
            '274,807,1172,1454,1687,1785': orgNotCounts.not_org_06,
            '187,280,1692,1790': orgNotCounts.not_org_07,
            '188,286,819,1401,1698,1796': orgNotCounts.not_org_08,
            '189,291,827,1190,1465,1704,1802': orgNotCounts.not_org_09,
            '190,299,835,1198,1473,1712,1810': orgNotCounts.not_org_10,
            '191,309,587,848,1207,1482,1721,1869': orgNotCounts.not_org_11,
            '1729,1877': orgNotCounts.not_org_12,
            '548,856,1733,1881': orgNotCounts.not_org_13,
            '1739, 1887': orgNotCounts.not_org_14,
            '1215,1490,1736,1908': orgNotCounts.not_org_15,
        };
    
        const selectedOrgNotString = selectedOrg?.join(',');
    
        if (orgMap[selectedOrgNotString]) {
            return (
                <>
                    <p className="inventory-paragraph">จำนวน {orgMap[selectedOrgNotString]} รายการ</p>
                    <hr />
                    <Link to={`/inventories?page=1&search=&status=Y,T,C,D,U&type=&org=${selectedOrgNotString}`} className="text-decoration-none text-black">
                        ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                    </Link>
                </>
            );
        } 
        else {
            return (
                <p className="inventory-paragraph">ไม่พบข้อมูล</p>
            );
        }
    };

    const renderCheckInventoryCount = () => {
        const orgCheckCounts = inventoriesCount?.check_org || {};
    
        const orgMap = {
            '1767': orgCheckCounts.check_org_01,
            '1768': orgCheckCounts.check_org_02,
            '1769': orgCheckCounts.check_org_03,
            '252,711,1111,1382,1608,1770': orgCheckCounts.check_org_04,
            '167,192,267,767,1447,1627,1778': orgCheckCounts.check_org_05,
            '274,807,1172,1454,1687,1785': orgCheckCounts.check_org_06,
            '187,280,1692,1790': orgCheckCounts.check_org_07,
            '188,286,819,1401,1698,1796': orgCheckCounts.check_org_08,
            '189,291,827,1190,1465,1704,1802': orgCheckCounts.check_org_09,
            '190,299,835,1198,1473,1712,1810': orgCheckCounts.check_org_10,
            '191,309,587,848,1207,1482,1721,1869': orgCheckCounts.check_org_11,
            '1729,1877': orgCheckCounts.check_org_12,
            '548,856,1733,1881': orgCheckCounts.check_org_13,
            '1739, 1887': orgCheckCounts.check_org_14,
            '1215,1490,1736,1908': orgCheckCounts.check_org_15,
        };
    
        const selectedCheckOrgString = selectedCheckOrg?.join(',');
    
        if (orgMap[selectedCheckOrgString]) {
            return (
                <>
                    <p className="inventory-paragraph">จำนวน {orgMap[selectedCheckOrgString]} รายการ</p>
                    <hr />
                    <Link to={`/inventories/check/list?page=1&search=&startYear=&endYear=&status=N,F,W&type=&org=${selectedCheckOrgString}`} className="text-decoration-none text-black">
                        ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                    </Link>
                </>
            );
        } 
        else {
            return (
                <p className="inventory-paragraph">ไม่พบข้อมูล</p>
            );
        }
    };

    const renderCheckNotInventoryCount = () => {
        const orgCheckNotCounts = inventoriesCount?.check_not_org || {};
    
        const orgMap = {
            '1767': orgCheckNotCounts.check_not_org_01,
            '1768': orgCheckNotCounts.check_not_org_02,
            '1769': orgCheckNotCounts.check_not_org_03,
            '252,711,1111,1382,1608,1770': orgCheckNotCounts.check_not_org_04,
            '167,192,267,767,1447,1627,1778': orgCheckNotCounts.check_not_org_05,
            '274,807,1172,1454,1687,1785': orgCheckNotCounts.check_not_org_06,
            '187,280,1692,1790': orgCheckNotCounts.check_not_org_07,
            '188,286,819,1401,1698,1796': orgCheckNotCounts.check_not_org_08,
            '189,291,827,1190,1465,1704,1802': orgCheckNotCounts.check_not_org_09,
            '190,299,835,1198,1473,1712,1810': orgCheckNotCounts.check_not_org_10,
            '191,309,587,848,1207,1482,1721,1869': orgCheckNotCounts.check_not_org_11,
            '1729,1877': orgCheckNotCounts.check_not_org_12,
            '548,856,1733,1881': orgCheckNotCounts.check_not_org_13,
            '1739, 1887': orgCheckNotCounts.check_not_org_14,
            '1215,1490,1736,1908': orgCheckNotCounts.check_not_org_15,
        };
    
        const selectedCheckNotOrgString = selectedCheckOrg?.join(',');
    
        if (orgMap[selectedCheckNotOrgString]) {
            return (
                <>
                    <p className="inventory-paragraph">จำนวน {orgMap[selectedCheckNotOrgString]} รายการ</p>
                    <hr />
                    <Link to={`/inventories/check/list?page=1&search=&startYear=&endYear=&status=Y,T,C,D,U&type=&org=${selectedCheckNotOrgString}`} className="text-decoration-none text-black">
                        ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                    </Link>
                </>
            );
        } 
        else {
            return (
                <p className="inventory-paragraph">ไม่พบข้อมูล</p>
            );
        }
    };

    function generateYearOptions(checkData) {
        const yearsWithData = checkData.map(item => item.fiscal_year);
        const sortedYears = [...new Set(yearsWithData)].sort((a, b) => a - b);
        setYears(sortedYears);
    }

    function getCountByYear(year) {
        const checkData = inventoriesCount.check || [];
        const foundYear = checkData.find((item) => item.fiscal_year === year.toString());
        return foundYear ? parseInt(foundYear.count) : 0;
    }

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
                                                <BsGraphUp size={30} className="m-3" />
                                                {'สรุปข้อมูล'}
                                            </h2>
                                        </Col>
                                        <Col md={6} className="d-flex justify-content-end align-items-center mt-0">
                                            <BlueOutlineButton className='refresh-btn' title="รีเฟรชข้อมูล" onClick={() => handleRefresh()} disabled={loading}>
                                                {loading ? <FaSpinner size={16} className="m-1 spin" /> : <IoMdRefresh className="refresh-btn-icon" size={16} />}
                                                {loading ? <span className="responsive-text-hidden">กำลังโหลด...</span> : <span className="responsive-text-hidden">รีเฟรช</span>}
                                            </BlueOutlineButton>
                                        </Col>
                                    </div>
                                    <DashboardTabs activeTab={activeTab} onTabClick={handleTabClick} />
                                    <Card className="tab-card">
                                        <Card.Body>
                                            <div className="tab-sub-content">
                                                {loading ? (
                                                    <Loader className="loader-bar" />
                                                ):(
                                                    <>
                                                        {activeTab === 'inventory-summary' && (
                                                            <>
                                                                <Row className="mt-3">
                                                                    <Col md={12}>
                                                                        <h3 className="inventory-dashboard card-title responsive-header">
                                                                            <BsBox size={28} className="inventory-dashboard-icon" />
                                                                            {'ข้อมูลครุภัณฑ์ (ทั้งหมด)'}
                                                                        </h3>
                                                                    </Col>
                                                                    <Col md={12} className="mb-3">
                                                                        <Card>
                                                                            <Card.Body className="p-4" title="ครุภัณฑ์ทั้งหมดในฐานข้อมูล">
                                                                                <h5 className="inventory-nametag">ครุภัณฑ์ทั้งหมดในฐานข้อมูล</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-paragraph">จำนวน {inventoriesCount ? inventoriesCount.total.total_all : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={12} className="mb-3">
                                                                        <Card>
                                                                            <Card.Body className="p-4" title="ครุภัณฑ์ที่มีการใช้งานอยู่ในปัจจุบัน">
                                                                                <h5 className="inventory-nametag">ครุภัณฑ์ที่มีการใช้งานอยู่ในปัจจุบัน</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-paragraph">จำนวน {inventoriesCount ? inventoriesCount.total.total_sum_all : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,W,F&type=&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card>
                                                                            <Card.Body className="p-4" title="สถานะใช้งานอยู่">
                                                                                <h5 className="inventory-nametag">สถานะใช้งานอยู่</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-paragraph">จำนวน {inventoriesCount ? inventoriesCount.status.N_status + inventoriesCount.status.F_status : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F&type=&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card>
                                                                            <Card.Body className="p-4" title="สถานะรอจำหน่าย">
                                                                                <h5 className="inventory-nametag">สถานะรอจำหน่าย</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-paragraph">จำนวน {inventoriesCount ? inventoriesCount.status.W_status : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=W&type=&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card>
                                                                            <Card.Body className="p-4" title="สถานะชำรุด/เสื่อมสภาพ">
                                                                                <h5 className="inventory-nametag">สถานะชำรุด/เสื่อมสภาพ</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-paragraph">จำนวน {inventoriesCount ? inventoriesCount.status.D_status : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=D&type=&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card>
                                                                            <Card.Body className="p-4" title="สถานะหมดความจำเป็นใช้งาน">
                                                                                <h5 className="inventory-nametag">สถานะหมดความจำเป็นใช้งาน</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-paragraph">จำนวน {inventoriesCount ? inventoriesCount.status.U_status : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=U&type=&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>
                                                            </>
                                                        )}
                                                        {activeTab === 'inventory-org-summary' && (
                                                            <>
                                                                <Row className="mt-3">
                                                                    <Col md={12}>
                                                                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                                                                            <h3 className="inventory-dashboard card-title responsive-header text-truncate-custom">
                                                                                <GoOrganization size={28} className="inventory-dashboard-icon" />
                                                                                {'ข้อมูลครุภัณฑ์ (ตามหน่วยงาน)'}
                                                                            </h3>
                                                                            <DashboardOrganizationDropdown selectedOrg={selectedOrg} onSelect={handleOrgSelect} />
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={12} className="mb-3">
                                                                        <Card>
                                                                            <Card.Body className="p-4" title="ครุภัณฑ์ที่มีการใช้งานอยู่ในปัจจุบัน">
                                                                                <h5 className="inventory-nametag">ครุภัณฑ์ที่มีการใช้งานอยู่ในปัจจุบัน</h5>
                                                                                {renderInventoryCount()}
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={12} className="mb-3">
                                                                        <Card>
                                                                            <Card.Body className="p-4" title="ครุภัณฑ์ที่ไม่ได้ใช้งานอยู่ในปัจจุบัน">
                                                                                <h5 className="inventory-nametag">ครุภัณฑ์ที่ไม่ได้ใช้งานอยู่ในปัจจุบัน</h5>
                                                                                {renderNotInventoryCount()}
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>
                                                            </>
                                                        )}
                                                        {activeTab === 'inventory-check-summary' && (
                                                            <>
                                                                <Row className="mt-3">
                                                                    <Col md={12}>
                                                                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                                                                            <h3 className="inventory-dashboard card-title responsive-header text-truncate-custom">
                                                                                <HiOutlineClipboardDocumentCheck size={28} className="inventory-dashboard-icon" />
                                                                                {'ข้อมูลการตรวจนับครุภัณฑ์ (ทั้งหมด)'}
                                                                            </h3>
                                                                            <DashboardYearDropdown years={years} selectedYear={selectedYear} onSelectYear={setSelectedYear} />
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={12} className="mb-3">
                                                                        <Card>
                                                                            <Card.Body className="p-4" title="ครุภัณฑ์ที่ตรวจนับแล้ว">
                                                                                <h5 className="inventory-nametag">ครุภัณฑ์ที่ตรวจนับแล้ว</h5>
                                                                                {selectedYear === '' ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    inventoriesCount.countByYear === inventoriesCount.total.total_sum_all ? (
                                                                                        <p className="inventory-paragraph">จำนวน {inventoriesCount.countByYear} รายการ (ตรวจนับครบทุกรายการแล้ว)</p>
                                                                                    ) : (
                                                                                        <p className="inventory-paragraph">จำนวน {inventoriesCount.countByYear} รายการ</p>
                                                                                    )
                                                                                )}
                                                                                {selectedYear && (
                                                                                    <>
                                                                                        <hr />
                                                                                        <Link to={`/inventories/check/list?page=1&search=&startYear=${selectedYear}&endYear=${selectedYear}&status=&org=`} className="text-decoration-none text-black">
                                                                                            ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                        </Link>
                                                                                    </>
                                                                                )}
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    {inventoriesCount.countByYear !== inventoriesCount.total.total_sum_all && (
                                                                        <Col md={12} className="mb-3">
                                                                            <Card>
                                                                                <Card.Body className="p-4" title="ครุภัณฑ์ที่ยังไม่ได้ตรวจนับ">
                                                                                    <h5 className="inventory-nametag">ครุภัณฑ์ที่ยังไม่ได้ตรวจนับ</h5>
                                                                                    {selectedYear === '' ? (
                                                                                        <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                    ):(
                                                                                        <p className="inventory-paragraph">จำนวน {inventoriesCount.total.total_sum_all - inventoriesCount.countByYear} รายการ</p>
                                                                                    )}
                                                                                </Card.Body>
                                                                            </Card>
                                                                        </Col>
                                                                    )}
                                                                </Row>
                                                            </>
                                                        )}
                                                        {activeTab === 'inventory-check-org-summary' && (
                                                            <>
                                                                <Row className="mt-3">
                                                                    <Col md={12}>
                                                                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                                                                            <h3 className="inventory-dashboard card-title responsive-header text-truncate-custom">
                                                                                <GrOrganization size={28} className="inventory-dashboard-icon" />
                                                                                {'ข้อมูลการตรวจนับครุภัณฑ์ (ตามหน่วยงาน)'}
                                                                            </h3>
                                                                            <DashBoardCheckOrganizationDropdown selectedCheckOrg={selectedCheckOrg} onSelect={handleCheckOrgSelect} />
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={12} className="mb-3">
                                                                        <Card>
                                                                            <Card.Body className="p-4" title="ครุภัณฑ์ที่มีการใช้งานอยู่ในปัจจุบัน">
                                                                                <h5 className="inventory-nametag">ครุภัณฑ์ที่มีการใช้งานอยู่ในปัจจุบัน</h5>
                                                                                {renderCheckInventoryCount()}
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={12} className="mb-3">
                                                                        <Card>
                                                                            <Card.Body className="p-4" title="ครุภัณฑ์ที่ไม่ได้ใช้งานอยู่ในปัจจุบัน">
                                                                                <h5 className="inventory-nametag">ครุภัณฑ์ที่ไม่ได้ใช้งานอยู่ในปัจจุบัน</h5>
                                                                                {renderCheckNotInventoryCount()}
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>
                                                            </>
                                                        )}
                                                        {activeTab === 'inventory-type-summary' && (
                                                            <>
                                                                <Row className="mt-3">
                                                                    <Col md={12}>
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <h3 className="inventory-dashboard card-title responsive-header">
                                                                                <AiOutlineProduct size={28} className="inventory-dashboard-icon" />
                                                                                {'ข้อมูลประเภทครุภัณฑ์'}
                                                                            </h3>
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={12} className="mb-3">
                                                                        <Card>
                                                                            <Card.Body className="p-4" title="ครุภัณฑ์ที่มีการใช้งานอยู่ในปัจจุบัน">
                                                                                <h5 className="inventory-nametag">ครุภัณฑ์ที่มีการใช้งานอยู่ในปัจจุบัน</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-paragraph">จำนวน {inventoriesCount ? inventoriesCount.total.total_sum_all : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,W,F&type=&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์ก่อสร้าง</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.building : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=1&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์การเกษตร</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.agri : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=2&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์การแพทย์และวิทยาศาสตร์</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.med_sci : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=3&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์การศึกษา</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.edu : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=4&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์กีฬา/กายภาพ</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.sport : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=5&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์คอมพิวเตอร์</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.com : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=6&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์โฆษณาและการเผยแพร่</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.pr : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=7&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์งานบ้าน/งานครัว</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.kitchen : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=8&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์ดนตรี/นาฏศิลป์</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.art : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=9&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์ที่ดินของหน่วยงาน</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.land : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=10&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์ไฟฟ้าและวิทยุ</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.electric : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=11&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์ยานพาหนะและขนส่ง</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.car : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=12&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์โรงงาน</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.factory : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=13&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์สนาม</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.ground : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=14&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์สำนักงาน</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.office : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=15&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์สำรวจ</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.survey : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=16&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์อาวุธ</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.weapon : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=17&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์ที่ดิน/ที่ราชพัสดุ</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.gov_ground : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=19&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์โปรแกรมคอมพิวเตอร์</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.program : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=20&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">สิ่งก่อสร้าง</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.build : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=21&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">สิ่งปลูกสร้าง</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.construct : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=22&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">สินทรัพย์โครงสร้าง</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.asset : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=23&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">สินทรัพย์ไม่มีตัวตน</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.blank_asset : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=24&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">อาคารชั่วคราว/โรงเรือน</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.temp_building : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=25&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">อาคารถาวร</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.permanent_building : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=26&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col md={6} className="mb-3">
                                                                        <Card className="inventory-type-card">
                                                                            <Card.Body className="p-4">
                                                                                <h5 className="inventory-type-nametag">ครุภัณฑ์อื่นๆ</h5>
                                                                                {!inventoriesCount ? (
                                                                                    <p className="inventory-paragraph">ไม่พบข้อมูล</p>
                                                                                ):(
                                                                                    <p className="inventory-type-paragraph">จำนวน {inventoriesCount ? inventoriesCount.type.other : 0} รายการ</p>
                                                                                )}
                                                                                <hr />
                                                                                <Link to="/inventories?page=1&search=&status=N,F,W&type=18&org=" className="text-decoration-none text-black">
                                                                                    ดูข้อมูลเพิ่มเติม <span>&gt;</span>
                                                                                </Link>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>
                                                            </>
                                                        )}
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
        </Layout>
    );
}

export default Dashboard;