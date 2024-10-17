// Import Libraries
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Card, Row, Col, Pagination } from 'react-bootstrap';

// Import Assets
import '@assets/css/global.css';
import '@assets/css/pages/Inventories.css';

// Import Components
import Loader from '@components/loader/Loader';
import Layout from '@components/layouts/Layout';
import { DataCount } from '@components/datacount/DataCount';
import { Searchbox } from '@components/searchbox/Searchbox';
import { BlueOutlineButton, GreenOutlineButton, DarkOutlineButton } from '@components/buttons/OutlineButton';

// Import Features
import InventoriesDataTable from '@features/Inventories/InventoriesDataTable';
import InventoriesImageModal from '@features/Inventories/InventoriesImageModal';
import InventoriesDetailModal from '@features/Inventories/InventoriesDetailModal';
import InventoriesAdvancedSearchDropdown from '@features/Inventories/InventoriesAdvancedSearchDropdown';

// Import Utilities
import { getApiUrl, getPublicUrl } from '@utils/getUrl';

// Import Icons
import { FaSpinner } from "react-icons/fa6";
import { LuLayoutList } from "react-icons/lu";
import { TbListSearch } from "react-icons/tb";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoMdRefresh, IoMdAdd } from 'react-icons/io';
import { MdOutlineFileDownload } from 'react-icons/md';

function Inventories() {
    const webTitle = 'ข้อมูลครุภัณฑ์';

    const apiUrl = getApiUrl();
    const logoImage = getPublicUrl('logo.png');

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const currentSearchQuery = searchParams.get('search') || '';
    const currentOrgs = searchParams.get('org') ? searchParams.get('org').split(',') : [];
    const currentType = searchParams.get('type') ? searchParams.get('type').split(',') : [];
    const currentStatus = searchParams.get('status') ? searchParams.get('status').split(',') : [];

    const [inventories, setInventories] = useState([]);
    const [inventoriesCount, setInventoriesCount] = useState(0);
    const [currentInventory, setCurrentInventory] = useState([]);
    const [inventoryModalTitle, setInventoryModalTitle] = useState('');
    const [filteredInventories, setFilteredInventories] = useState([]);
    const [showInventoryModal, setShowInventoryModal] = useState(false);

    const [currentImages, setCurrentImages] = useState([]);
    const [imageModalTitle, setImageModalTitle] = useState('');
    const [showImageModal, setShowImageModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [advancedSearchIcon, setAdvancedSearchIcon] = useState(<TbListSearch size={16} className="m-1" />);
    const [advancedSearchText, setAdvancedSearchText] = useState(<span className="responsive-text-hidden">ค้นหาขั้นสูง</span>);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(inventoriesCount / itemsPerPage);

    const inventoriesCache = useRef({});

    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(currentSearchQuery);

    const [selectedOrgs, setSelectedOrgs] = useState(null);
    const [selectedTypes, setSelectedTypes] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState([]);

    useEffect(() => {
        fetchInventories();
    }, [currentPage, currentSearchQuery, currentStatus, currentType, currentOrgs]);

    async function fetchInventories() {
        const cacheKey = `${currentPage}-${currentSearchQuery}-${currentStatus.join(',')}-${currentType.join(',')}-${currentOrgs.join(',')}`;
        if (inventoriesCache.current[cacheKey]) {
            const cachedData = inventoriesCache.current[cacheKey];
            setInventories(cachedData.data);
            setInventoriesCount(cachedData.meta.total);
            setLoading(false);
        } else {
            try {
                const response = await axios.get(`${apiUrl}api/getInventories`, {
                    params: {
                        page: currentPage,
                        per_page: itemsPerPage,
                        search: currentSearchQuery,
                        status: currentStatus,
                        type: currentType,
                        org: currentOrgs
                    }
                });
                inventoriesCache.current[cacheKey] = response.data;
                setInventories(response.data.data);
                setInventoriesCount(response.data.meta.total);
            } catch (error) {
                console.error('เกิดข้อผิดพลาดระหว่างดึงข้อมูลจาก API', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleRefresh = () => {
        navigate('/inventories');
        window.location.reload();
    };
    
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchParams({ 
            page: 1, 
            search: query, 
            status: currentStatus.join(','), 
            type: currentType.join(','), 
            org: currentOrgs.join(',') 
        });
    };

    const handleImageClick = (images, title) => {
        setCurrentImages(images);
        setImageModalTitle(title);
        setShowImageModal(true);
    };
    
    const handleInventoryClick = (inventory, title) => {
        setCurrentInventory(inventory);
        setInventoryModalTitle(title);
        setShowInventoryModal(true);
    };

    const handleAdvancedSearchToggle = () => {
        setShowAdvancedSearch(prevState => {
            const newState = !prevState;
            setAdvancedSearchIcon(newState ? <FaRegEyeSlash size={16} className="m-1" /> : <TbListSearch size={16} className="m-1" />);
            setAdvancedSearchText(newState ? <span className="responsive-text-hidden">ซ่อน</span> : <span className="responsive-text-hidden">ค้นหาขั้นสูง</span>);
            return newState;
        });
    };

    const handleAdvancedSearch = async (advancedParams) => {
        setLoading(true);
        const { status, type, org } = advancedParams;
        setSelectedOrgs(org || null);
        setSelectedStatus(status || []);
        setSelectedTypes(type || null);
        setSearchParams({
            page: 1,
            search: searchQuery,
            status: status.join(','),
            type: type.join(','),
            org: org.join(',')
        });
        await fetchInventories();
        setLoading(false);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setSearchParams({
                page: pageNumber,
                search: currentSearchQuery,
                status: currentStatus.join(','),
                type: currentType.join(','),
                org: currentOrgs.join(',')
            });
        }
    };

    const maxVisiblePages = 3;
    const paginationItems = [];

    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationItems.push(
            <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
                {i}
            </Pagination.Item>
        );
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
                                    <div className="d-flex flex-wrap justify-between align-items-center">
                                        <Col md={6}>
                                            <h2 className="card-title responsive-header">
                                                <LuLayoutList size={30} className="m-3" />
                                                {'ข้อมูลครุภัณฑ์'}
                                            </h2>
                                        </Col>
                                        <Col md={6} className="d-flex justify-content-end align-items-center mt-0">
                                            <Searchbox className="search-box" placeholder="ค้นหาชื่อครุภัณฑ์" value={currentSearchQuery} onChange={handleSearchChange} />
                                            <BlueOutlineButton className='refresh-btn' title="รีเฟรชข้อมูล" onClick={() => handleRefresh()} disabled={loading}>
                                                {loading ? <FaSpinner size={16} className="m-1 spin" /> : <IoMdRefresh className="refresh-btn-icon" size={16} />}
                                                {loading ? <span className="responsive-text-hidden">กำลังโหลด...</span> : <span className="responsive-text-hidden">รีเฟรช</span>}
                                            </BlueOutlineButton>
                                            {/* <GreenOutlineButton className='add-btn' title="เพิ่มข้อมูล" href={`#`}>
                                                <IoMdAdd size={16} className="m-1" />
                                                <span className="responsive-text-hidden">เพิ่ม</span>
                                            </GreenOutlineButton> */}
                                            {/* <DarkOutlineButton className='download-btn' title="ดาวน์โหลด CSV">
                                                <MdOutlineFileDownload size={16} className="m-1" />
                                                <span className="responsive-text-hidden">CSV</span>
                                            </DarkOutlineButton> */}
                                            <DarkOutlineButton className='advanced-search-btn' title="ค้นหาข้อมูลขั้นสูง" onClick={handleAdvancedSearchToggle}>
                                                {advancedSearchIcon}
                                                {advancedSearchText}
                                            </DarkOutlineButton>
                                        </Col>
                                    </div>
                                    {showAdvancedSearch && (
                                        <div className="mt-3">
                                            <InventoriesAdvancedSearchDropdown onSearch={handleAdvancedSearch} />
                                        </div>
                                    )}
                                    {loading ? (
                                        <Loader className="loader-bar" />
                                    ):(
                                        <>
                                            <div className="mt-3">
                                                <InventoriesDataTable filteredInventories={inventories} currentPage={currentPage} itemsPerPage={itemsPerPage} handleImageClick={handleImageClick} handleInventoryClick={handleInventoryClick} logoImage={logoImage} />
                                            </div>
                                            <div className="paginate-datacount">
                                                <Pagination className="pagination">
                                                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                                                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                                                        {startPage > 1 && <Pagination.Ellipsis />}
                                                        {paginationItems}
                                                        {endPage < totalPages && <Pagination.Ellipsis />}
                                                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                                                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                                                </Pagination>
                                                <DataCount className="datacount">{inventoriesCount}</DataCount>
                                            </div>
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </HelmetProvider>        
            </Container>
            <InventoriesImageModal show={showImageModal} onHide={() => setShowImageModal(false)} images={currentImages} title={imageModalTitle} initialIndex={currentImageIndex} />
            {currentInventory && (
                <InventoriesDetailModal show={showInventoryModal} onHide={() => setShowInventoryModal(false)} inventory={currentInventory} title={inventoryModalTitle} />
            )}
        </Layout>
    );
}

export default Inventories;