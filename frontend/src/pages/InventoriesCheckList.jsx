// Import Libraries
import axios from 'axios';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import html2pdf from 'html2pdf.js';
import React, { useState, useEffect, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Card, Row, Col, Pagination, Table, Tab, Tabs, Button, Modal, Dropdown } from 'react-bootstrap';

// Import Assets
import '@assets/css/global.css';
import '@assets/css/pages/InventoriesCheckList.css';

// Import Components
import Loader from '@components/loader/Loader';
import Layout from '@components/layouts/Layout';
import { DataCount } from '@components/datacount/DataCount';
import { Searchbox } from '@components/searchbox/Searchbox';
import { BlueOutlineButton, GrayOutlineButton, DarkOutlineButton, YellowOutlineButton, RedOutlineButton } from '@components/buttons/OutlineButton';

// Import Features
import InventoriesCheckListDataTable from '@features/InventoriesCheckList/InventoriesCheckListDataTable';
import InventoriesCheckListDetailModal from '@features/InventoriesCheckList/InventoriesCheckListDetailModal';
import InventoriesCheckListAdvancedSearchDropdown from '@features/InventoriesCheckList/InventoriesCheckListAdvancedSearchDropdown';

// Import Utilities
import { getApiUrl, getPublicUrl } from '@utils/getUrl';

// Import Icons
import { IoClose } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";
import { FaSpinner } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { IoMdRefresh } from 'react-icons/io';
import { TbListSearch } from "react-icons/tb";
import { RiFileExcel2Line } from "react-icons/ri";
import { FaRegEyeSlash, FaRegFilePdf, FaCheck } from "react-icons/fa";
import { MdPreview, MdKeyboardArrowDown, MdOutlineCancel } from 'react-icons/md';
import { BsCardChecklist, BsBuildingFillExclamation, BsBuildingFillX } from "react-icons/bs";

function InventoriesCheckList() {
    const webTitle = 'ประวัติการตรวจนับครุภัณฑ์';

    const apiUrl = getApiUrl();
    const logoImage = getPublicUrl('logo.png');

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const currentSearchQuery = searchParams.get('search') || '';
    const currentStartYear = searchParams.get('startYear') || '';
    const currentEndYear = searchParams.get('endYear') || '';
    const currentOrgs = searchParams.get('org') ? searchParams.get('org').split(',') : [];
    const currentStatus = searchParams.get('status') ? searchParams.get('status').split(',') : [];

    const [inventories, setInventories] = useState([]);

    const [currentInventoryCheckList, setCurrentInventoryCheckList] = useState([]);
    const [inventoryCheckListModalTitle, setInventoryCheckListModalTitle] = useState('');
    const [showInventoryCheckListModal, setShowInventoryCheckListModal] = useState(false);

    const [checkLists, setCheckLists] = useState([]);
    const [checkListsCount, setCheckListsCount] = useState(0);

    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [advancedSearchIcon, setAdvancedSearchIcon] = useState(<TbListSearch size={16} className="m-1" />);
    const [advancedSearchText, setAdvancedSearchText] = useState(<span className="responsive-text-hidden">ค้นหาขั้นสูง</span>);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(checkListsCount / itemsPerPage);

    const inventoriesCache = useRef({});
    const pageCache = useRef(currentPage);

    const [isPDFOpen, setIsPDFOpen] = useState(false);
    const [isHTMLOpen, setIsHTMLOpen] = useState(false);
    const [isExcelOpen, setIsExcelOpen] = useState(false);

    const [csvData, setCsvData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(currentSearchQuery);

    const [selectedOrgs, setSelectedOrgs] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState([]);

    const [key, setKey] = useState('remaining');
    const [tableData, setTableData] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showDownloadModal, setShowDownloadModal] = useState(false);

    const itemsPerPageCount = 10;
    const itemsPerPageCount1 = 10;
    const itemsPerPageCount2 = 10;

    const [activePage, setActivePage] = useState(1); 
    const [activePage1, setActivePage1] = useState(1); 
    const [activePage2, setActivePage2] = useState(1);
    
    const [dataN, setDataN] = useState([]);
    const [dataD, setDataD] = useState([]);
    const [dataU, setDataU] = useState([]);

    const indexOfLastItem = activePage * itemsPerPageCount;
    const indexOfFirstItem = indexOfLastItem - itemsPerPageCount;
    const currentItems = dataN.slice(indexOfFirstItem, indexOfLastItem);
    const totalPagesmodal1 = Math.ceil(dataN.length / itemsPerPageCount);

    const indexOfLastItem1 = activePage1 * itemsPerPageCount1;
    const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPageCount1;
    const totalPagesmodal2 = Math.ceil(dataD.length / itemsPerPageCount1);
    const currentItems1 = dataD.slice(indexOfFirstItem1, indexOfLastItem1);

    const indexOfLastItem2 = activePage2 * itemsPerPageCount2;
    const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPageCount2;
    const totalPagesmodal3 = Math.ceil(dataU.length / itemsPerPageCount2);
    const currentItems2 = dataU.slice(indexOfFirstItem2, indexOfLastItem2); 

    useEffect(() => {
        const fetchData = async () => {
            await fetchCheckLists();
            await fetchInventories();
        };
        fetchData();
    }, [currentPage, searchQuery, currentStatus, currentOrgs]);

    async function fetchInventories() {
        try {
            const response = await axios.get(`${apiUrl}api/getInventories`);
            setInventories(response.data.data);
        } 
        catch (error) {
            console.error('เกิดข้อผิดพลาดระหว่างดึงข้อมูลจาก API', error);
        }
        finally {
            setLoading(false);
        }
    };

    async function fetchCheckLists() {
        const cacheKey = `${currentPage}-${currentSearchQuery}-${currentStartYear}-${currentEndYear}-${currentStatus.join(',')}-${currentOrgs.join(',')}`;
        if (inventoriesCache.current[cacheKey]) {
            const cachedData = inventoriesCache.current[cacheKey];
            setCheckLists(cachedData.data);
            setCheckListsCount(cachedData.meta.total);
            setLoading(false);
        } else {
            try {
                const response = await axios.get(`${apiUrl}api/getCheckHistories`, {
                    params: {
                        page: currentPage,
                        per_page: itemsPerPage,
                        search: currentSearchQuery,
                        startYear: currentStartYear,
                        endYear: currentEndYear,
                        status: currentStatus,
                        org: currentOrgs
                    }
                });
                inventoriesCache.current[cacheKey] = response.data;
                setCheckLists(response.data.data);
                setCheckListsCount(response.data.meta.total);
            } 
            catch (error) {
                console.error('เกิดข้อผิดพลาดระหว่างดึงข้อมูลจาก API', error);
            }
            finally {
                setLoading(false);
            }
        }
        pageCache.current = currentPage;
    };

    const handleDownloadExcel1 = async () => {
        Swal.fire({
            title: "ต้องการดาวน์โหลดรายงานการตรวจนับครุภัณฑ์หรือไม่?",
            text: "หากต้องการดาวน์โหลดรายงานการตรวจนับครุภัณฑ์เป็นไฟล์ Excel กรุณากดปุ่มดาวน์โหลด",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "ดาวน์โหลด",
            cancelButtonColor: "#d33",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.get(`${apiUrl}api/getReport`);
                    const csvData = response.data;

                    const fileName = 'รายงานการตรวจนับครุภัณฑ์.xlsx';

                    const dataN = csvData.filter(row => row.dispense_flg === 'N' || row.dispense_flg === 'F');
                    const dataD = csvData.filter(row => row.dispense_flg === 'D');
                    const dataU = csvData.filter(row => row.dispense_flg === 'U');

                    const createSheetData = (data) => {
                        const headers = ['ลำดับ', 'รายการ', 'หมายเลขครุภัณฑ์', 'หน่วยงาน', 'ผู้รับผิดชอบ', 'เบอร์โทร', 'อาคาร', 'ชั้น', 'ห้อง', 'หมายเหตุ'];
                        return [
                            [`รายงานการตรวจนับครุภัณฑ์ กรมวิทยาศาสตร์บริการ (วศ.)`],
                            headers,
                            ...data.map((row, index) => [
                                index + 1,
                                row.inv_name,
                                row.inv_sn,
                                row.sub_division_name,
                                row.emp_name,
                                row.dss_phone,
                                row.building_name || '',  
                                row.floor_no || '',  
                                row.room_name || '', 
                                ''
                            ])
                        ];
                    };

                    const wsN = XLSX.utils.aoa_to_sheet(createSheetData(dataN));
                    const wsD = XLSX.utils.aoa_to_sheet(createSheetData(dataD));
                    const wsU = XLSX.utils.aoa_to_sheet(createSheetData(dataU));

                    const columnWidths = [
                        { wch: 5 }, 
                        { wch: 50 },  
                        { wch: 30 },  
                        { wch: 50 },  
                        { wch: 20 },  
                        { wch: 15 },  
                        { wch: 45 },  
                        { wch: 5 },  
                        { wch: 30 },  
                        { wch: 15 } 
                    ];
                    wsN['!cols'] = columnWidths;
                    wsD['!cols'] = columnWidths;
                    wsU['!cols'] = columnWidths;

                    const mergeCells = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 9 } }];
                    wsN['!merges'] = mergeCells;
                    wsD['!merges'] = mergeCells;
                    wsU['!merges'] = mergeCells;

                    const centerStyle = {
                        alignment: { horizontal: 'center', vertical: 'center' },
                        font: { bold: true },
                        border: {
                            top: { style: 'thin' },
                            bottom: { style: 'thin' },
                            left: { style: 'thin' },
                            right: { style: 'thin' }
                        }
                    };

                    const applyStylesToRows1And2 = (ws) => {
                        ws['A1'].s = centerStyle;
                        for (let C = 0; C <= 9; C++) {
                            const cellAddress = XLSX.utils.encode_cell({ r: 1, c: C });
                            if (!ws[cellAddress]) ws[cellAddress] = { t: 's', v: '' };
                            ws[cellAddress].s = centerStyle;
                        }
                    };

                    applyStylesToRows1And2(wsN);
                    applyStylesToRows1And2(wsD);
                    applyStylesToRows1And2(wsU);

                    const centerColA = (ws) => {
                        const range = XLSX.utils.decode_range(ws['!ref']);
                        for (let R = range.s.r; R <= range.e.r; R++) {
                            const cellAddress = XLSX.utils.encode_cell({ r: R, c: 0 });
                            if (!ws[cellAddress]) ws[cellAddress] = { t: 's', v: '' };
                            ws[cellAddress].s = { alignment: { horizontal: 'center', vertical: 'center' } };
                        }
                    };

                    centerColA(wsN);
                    centerColA(wsD);
                    centerColA(wsU);

                    const applyBorderToSheet = (ws) => {
                        const range = XLSX.utils.decode_range(ws['!ref']);
                        for (let R = range.s.r; R <= range.e.r; R++) {
                            for (let C = range.s.c; C <= range.e.c; C++) {
                                const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                                if (!ws[cellAddress]) ws[cellAddress] = { t: 's', v: '' };
                                ws[cellAddress].s = { border: { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } } };
                            }
                        }
                    };

                    applyBorderToSheet(wsN);
                    applyBorderToSheet(wsD);
                    applyBorderToSheet(wsU);

                    const setAutoFilter = (ws) => {
                        const range = XLSX.utils.decode_range(ws['!ref']);
                        ws['!autofilter'] = { ref: XLSX.utils.encode_range({ s: { r: 1, c: 0 }, e: { r: 1, c: range.e.c } }) };
                    };

                    setAutoFilter(wsN);
                    setAutoFilter(wsD);
                    setAutoFilter(wsU);

                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, wsN, 'ครุภัณฑ์ที่มีการใช้งานอยู่');
                    XLSX.utils.book_append_sheet(wb, wsD, 'ครุภัณฑ์ที่ชำรุด-เสื่อมสภาพ');
                    XLSX.utils.book_append_sheet(wb, wsU, 'ครุภัณฑ์ที่หมดความจำเป็นใช้งาน');
                    XLSX.writeFile(wb, fileName);

                    Swal.fire({
                        icon: 'success',
                        title: 'ดาวน์โหลดรายงานการตรวจนับครุภัณฑ์สำเร็จ!',
                        text: 'ดาวน์โหลดไฟล์ Excel เรียบร้อยแล้ว',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "ตกลง"
                    });
                } 
                catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาดขณะดาวน์โหลดรายงานการตรวจนับครุภัณฑ์!',
                        text: 'กรุณาลองใหม่อีกครั้ง',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "ตกลง"
                    });
                    console.error('เกิดข้อผิดพลาดระหว่างดาวน์โหลดรายงานการตรวจนับครุภัณฑ์', error);
                }
            }
        });
    };

    const handleDownloadExcel2 = async () => {
        Swal.fire({
            title: "ต้องการดาวน์โหลดรายงานการตรวจนับครุภัณฑ์หรือไม่?",
            text: "หากต้องการดาวน์โหลดรายงานการตรวจนับครุภัณฑ์เป็นไฟล์ Excel กรุณากดปุ่มดาวน์โหลด",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "ดาวน์โหลด",
            cancelButtonColor: "#d33",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.get(`${apiUrl}api/getReport`);
                    const csvData = response.data;

                    const fileName = 'รายงานการตรวจนับครุภัณฑ์ที่มีการใช้งานอยู่.xlsx';

                    const dataN = csvData.filter(row => row.dispense_flg === 'N' || row.dispense_flg === 'F');

                    const createSheetData = (data) => {
                        const headers = ['ลำดับ', 'รายการ', 'หมายเลขครุภัณฑ์', 'หน่วยงาน', 'ผู้รับผิดชอบ', 'เบอร์โทร', 'อาคาร', 'ชั้น', 'ห้อง', 'หมายเหตุ'];
                        return [
                            [`รายงานการตรวจนับครุภัณฑ์ที่มีการใช้งานอยู่ กรมวิทยาศาสตร์บริการ (วศ.)`],
                            headers,
                            ...data.map((row, index) => [
                                index + 1,
                                row.inv_name,
                                row.inv_sn,
                                row.sub_division_name,
                                row.emp_name,
                                row.dss_phone,
                                row.building_name || '',  
                                row.floor_no || '',  
                                row.room_name || '', 
                                ''
                            ])
                        ];
                    };

                    const wsN = XLSX.utils.aoa_to_sheet(createSheetData(dataN));

                    const columnWidths = [
                        { wch: 5 }, 
                        { wch: 50 },  
                        { wch: 30 },  
                        { wch: 50 },  
                        { wch: 20 },  
                        { wch: 15 },  
                        { wch: 45 },  
                        { wch: 5 },  
                        { wch: 30 },  
                        { wch: 15 } 
                    ];
                    wsN['!cols'] = columnWidths;

                    const mergeCells = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 9 } }];
                    wsN['!merges'] = mergeCells;

                    const centerStyle = {
                        alignment: { horizontal: 'center', vertical: 'center' },
                        font: { bold: true },
                        border: {
                            top: { style: 'thin' },
                            bottom: { style: 'thin' },
                            left: { style: 'thin' },
                            right: { style: 'thin' }
                        }
                    };

                    const applyStylesToRows1And2 = (ws) => {
                        ws['A1'].s = centerStyle;
                        for (let C = 0; C <= 9; C++) {
                            const cellAddress = XLSX.utils.encode_cell({ r: 1, c: C });
                            if (!ws[cellAddress]) ws[cellAddress] = { t: 's', v: '' };
                            ws[cellAddress].s = centerStyle;
                        }
                    };

                    applyStylesToRows1And2(wsN);

                    const centerColA = (ws) => {
                        const range = XLSX.utils.decode_range(ws['!ref']);
                        for (let R = range.s.r; R <= range.e.r; R++) {
                            const cellAddress = XLSX.utils.encode_cell({ r: R, c: 0 });
                            if (!ws[cellAddress]) ws[cellAddress] = { t: 's', v: '' };
                            ws[cellAddress].s = { alignment: { horizontal: 'center', vertical: 'center' } };
                        }
                    };

                    centerColA(wsN);

                    const applyBorderToSheet = (ws) => {
                        const range = XLSX.utils.decode_range(ws['!ref']);
                        for (let R = range.s.r; R <= range.e.r; R++) {
                            for (let C = range.s.c; C <= range.e.c; C++) {
                                const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                                if (!ws[cellAddress]) ws[cellAddress] = { t: 's', v: '' };
                                ws[cellAddress].s = { border: { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } } };
                            }
                        }
                    };

                    applyBorderToSheet(wsN);

                    const setAutoFilter = (ws) => {
                        const range = XLSX.utils.decode_range(ws['!ref']);
                        ws['!autofilter'] = { ref: XLSX.utils.encode_range({ s: { r: 1, c: 0 }, e: { r: 1, c: range.e.c } }) };
                    };

                    setAutoFilter(wsN);

                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, wsN, 'ครุภัณฑ์ที่มีการใช้งานอยู่');
                    XLSX.writeFile(wb, fileName);

                    Swal.fire({
                        icon: 'success',
                        title: 'ดาวน์โหลดรายงานการตรวจนับครุภัณฑ์สำเร็จ!',
                        text: 'ดาวน์โหลดไฟล์ Excel เรียบร้อยแล้ว',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "ตกลง"
                    });
                } 
                catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาดขณะดาวน์โหลดรายงานการตรวจนับครุภัณฑ์!',
                        text: 'กรุณาลองใหม่อีกครั้ง',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "ตกลง"
                    });
                    console.error('เกิดข้อผิดพลาดระหว่างดาวน์โหลดรายงานการตรวจนับครุภัณฑ์', error);
                }
            }
        });
    };

    const handleDownloadExcel3 = async () => {
        Swal.fire({
            title: "ต้องการดาวน์โหลดรายงานการตรวจนับครุภัณฑ์หรือไม่?",
            text: "หากต้องการดาวน์โหลดรายงานการตรวจนับครุภัณฑ์เป็นไฟล์ Excel กรุณากดปุ่มดาวน์โหลด",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "ดาวน์โหลด",
            cancelButtonColor: "#d33",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.get(`${apiUrl}api/getReport`);
                    const csvData = response.data;

                    const fileName = 'รายงานการตรวจนับครุภัณฑ์ที่ชำรุด-เสื่อมสภาพ.xlsx';

                    const dataD = csvData.filter(row => row.dispense_flg === 'D');

                    const createSheetData = (data) => {
                        const headers = ['ลำดับ', 'รายการ', 'หมายเลขครุภัณฑ์', 'หน่วยงาน', 'ผู้รับผิดชอบ', 'เบอร์โทร', 'อาคาร', 'ชั้น', 'ห้อง', 'หมายเหตุ'];
                        return [
                            [`รายงานการตรวจนับครุภัณฑ์ที่ชำรุด-เสื่อมสภาพ กรมวิทยาศาสตร์บริการ (วศ.)`],
                            headers,
                            ...data.map((row, index) => [
                                index + 1,
                                row.inv_name,
                                row.inv_sn,
                                row.sub_division_name,
                                row.emp_name,
                                row.dss_phone,
                                row.building_name || '',  
                                row.floor_no || '',  
                                row.room_name || '', 
                                ''
                            ])
                        ];
                    };

                    const wsD = XLSX.utils.aoa_to_sheet(createSheetData(dataD));

                    const columnWidths = [
                        { wch: 5 }, 
                        { wch: 50 },  
                        { wch: 30 },  
                        { wch: 50 },  
                        { wch: 20 },  
                        { wch: 15 },  
                        { wch: 45 },  
                        { wch: 5 },  
                        { wch: 30 },  
                        { wch: 15 } 
                    ];
                    wsD['!cols'] = columnWidths;

                    const mergeCells = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 9 } }];
                    wsD['!merges'] = mergeCells;

                    const centerStyle = {
                        alignment: { horizontal: 'center', vertical: 'center' },
                        font: { bold: true },
                        border: {
                            top: { style: 'thin' },
                            bottom: { style: 'thin' },
                            left: { style: 'thin' },
                            right: { style: 'thin' }
                        }
                    };

                    const applyStylesToRows1And2 = (ws) => {
                        ws['A1'].s = centerStyle;
                        for (let C = 0; C <= 9; C++) {
                            const cellAddress = XLSX.utils.encode_cell({ r: 1, c: C });
                            if (!ws[cellAddress]) ws[cellAddress] = { t: 's', v: '' };
                            ws[cellAddress].s = centerStyle;
                        }
                    };

                    applyStylesToRows1And2(wsD);

                    const centerColA = (ws) => {
                        const range = XLSX.utils.decode_range(ws['!ref']);
                        for (let R = range.s.r; R <= range.e.r; R++) {
                            const cellAddress = XLSX.utils.encode_cell({ r: R, c: 0 });
                            if (!ws[cellAddress]) ws[cellAddress] = { t: 's', v: '' };
                            ws[cellAddress].s = { alignment: { horizontal: 'center', vertical: 'center' } };
                        }
                    };

                    centerColA(wsD);

                    const applyBorderToSheet = (ws) => {
                        const range = XLSX.utils.decode_range(ws['!ref']);
                        for (let R = range.s.r; R <= range.e.r; R++) {
                            for (let C = range.s.c; C <= range.e.c; C++) {
                                const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                                if (!ws[cellAddress]) ws[cellAddress] = { t: 's', v: '' };
                                ws[cellAddress].s = { border: { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } } };
                            }
                        }
                    };

                    applyBorderToSheet(wsD);

                    const setAutoFilter = (ws) => {
                        const range = XLSX.utils.decode_range(ws['!ref']);
                        ws['!autofilter'] = { ref: XLSX.utils.encode_range({ s: { r: 1, c: 0 }, e: { r: 1, c: range.e.c } }) };
                    };

                    setAutoFilter(wsD);

                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, wsD, 'ครุภัณฑ์ที่ชำรุด-เสื่อมสภาพ');
                    XLSX.writeFile(wb, fileName);

                    Swal.fire({
                        icon: 'success',
                        title: 'ดาวน์โหลดรายงานการตรวจนับครุภัณฑ์สำเร็จ!',
                        text: 'ดาวน์โหลดไฟล์ Excel เรียบร้อยแล้ว',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "ตกลง"
                    });
                } 
                catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาดขณะดาวน์โหลดรายงานการตรวจนับครุภัณฑ์!',
                        text: 'กรุณาลองใหม่อีกครั้ง',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "ตกลง"
                    });
                    console.error('เกิดข้อผิดพลาดระหว่างดาวน์โหลดรายงานการตรวจนับครุภัณฑ์', error);
                }
            }
        });
    };

    const handleDownloadExcel4 = async () => {
        Swal.fire({
            title: "ต้องการดาวน์โหลดรายงานการตรวจนับครุภัณฑ์หรือไม่?",
            text: "หากต้องการดาวน์โหลดรายงานการตรวจนับครุภัณฑ์เป็นไฟล์ Excel กรุณากดปุ่มดาวน์โหลด",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "ดาวน์โหลด",
            cancelButtonColor: "#d33",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.get(`${apiUrl}api/getReport`);
                    const csvData = response.data;

                    const fileName = 'รายงานการตรวจนับครุภัณฑ์ที่หมดความจำเป็นใช้งาน.xlsx';

                    const dataU = csvData.filter(row => row.dispense_flg === 'U');

                    const createSheetData = (data) => {
                        const headers = ['ลำดับ', 'รายการ', 'หมายเลขครุภัณฑ์', 'หน่วยงาน', 'ผู้รับผิดชอบ', 'เบอร์โทร', 'อาคาร', 'ชั้น', 'ห้อง', 'หมายเหตุ'];
                        return [
                            [`รายงานการตรวจนับครุภัณฑ์ที่หมดความจำเป็นใช้งาน กรมวิทยาศาสตร์บริการ (วศ.)`],
                            headers,
                            ...data.map((row, index) => [
                                index + 1,
                                row.inv_name,
                                row.inv_sn,
                                row.sub_division_name,
                                row.emp_name,
                                row.dss_phone,
                                row.building_name || '',  
                                row.floor_no || '',  
                                row.room_name || '', 
                                ''
                            ])
                        ];
                    };

                    const wsU = XLSX.utils.aoa_to_sheet(createSheetData(dataU));

                    const columnWidths = [
                        { wch: 5 }, 
                        { wch: 50 },  
                        { wch: 30 },  
                        { wch: 50 },  
                        { wch: 20 },  
                        { wch: 15 },  
                        { wch: 45 },  
                        { wch: 5 },  
                        { wch: 30 },  
                        { wch: 15 } 
                    ];
                    wsU['!cols'] = columnWidths;

                    const mergeCells = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 9 } }];
                    wsU['!merges'] = mergeCells;

                    const centerStyle = {
                        alignment: { horizontal: 'center', vertical: 'center' },
                        font: { bold: true },
                        border: {
                            top: { style: 'thin' },
                            bottom: { style: 'thin' },
                            left: { style: 'thin' },
                            right: { style: 'thin' }
                        }
                    };

                    const applyStylesToRows1And2 = (ws) => {
                        ws['A1'].s = centerStyle;
                        for (let C = 0; C <= 9; C++) {
                            const cellAddress = XLSX.utils.encode_cell({ r: 1, c: C });
                            if (!ws[cellAddress]) ws[cellAddress] = { t: 's', v: '' };
                            ws[cellAddress].s = centerStyle;
                        }
                    };

                    applyStylesToRows1And2(wsU);

                    const centerColA = (ws) => {
                        const range = XLSX.utils.decode_range(ws['!ref']);
                        for (let R = range.s.r; R <= range.e.r; R++) {
                            const cellAddress = XLSX.utils.encode_cell({ r: R, c: 0 });
                            if (!ws[cellAddress]) ws[cellAddress] = { t: 's', v: '' };
                            ws[cellAddress].s = { alignment: { horizontal: 'center', vertical: 'center' } };
                        }
                    };

                    centerColA(wsU);

                    const applyBorderToSheet = (ws) => {
                        const range = XLSX.utils.decode_range(ws['!ref']);
                        for (let R = range.s.r; R <= range.e.r; R++) {
                            for (let C = range.s.c; C <= range.e.c; C++) {
                                const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                                if (!ws[cellAddress]) ws[cellAddress] = { t: 's', v: '' };
                                ws[cellAddress].s = { border: { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } } };
                            }
                        }
                    };

                    applyBorderToSheet(wsU);

                    const setAutoFilter = (ws) => {
                        const range = XLSX.utils.decode_range(ws['!ref']);
                        ws['!autofilter'] = { ref: XLSX.utils.encode_range({ s: { r: 1, c: 0 }, e: { r: 1, c: range.e.c } }) };
                    };

                    setAutoFilter(wsU);

                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, wsU, 'ครุภัณฑ์ที่หมดความจำเป็นใช้งาน');
                    XLSX.writeFile(wb, fileName);

                    Swal.fire({
                        icon: 'success',
                        title: 'ดาวน์โหลดรายงานการตรวจนับครุภัณฑ์สำเร็จ!',
                        text: 'ดาวน์โหลดไฟล์ Excel เรียบร้อยแล้ว',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "ตกลง"
                    });
                } 
                catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาดขณะดาวน์โหลดรายงานการตรวจนับครุภัณฑ์!',
                        text: 'กรุณาลองใหม่อีกครั้ง',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "ตกลง"
                    });
                    console.error('เกิดข้อผิดพลาดระหว่างดาวน์โหลดรายงานการตรวจนับครุภัณฑ์', error);
                }
            }
        });
    };

    const handleShowDownloadModal = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}api/getReport`);
            if (response.data && response.data.length > 0) {
                setCsvData(response.data); 
                setDataN(response.data.filter(row => row.dispense_flg === 'N' || row.dispense_flg === 'F'));
                setDataD(response.data.filter(row => row.dispense_flg === 'D'));
                setDataU(response.data.filter(row => row.dispense_flg === 'U'));
                setShowDownloadModal(true);
            } else {
                console.log('เกิดข้อผิดพลาดระหว่างดึงข้อมูลจาก API');
            }
        } 
        catch (error) {
            console.error('เกิดข้อผิดพลาดระหว่างดึงข้อมูลจาก API', error);
        }
    };

    let currentDate = new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    let currentDateReport = new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    const handleDownloadPDF1 = async () => { 
        const result = await Swal.fire({
            title: 'ต้องการดาวน์โหลดรายงานการตรวจนับครุภัณฑ์หรือไม่?',
            text: "หากต้องการดาวน์โหลดรายงานการตรวจนับครุภัณฑ์เป็นไฟล์ PDF กรุณากดปุ่มดาวน์โหลด",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "ดาวน์โหลด",
            cancelButtonColor: "#d33",
            cancelButtonText: "ยกเลิก",
        });
        if (result.isConfirmed) {
            try {
                const response = await axios.get(`${apiUrl}api/getReport`);
                const csvData = response.data;

                const dataN = csvData.filter(row => row.dispense_flg === 'N' || row.dispense_flg === 'F');
                const dataD = csvData.filter(row => row.dispense_flg === 'D');
                const dataU = csvData.filter(row => row.dispense_flg === 'U');

                const htmlString = `
                    <div id="pdf-content">
                        <h5 style="text-align: center; margin-bottom: 18px;">
                            <img src=${logoImage} alt="Logo" style="width: 60px; height: 60px;" />
                        </h5>
                        <h5 style="font-size: 14px; text-align: center;">รายงานการตรวจนับครุภัณฑ์</h5>
                        <h5 style="font-size: 14px; text-align: center;">กรมวิทยาศาสตร์บริการ (วศ.)</h5>
                        <h5 style="font-size: 14px; text-align: center;">วันที่ ${currentDate}</h5>
                        <style>
                            body {
                                font-family: "Noto Sans Thai", sans-serif;
                                font-optical-sizing: auto;
                                font-size: 10px; 
                            }
                            table {
                                width: 100%;
                                border-collapse: collapse; 
                            }
                            th, td {
                                border: 1px solid #ddd; 
                                padding: 5px; 
                                text-align: left; 
                            }
                            th {
                                background-color: #f2f2f2; 
                            }
                            tr:nth-child(even) {
                                background-color: #f9f9f9; 
                            }
                            tr {
                                page-break-inside: avoid;
                                page-break-after: auto;
                            }
                            .page-break {
                                page-break-before: always;
                            }
                        </style>
                        <table>
                            <h5 style="font-size: 12px; margin-top: 14px;">รายการครุภัณฑ์ที่มีการใช้งานอยู่</h5>
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>รายการ</th>
                                    <th>หมายเลขครุภัณฑ์</th>
                                    <th>หน่วยงาน</th>
                                    <th>ผู้รับผิดชอบ</th>
                                    <th>เบอร์โทร</th>
                                    <th>อาคาร</th>
                                    <th>ชั้น</th>
                                    <th>ห้อง</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${dataN.map((row, index) => `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${row.inv_name}</td>
                                        <td>${row.inv_sn}</td>
                                        <td>${row.sub_division_name}</td>
                                        <td>${row.emp_name}</td>
                                        <td>${row.dss_phone}</td>
                                        <td>${row.building_name || ''}</td>
                                        <td>${row.floor_no || ''}</td>
                                        <td>${row.room_name || ''}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <div class="page-break"></div>
                        <table>
                            <h5 style="font-size: 12px; margin-top: 14px;">รายการครุภัณฑ์ที่ชำรุด/เสื่อมสภาพ</h5>
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>รายการ</th>
                                    <th>หมายเลขครุภัณฑ์</th>
                                    <th>หน่วยงาน</th>
                                    <th>ผู้รับผิดชอบ</th>
                                    <th>เบอร์โทร</th>
                                    <th>อาคาร</th>
                                    <th>ชั้น</th>
                                    <th>ห้อง</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${dataD.map((row, index) => `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${row.inv_name}</td>
                                        <td>${row.inv_sn}</td>
                                        <td>${row.sub_division_name}</td>
                                        <td>${row.emp_name}</td>
                                        <td>${row.dss_phone}</td>
                                        <td>${row.building_name || ''}</td>
                                        <td>${row.floor_no || ''}</td>
                                        <td>${row.room_name || ''}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <div class="page-break"></div>
                        <table>
                            <h5 style="font-size: 12px; margin-top: 14px;">รายการครุภัณฑ์ที่หมดความจำเป็นใช้งาน</h5>
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>รายการ</th>
                                    <th>หมายเลขครุภัณฑ์</th>
                                    <th>หน่วยงาน</th>
                                    <th>ผู้รับผิดชอบ</th>
                                    <th>เบอร์โทร</th>
                                    <th>อาคาร</th>
                                    <th>ชั้น</th>
                                    <th>ห้อง</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${dataU.map((row, index) => `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${row.inv_name}</td>
                                        <td>${row.inv_sn}</td>
                                        <td>${row.sub_division_name}</td>
                                        <td>${row.emp_name}</td>
                                        <td>${row.dss_phone}</td>
                                        <td>${row.building_name || ''}</td>
                                        <td>${row.floor_no || ''}</td>
                                        <td>${row.room_name || ''}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <div style="margin-top: 16px; text-align: right;">
                            รายงานล่าสุดเมื่อ ${currentDateReport} น.
                        </div>
                    </div>
                `;

                const pdfContainer = document.createElement('div');
                pdfContainer.innerHTML = htmlString;
                document.body.appendChild(pdfContainer);

                const pdfOptions = {
                    margin: 0.5,
                    filename: `รายงานการตรวจนับครุภัณฑ์.pdf`,
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                };

                await html2pdf().from(pdfContainer).set(pdfOptions).save();

                Swal.fire({
                    icon: 'success',
                    title: 'ดาวน์โหลดรายงานการตรวจนับครุภัณฑ์สำเร็จ!',
                    text: 'ดาวน์โหลดไฟล์ PDF เรียบร้อยแล้ว',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "ตกลง"
                });
                document.body.removeChild(pdfContainer);
            } 
            catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาดขณะดาวน์โหลดรายงานการตรวจนับครุภัณฑ์!',
                    text: 'กรุณาลองใหม่อีกครั้ง',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "ตกลง"
                });
                console.error('เกิดข้อผิดพลาดระหว่างดาวน์โหลด PDF', error);
            }
        }
    };

    const handleDownloadPDF2 = async () => { 
        const result = await Swal.fire({
            title: 'ต้องการดาวน์โหลดรายงานการตรวจนับครุภัณฑ์หรือไม่?',
            text: "หากต้องการดาวน์โหลดรายงานการตรวจนับครุภัณฑ์เป็นไฟล์ PDF กรุณากดปุ่มดาวน์โหลด",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "ดาวน์โหลด",
            cancelButtonColor: "#d33",
            cancelButtonText: "ยกเลิก",
        });
        if (result.isConfirmed) {
            try {
                const response = await axios.get(`${apiUrl}api/getReport`);
                const csvData = response.data;

                const dataN = csvData.filter(row => row.dispense_flg === 'N' || row.dispense_flg === 'F');

                const htmlString = `
                    <div id="pdf-content">
                        <h5 style="text-align: center; margin-bottom: 18px;">
                            <img src=${logoImage} alt="Logo" style="width: 60px; height: 60px;" />
                        </h5>
                        <h5 style="font-size: 14px; text-align: center;">รายงานการตรวจนับครุภัณฑ์ที่มีการใช้งานอยู่</h5>
                        <h5 style="font-size: 14px; text-align: center;">กรมวิทยาศาสตร์บริการ (วศ.)</h5>
                        <h5 style="font-size: 14px; text-align: center;">วันที่ ${currentDate}</h5>
                        <style>
                            body {
                                font-family: "Noto Sans Thai", sans-serif;
                                font-optical-sizing: auto;
                                font-size: 10px; 
                            }
                            table {
                                width: 100%;
                                border-collapse: collapse; 
                            }
                            th, td {
                                border: 1px solid #ddd; 
                                padding: 5px; 
                                text-align: left; 
                            }
                            th {
                                background-color: #f2f2f2; 
                            }
                            tr:nth-child(even) {
                                background-color: #f9f9f9; 
                            }
                            tr {
                                page-break-inside: avoid;
                                page-break-after: auto;
                            }
                            .page-break {
                                page-break-before: always;
                            }
                        </style>
                        <table>
                            <h5 style="font-size: 12px; margin-top: 14px;">รายการครุภัณฑ์ที่มีการใช้งานอยู่</h5>
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>รายการ</th>
                                    <th>หมายเลขครุภัณฑ์</th>
                                    <th>หน่วยงาน</th>
                                    <th>ผู้รับผิดชอบ</th>
                                    <th>เบอร์โทร</th>
                                    <th>อาคาร</th>
                                    <th>ชั้น</th>
                                    <th>ห้อง</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${dataN.map((row, index) => `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${row.inv_name}</td>
                                        <td>${row.inv_sn}</td>
                                        <td>${row.sub_division_name}</td>
                                        <td>${row.emp_name}</td>
                                        <td>${row.dss_phone}</td>
                                        <td>${row.building_name || ''}</td>
                                        <td>${row.floor_no || ''}</td>
                                        <td>${row.room_name || ''}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <div style="margin-top: 16px; text-align: right;">
                            รายงานล่าสุดเมื่อ ${currentDateReport} น.
                        </div>
                    </div>
                `;

                const pdfContainer = document.createElement('div');
                pdfContainer.innerHTML = htmlString;
                document.body.appendChild(pdfContainer);

                const pdfOptions = {
                    margin: 0.5,
                    filename: `รายงานการตรวจนับครุภัณฑ์ที่มีการใช้งานอยู่.pdf`,
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                };

                await html2pdf().from(pdfContainer).set(pdfOptions).save();

                Swal.fire({
                    icon: 'success',
                    title: 'ดาวน์โหลดรายงานการตรวจนับครุภัณฑ์สำเร็จ!',
                    text: 'ดาวน์โหลดไฟล์ PDF เรียบร้อยแล้ว',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "ตกลง"
                });
                document.body.removeChild(pdfContainer);
            } 
            catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาดขณะดาวน์โหลดรายงานการตรวจนับครุภัณฑ์!',
                    text: 'กรุณาลองใหม่อีกครั้ง',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "ตกลง"
                });
                console.error('เกิดข้อผิดพลาดระหว่างดาวน์โหลด PDF', error);
            }
        }
    };

    const handleDownloadPDF3 = async () => { 
        const result = await Swal.fire({
            title: 'ต้องการดาวน์โหลดรายงานการตรวจนับครุภัณฑ์หรือไม่?',
            text: "หากต้องการดาวน์โหลดรายงานการตรวจนับครุภัณฑ์เป็นไฟล์ PDF กรุณากดปุ่มดาวน์โหลด",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "ดาวน์โหลด",
            cancelButtonColor: "#d33",
            cancelButtonText: "ยกเลิก",
        });
        if (result.isConfirmed) {
            try {
                const response = await axios.get(`${apiUrl}api/getReport`);
                const csvData = response.data;

                const dataD = csvData.filter(row => row.dispense_flg === 'D');

                const htmlString = `
                    <div id="pdf-content">
                        <h5 style="text-align: center; margin-bottom: 18px;">
                            <img src=${logoImage} alt="Logo" style="width: 60px; height: 60px;" />
                        </h5>
                        <h5 style="font-size: 14px; text-align: center;">รายงานการตรวจนับครุภัณฑ์ที่ชำรุด/เสื่อมสภาพ</h5>
                        <h5 style="font-size: 14px; text-align: center;">กรมวิทยาศาสตร์บริการ (วศ.)</h5>
                        <h5 style="font-size: 14px; text-align: center;">วันที่ ${currentDate}</h5>
                        <style>
                            body {
                                font-family: "Noto Sans Thai", sans-serif;
                                font-optical-sizing: auto;
                                font-size: 10px; 
                            }
                            table {
                                width: 100%;
                                border-collapse: collapse; 
                            }
                            th, td {
                                border: 1px solid #ddd; 
                                padding: 5px; 
                                text-align: left; 
                            }
                            th {
                                background-color: #f2f2f2; 
                            }
                            tr:nth-child(even) {
                                background-color: #f9f9f9; 
                            }
                            tr {
                                page-break-inside: avoid;
                                page-break-after: auto;
                            }
                            .page-break {
                                page-break-before: always;
                            }
                        </style>
                        <table>
                            <h5 style="font-size: 12px; margin-top: 14px;">รายการครุภัณฑ์ที่ชำรุด/เสื่อมสภาพ</h5>
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>รายการ</th>
                                    <th>หมายเลขครุภัณฑ์</th>
                                    <th>หน่วยงาน</th>
                                    <th>ผู้รับผิดชอบ</th>
                                    <th>เบอร์โทร</th>
                                    <th>อาคาร</th>
                                    <th>ชั้น</th>
                                    <th>ห้อง</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${dataD.map((row, index) => `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${row.inv_name}</td>
                                        <td>${row.inv_sn}</td>
                                        <td>${row.sub_division_name}</td>
                                        <td>${row.emp_name}</td>
                                        <td>${row.dss_phone}</td>
                                        <td>${row.building_name || ''}</td>
                                        <td>${row.floor_no || ''}</td>
                                        <td>${row.room_name || ''}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <div style="margin-top: 16px; text-align: right;">
                            รายงานล่าสุดเมื่อ ${currentDateReport} น.
                        </div>
                    </div>
                `;

                const pdfContainer = document.createElement('div');
                pdfContainer.innerHTML = htmlString;
                document.body.appendChild(pdfContainer);

                const pdfOptions = {
                    margin: 0.5,
                    filename: `รายงานการตรวจนับครุภัณฑ์ที่ชำรุด/เสื่อมสภาพ.pdf`,
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                };

                await html2pdf().from(pdfContainer).set(pdfOptions).save();

                Swal.fire({
                    icon: 'success',
                    title: 'ดาวน์โหลดรายงานการตรวจนับครุภัณฑ์สำเร็จ!',
                    text: 'ดาวน์โหลดไฟล์ PDF เรียบร้อยแล้ว',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "ตกลง"
                });
                document.body.removeChild(pdfContainer);
            } 
            catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาดขณะดาวน์โหลดรายงานการตรวจนับครุภัณฑ์!',
                    text: 'กรุณาลองใหม่อีกครั้ง',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "ตกลง"
                });
                console.error('เกิดข้อผิดพลาดระหว่างดาวน์โหลด PDF', error);
            }
        }
    };

    const handleDownloadPDF4 = async () => { 
        const result = await Swal.fire({
            title: 'ต้องการดาวน์โหลดรายงานการตรวจนับครุภัณฑ์หรือไม่?',
            text: "หากต้องการดาวน์โหลดรายงานการตรวจนับครุภัณฑ์เป็นไฟล์ PDF กรุณากดปุ่มดาวน์โหลด",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "ดาวน์โหลด",
            cancelButtonColor: "#d33",
            cancelButtonText: "ยกเลิก",
        });
        if (result.isConfirmed) {
            try {
                const response = await axios.get(`${apiUrl}api/getReport`);
                const csvData = response.data;

                const dataU = csvData.filter(row => row.dispense_flg === 'U');

                const htmlString = `
                    <div id="pdf-content">
                        <h5 style="text-align: center; margin-bottom: 18px;">
                            <img src=${logoImage} alt="Logo" style="width: 60px; height: 60px;" />
                        </h5>
                        <h5 style="font-size: 14px; text-align: center;">รายงานการตรวจนับครุภัณฑ์ที่หมดความจำเป็นใช้งาน</h5>
                        <h5 style="font-size: 14px; text-align: center;">กรมวิทยาศาสตร์บริการ (วศ.)</h5>
                        <h5 style="font-size: 14px; text-align: center;">วันที่ ${currentDate}</h5>
                        <style>
                            body {
                                font-family: "Noto Sans Thai", sans-serif;
                                font-optical-sizing: auto;
                                font-size: 10px; 
                            }
                            table {
                                width: 100%;
                                border-collapse: collapse; 
                            }
                            th, td {
                                border: 1px solid #ddd; 
                                padding: 5px; 
                                text-align: left; 
                            }
                            th {
                                background-color: #f2f2f2; 
                            }
                            tr:nth-child(even) {
                                background-color: #f9f9f9; 
                            }
                            tr {
                                page-break-inside: avoid;
                                page-break-after: auto;
                            }
                            .page-break {
                                page-break-before: always;
                            }
                        </style>
                        <table>
                            <h5 style="font-size: 12px; margin-top: 14px;">รายการครุภัณฑ์ที่ชำรุด/เสื่อมสภาพ</h5>
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>รายการ</th>
                                    <th>หมายเลขครุภัณฑ์</th>
                                    <th>หน่วยงาน</th>
                                    <th>ผู้รับผิดชอบ</th>
                                    <th>เบอร์โทร</th>
                                    <th>อาคาร</th>
                                    <th>ชั้น</th>
                                    <th>ห้อง</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${dataU.map((row, index) => `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${row.inv_name}</td>
                                        <td>${row.inv_sn}</td>
                                        <td>${row.sub_division_name}</td>
                                        <td>${row.emp_name}</td>
                                        <td>${row.dss_phone}</td>
                                        <td>${row.building_name || ''}</td>
                                        <td>${row.floor_no || ''}</td>
                                        <td>${row.room_name || ''}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <div style="margin-top: 16px; text-align: right;">
                            รายงานล่าสุดเมื่อ ${currentDateReport} น.
                        </div>
                    </div>
                `;

                const pdfContainer = document.createElement('div');
                pdfContainer.innerHTML = htmlString;
                document.body.appendChild(pdfContainer);

                const pdfOptions = {
                    margin: 0.5,
                    filename: `รายงานการตรวจนับครุภัณฑ์ที่หมดความจำเป็นใช้งาน.pdf`,
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                };

                await html2pdf().from(pdfContainer).set(pdfOptions).save();

                Swal.fire({
                    icon: 'success',
                    title: 'ดาวน์โหลดรายงานการตรวจนับครุภัณฑ์สำเร็จ!',
                    text: 'ดาวน์โหลดไฟล์ PDF เรียบร้อยแล้ว',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "ตกลง"
                });
                document.body.removeChild(pdfContainer);
            } 
            catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาดขณะดาวน์โหลดรายงานการตรวจนับครุภัณฑ์!',
                    text: 'กรุณาลองใหม่อีกครั้ง',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "ตกลง"
                });
                console.error('เกิดข้อผิดพลาดระหว่างดาวน์โหลด PDF', error);
            }
        }
    };

    const handleHTML1 = async () => {
        try {
            const response = await axios.get(`${apiUrl}api/getReport`);
            const csvData = response.data;

            const dataN = csvData.filter(row => row.dispense_flg === 'N' || row.dispense_flg === 'F');
            const dataD = csvData.filter(row => row.dispense_flg === 'D');
            const dataU = csvData.filter(row => row.dispense_flg === 'U');

            let htmlString = `
                <div id="pdf-content">
                    <h5 style="text-align: center; margin-bottom: 18px;">
                        <img src=${logoImage} alt="Logo" style="width: 60px; height: 60px;" />
                    </h5>
                    <h5 style="font-size: 14px; text-align: center;">รายงานการตรวจนับครุภัณฑ์</h5>
                    <h5 style="font-size: 14px; text-align: center;">กรมวิทยาศาสตร์บริการ (วศ.)</h5>
                    <h5 style="font-size: 14px; text-align: center;">วันที่ ${currentDate}</h5>
                    <style>
                        body {
                            font-family: "Noto Sans Thai", sans-serif;
                            font-optical-sizing: auto;
                            font-size: 10px; 
                        }
                        h5 {
                            margin: 8px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse; 
                        }
                        th, td {
                            border: 1px solid #ddd; 
                            padding: 5px; 
                            text-align: left; 
                        }
                        th {
                            background-color: #f2f2f2; 
                        }
                        tr:nth-child(even) {
                            background-color: #f9f9f9; 
                        }
                        tr {
                            page-break-inside: avoid;
                            page-break-after: auto;
                        }
                        .page-break {
                            page-break-before: always;
                        }
                    </style>
                    <table>
                        <h5 style="font-size: 12px; margin-top: 14px;">รายการครุภัณฑ์ที่มีการใช้งานอยู่</h5>
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>รายการ</th>
                                <th>หมายเลขครุภัณฑ์</th>
                                <th>หน่วยงาน</th>
                                <th>ผู้รับผิดชอบ</th>
                                <th>เบอร์โทร</th>
                                <th>อาคาร</th>
                                <th>ชั้น</th>
                                <th>ห้อง</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${dataN.map((row, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${row.inv_name}</td>
                                    <td>${row.inv_sn}</td>
                                    <td>${row.sub_division_name}</td>
                                    <td>${row.emp_name}</td>
                                    <td>${row.dss_phone}</td>
                                    <td>${row.building_name || ''}</td>
                                    <td>${row.floor_no || ''}</td>
                                    <td>${row.room_name || ''}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="page-break"></div>
                    <table>
                        <h5 style="font-size: 12px; margin-top: 14px;">รายการครุภัณฑ์ที่ชำรุด/เสื่อมสภาพ</h5>
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>รายการ</th>
                                <th>หมายเลขครุภัณฑ์</th>
                                <th>หน่วยงาน</th>
                                <th>ผู้รับผิดชอบ</th>
                                <th>เบอร์โทร</th>
                                <th>อาคาร</th>
                                <th>ชั้น</th>
                                <th>ห้อง</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${dataD.map((row, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${row.inv_name}</td>
                                    <td>${row.inv_sn}</td>
                                    <td>${row.sub_division_name}</td>
                                    <td>${row.emp_name}</td>
                                    <td>${row.dss_phone}</td>
                                    <td>${row.building_name || ''}</td>
                                    <td>${row.floor_no || ''}</td>
                                    <td>${row.room_name || ''}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="page-break"></div>
                    <table>
                        <h5 style="font-size: 12px; margin-top: 14px;">รายการครุภัณฑ์ที่หมดความจำเป็นใช้งาน</h5>
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>รายการ</th>
                                <th>หมายเลขครุภัณฑ์</th>
                                <th>หน่วยงาน</th>
                                <th>ผู้รับผิดชอบ</th>
                                <th>เบอร์โทร</th>
                                <th>อาคาร</th>
                                <th>ชั้น</th>
                                <th>ห้อง</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${dataU.map((row, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${row.inv_name}</td>
                                    <td>${row.inv_sn}</td>
                                    <td>${row.sub_division_name}</td>
                                    <td>${row.emp_name}</td>
                                    <td>${row.dss_phone}</td>
                                    <td>${row.building_name || ''}</td>
                                    <td>${row.floor_no || ''}</td>
                                    <td>${row.room_name || ''}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div style="margin-top: 16px; text-align: right;">
                        รายงานล่าสุดเมื่อ ${currentDateReport} น.
                    </div>
                </div>
            `;
            const newWindow = window.open();
            newWindow.document.write(htmlString);
            newWindow.document.close();
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาดขณะแสดงข้อมูลรายงานการตรวจนับครุภัณฑ์!',
                text: 'กรุณาลองใหม่อีกครั้ง',
                confirmButtonColor: '#3085d6',
                confirmButtonText: "ตกลง"
            });
            console.error('เกิดข้อผิดพลาดระหว่างดึงข้อมูลจาก API', error);
        }
    }

    const handleHTML2 = async () => {
        try {
            const response = await axios.get(`${apiUrl}api/getReport`);
            const csvData = response.data;

            const dataN = csvData.filter(row => row.dispense_flg === 'N' || row.dispense_flg === 'F');

            let htmlString = `
                <div id="pdf-content">
                    <h5 style="text-align: center; margin-bottom: 18px;">
                        <img src=${logoImage} alt="Logo" style="width: 60px; height: 60px;" />
                    </h5>
                    <h5 style="font-size: 14px; text-align: center;">รายงานการตรวจนับครุภัณฑ์ที่มีการใช้งานอยู่</h5>
                    <h5 style="font-size: 14px; text-align: center;">กรมวิทยาศาสตร์บริการ (วศ.)</h5>
                    <h5 style="font-size: 14px; text-align: center;">วันที่ ${currentDate}</h5>
                    <style>
                        body {
                            font-family: "Noto Sans Thai", sans-serif;
                            font-optical-sizing: auto;
                            font-size: 10px; 
                        }
                        h5 {
                            margin: 8px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse; 
                        }
                        th, td {
                            border: 1px solid #ddd; 
                            padding: 5px; 
                            text-align: left; 
                        }
                        th {
                            background-color: #f2f2f2; 
                        }
                        tr:nth-child(even) {
                            background-color: #f9f9f9; 
                        }
                        tr {
                            page-break-inside: avoid;
                            page-break-after: auto;
                        }
                        .page-break {
                            page-break-before: always;
                        }
                    </style>
                    <table>
                        <h5 style="font-size: 12px; margin-top: 14px;">รายการครุภัณฑ์ที่มีการใช้งานอยู่</h5>
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>รายการ</th>
                                <th>หมายเลขครุภัณฑ์</th>
                                <th>หน่วยงาน</th>
                                <th>ผู้รับผิดชอบ</th>
                                <th>เบอร์โทร</th>
                                <th>อาคาร</th>
                                <th>ชั้น</th>
                                <th>ห้อง</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${dataN.map((row, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${row.inv_name}</td>
                                    <td>${row.inv_sn}</td>
                                    <td>${row.sub_division_name}</td>
                                    <td>${row.emp_name}</td>
                                    <td>${row.dss_phone}</td>
                                    <td>${row.building_name || ''}</td>
                                    <td>${row.floor_no || ''}</td>
                                    <td>${row.room_name || ''}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div style="margin-top: 16px; text-align: right;">
                        รายงานล่าสุดเมื่อ ${currentDateReport} น.
                    </div>
                </div>
            `;
            const newWindow = window.open();
            newWindow.document.write(htmlString);
            newWindow.document.close();
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาดขณะแสดงข้อมูลรายงานการตรวจนับครุภัณฑ์!',
                text: 'กรุณาลองใหม่อีกครั้ง',
                confirmButtonColor: '#3085d6',
                confirmButtonText: "ตกลง"
            });
            console.error('เกิดข้อผิดพลาดระหว่างดึงข้อมูลจาก API', error);
        }
    }

    const handleHTML3 = async () => {
        try {
            const response = await axios.get(`${apiUrl}api/getReport`);
            const csvData = response.data;

            const dataD = csvData.filter(row => row.dispense_flg === 'D');

            let htmlString = `
                <div id="pdf-content">
                    <h5 style="text-align: center; margin-bottom: 18px;">
                        <img src=${logoImage} alt="Logo" style="width: 60px; height: 60px;" />
                    </h5>
                    <h5 style="font-size: 14px; text-align: center;">รายงานการตรวจนับครุภัณฑ์ที่ชำรุด/เสื่อมสภาพ</h5>
                    <h5 style="font-size: 14px; text-align: center;">กรมวิทยาศาสตร์บริการ (วศ.)</h5>
                    <h5 style="font-size: 14px; text-align: center;">วันที่ ${currentDate}</h5>
                    <style>
                        body {
                            font-family: "Noto Sans Thai", sans-serif;
                            font-optical-sizing: auto;
                            font-size: 10px; 
                        }
                        h5 {
                            margin: 8px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse; 
                        }
                        th, td {
                            border: 1px solid #ddd; 
                            padding: 5px; 
                            text-align: left; 
                        }
                        th {
                            background-color: #f2f2f2; 
                        }
                        tr:nth-child(even) {
                            background-color: #f9f9f9; 
                        }
                        tr {
                            page-break-inside: avoid;
                            page-break-after: auto;
                        }
                        .page-break {
                            page-break-before: always;
                        }
                    </style>
                    <table>
                        <h5 style="font-size: 12px; margin-top: 14px;">รายการครุภัณฑ์ที่ชำรุด/เสื่อมสภาพ</h5>
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>รายการ</th>
                                <th>หมายเลขครุภัณฑ์</th>
                                <th>หน่วยงาน</th>
                                <th>ผู้รับผิดชอบ</th>
                                <th>เบอร์โทร</th>
                                <th>อาคาร</th>
                                <th>ชั้น</th>
                                <th>ห้อง</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${dataD.map((row, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${row.inv_name}</td>
                                    <td>${row.inv_sn}</td>
                                    <td>${row.sub_division_name}</td>
                                    <td>${row.emp_name}</td>
                                    <td>${row.dss_phone}</td>
                                    <td>${row.building_name || ''}</td>
                                    <td>${row.floor_no || ''}</td>
                                    <td>${row.room_name || ''}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div style="margin-top: 16px; text-align: right;">
                        รายงานล่าสุดเมื่อ ${currentDateReport} น.
                    </div>
                </div>
            `;
            const newWindow = window.open();
            newWindow.document.write(htmlString);
            newWindow.document.close();
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาดขณะแสดงข้อมูลรายงานการตรวจนับครุภัณฑ์!',
                text: 'กรุณาลองใหม่อีกครั้ง',
                confirmButtonColor: '#3085d6',
                confirmButtonText: "ตกลง"
            });
            console.error('เกิดข้อผิดพลาดระหว่างดึงข้อมูลจาก API', error);
        }
    }

    const handleHTML4 = async () => {
        try {
            const response = await axios.get(`${apiUrl}api/getReport`);
            const csvData = response.data;

            const dataU = csvData.filter(row => row.dispense_flg === 'U');

            let htmlString = `
                <div id="pdf-content">
                    <h5 style="text-align: center; margin-bottom: 18px;">
                        <img src=${logoImage} alt="Logo" style="width: 60px; height: 60px;" />
                    </h5>
                    <h5 style="font-size: 14px; text-align: center;">รายงานการตรวจนับครุภัณฑ์ที่หมดความจำเป็นใช้งาน</h5>
                    <h5 style="font-size: 14px; text-align: center;">กรมวิทยาศาสตร์บริการ (วศ.)</h5>
                    <h5 style="font-size: 14px; text-align: center;">วันที่ ${currentDate}</h5>
                    <style>
                        body {
                            font-family: "Noto Sans Thai", sans-serif;
                            font-optical-sizing: auto;
                            font-size: 10px; 
                        }
                        h5 {
                            margin: 8px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse; 
                        }
                        th, td {
                            border: 1px solid #ddd; 
                            padding: 5px; 
                            text-align: left; 
                        }
                        th {
                            background-color: #f2f2f2; 
                        }
                        tr:nth-child(even) {
                            background-color: #f9f9f9; 
                        }
                        tr {
                            page-break-inside: avoid;
                            page-break-after: auto;
                        }
                        .page-break {
                            page-break-before: always;
                        }
                    </style>
                    <table>
                        <h5 style="font-size: 12px; margin-top: 14px;">รายการครุภัณฑ์ที่ชำรุด/เสื่อมสภาพ</h5>
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>รายการ</th>
                                <th>หมายเลขครุภัณฑ์</th>
                                <th>หน่วยงาน</th>
                                <th>ผู้รับผิดชอบ</th>
                                <th>เบอร์โทร</th>
                                <th>อาคาร</th>
                                <th>ชั้น</th>
                                <th>ห้อง</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${dataU.map((row, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${row.inv_name}</td>
                                    <td>${row.inv_sn}</td>
                                    <td>${row.sub_division_name}</td>
                                    <td>${row.emp_name}</td>
                                    <td>${row.dss_phone}</td>
                                    <td>${row.building_name || ''}</td>
                                    <td>${row.floor_no || ''}</td>
                                    <td>${row.room_name || ''}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div style="margin-top: 16px; text-align: right;">
                        รายงานล่าสุดเมื่อ ${currentDateReport} น.
                    </div>
                </div>
            `;
            const newWindow = window.open();
            newWindow.document.write(htmlString);
            newWindow.document.close();
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาดขณะแสดงข้อมูลรายงานการตรวจนับครุภัณฑ์!',
                text: 'กรุณาลองใหม่อีกครั้ง',
                confirmButtonColor: '#3085d6',
                confirmButtonText: "ตกลง"
            });
            console.error('เกิดข้อผิดพลาดระหว่างดึงข้อมูลจาก API', error);
        }
    }

    const toggleDownloadModal = async () => {
        setLoading(true);
        if (showDownloadModal) {
            setShowDownloadModal(false);
        } 
        else {
            const data = await handleShowDownloadModal(); 
            if (data) {
                setTableData(data); 
                setShowDownloadModal(true);
                setLoading(false); 
            }
        }
    };

    const handlePDFToggle = (isOpen) => {
        setIsPDFOpen(isOpen);
    };

    const handleHTMLToggle = (isOpen) => {
        setIsHTMLOpen(isOpen);
    };

    const handleExcelToggle = (isOpen) => {
        setIsExcelOpen(isOpen);
    };

    const handleInventoryCheckListClick = (checkLists, title) => {
        setCurrentInventoryCheckList(checkLists);
        console.log(currentInventoryCheckList);
        setInventoryCheckListModalTitle(title);
        setShowInventoryCheckListModal(true);
    };

    const handleCancel = () => {
        setShowDownloadModal(false);
    };

    const handleRefresh = () => {
        navigate('/inventories/check/list');
        window.location.reload();
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchParams({ 
            page: 1, 
            search: query,
            startYear: currentStartYear,
            endYear: currentEndYear, 
            status: currentStatus.join(','),
            org: currentOrgs.join(',') 
        });
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
        const { status, org, startYear, endYear } = advancedParams;
        setSelectedOrgs(org || null);
        setSelectedStatus(status || []);
        setSearchParams({
            page: 1,
            search: searchQuery,
            startYear: startYear || '',
            endYear: endYear || '',
            status: status.join(','),
            org: org.join(',')
        });
        await fetchCheckLists();
        setLoading(false);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setSearchParams({
                page: pageNumber,
                search: currentSearchQuery,
                startYear: currentStartYear,
                endYear: currentEndYear,
                status: currentStatus.join(','),
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
                                                <BsCardChecklist size={30} className="m-3" />
                                                {'ประวัติการตรวจนับครุภัณฑ์'}
                                            </h2>
                                        </Col>
                                        <Col md={6} className="d-flex justify-content-end align-items-center mt-0">
                                            <Searchbox className="search-box" placeholder="ค้นหาชื่อครุภัณฑ์ / สถานที่ตั้ง" value={currentSearchQuery} onChange={handleSearchChange} />
                                            <BlueOutlineButton className='refresh-btn' title="รีเฟรชข้อมูล" onClick={() => handleRefresh()} disabled={loading}>
                                                {loading ? <FaSpinner size={16} className="m-1 spin" /> : <IoMdRefresh className="refresh-btn-icon" size={16} />}
                                                {loading ? <span className="responsive-text-hidden">กำลังโหลด...</span> : <span className="responsive-text-hidden">รีเฟรช</span>}
                                            </BlueOutlineButton>
                                            <DarkOutlineButton className='advanced-search-btn' title="ค้นหาข้อมูลขั้นสูง" onClick={handleAdvancedSearchToggle}>
                                                {advancedSearchIcon}
                                                {advancedSearchText}
                                            </DarkOutlineButton>
                                            <GrayOutlineButton className='download-btn' title="ดาวน์โหลดรายงานการตรวจนับครุภัณฑ์" onClick={toggleDownloadModal} disabled={loading}>
                                                {loading ? <FaSpinner size={16} className="m-1 spin" /> : <FiDownload size={16} className="m-1" />}
                                                {loading ? <span className="responsive-text-hidden">กำลังโหลด...</span> : <span className="responsive-text-hidden">ดาวน์โหลด</span>}
                                            </GrayOutlineButton>
                                        </Col>
                                    </div>
                                    {showAdvancedSearch && (
                                        <div className="mt-3">
                                            <InventoriesCheckListAdvancedSearchDropdown onSearch={handleAdvancedSearch} />
                                        </div>
                                    )}
                                    {loading ? (
                                        <Loader className="loader-bar" />
                                    ):(
                                        <>
                                            <div className="mt-3">
                                                <InventoriesCheckListDataTable inventory={inventories} filteredCheckLists={checkLists} currentPage={currentPage} itemsPerPage={itemsPerPage} handleInventoryCheckListClick={handleInventoryCheckListClick} apiUrl={apiUrl} />
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
                                                <DataCount className="datacount">{checkListsCount}</DataCount>
                                            </div>
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </HelmetProvider>
            </Container>
            <Modal show={showDownloadModal} onHide={toggleDownloadModal} className="custom-modal-width" centered>
                <Modal.Header>
                    <Modal.Title>
                        <FiDownload size={26} className="m-2" />
                        {'ดาวน์โหลดข้อมูลการตรวจนับครุภัณฑ์'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                        <Tab eventKey="remaining" className="tab-toggle" title={
                            <>
                                <FaCheck className="icon-tab" /> 
                                <span className="tab-text">{'ครุภัณฑ์ที่มีการใช้งานอยู่'}</span>
                            </>
                        }>
                            {dataN.length > 0 ? (
                                <>
                                    <div className="table-scroll">
                                        <Table striped bordered hover className="table-responsive mt-3">
                                            <thead>
                                                <tr>
                                                    <th>ลำดับ</th>
                                                    <th>รายการ</th>
                                                    <th>หมายเลขครุภัณฑ์</th>
                                                    <th>หน่วยงาน</th>
                                                    <th>ผู้รับผิดชอบ</th>
                                                    <th>เบอร์โทร</th>
                                                    <th>อาคาร</th>
                                                    <th>ชั้น</th>
                                                    <th>ห้อง</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1 + indexOfFirstItem}</td>
                                                        <td>{row.inv_name}</td>
                                                        <td>{row.inv_sn}</td>
                                                        <td>{row.sub_division_name}</td>
                                                        <td>{row.emp_name}</td>
                                                        <td>{row.dss_phone}</td>
                                                        <td>{row.building_name || ''}</td>
                                                        <td>{row.floor_no || ''}</td>
                                                        <td>{row.room_name || ''}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <Pagination>
                                        <Pagination.First onClick={() => setActivePage(1)} disabled={activePage === 1} />
                                        <Pagination.Prev onClick={() => setActivePage(prevPage => Math.max(prevPage - 1, 1))} disabled={activePage === 1} />
                                            {(() => {
                                                const pages = [];
                                                const totalPages = totalPagesmodal1;
                                                let startPage, endPage;
                                                if (totalPages <= 5) {
                                                    startPage = 1;
                                                    endPage = totalPages;
                                                } else {
                                                    if (activePage <= 3) {
                                                        startPage = 1;
                                                        endPage = 5;
                                                    } else if (activePage >= totalPages - 2) {
                                                        startPage = totalPages - 4;
                                                        endPage = totalPages;
                                                    } else {
                                                        startPage = activePage - 2;
                                                        endPage = activePage + 2;
                                                    }
                                                }
                                                if (startPage > 1) {
                                                    pages.push(
                                                        <Pagination.Ellipsis key="ellipsis-start" disabled />
                                                    );
                                                }
                                                for (let i = startPage; i <= endPage; i++) {
                                                    pages.push(
                                                        <Pagination.Item key={i} active={i === activePage} onClick={() => setActivePage(i)}>
                                                            {i}
                                                        </Pagination.Item>
                                                    );
                                                }
                                                if (endPage < totalPages) {
                                                    pages.push(
                                                        <Pagination.Ellipsis key="ellipsis-end" disabled />
                                                    );
                                                }
                                                return pages;
                                            }) ()}
                                        <Pagination.Next onClick={() => setActivePage(nextPage => Math.min(nextPage + 1, totalPagesmodal1))} disabled={activePage === totalPagesmodal1} />
                                        <Pagination.Last onClick={() => setActivePage(totalPagesmodal1)} disabled={activePage === totalPagesmodal1} />
                                    </Pagination>
                                </>
                            ) : (
                                <tr>
                                    <td className="none-data" colSpan="9">
                                        {'ไม่พบข้อมูลครุภัณฑ์'}
                                    </td>
                                </tr>
                            )}
                        </Tab>
                        <Tab eventKey="damaged" className="tab-toggle" title={
                            <>
                                <VscTools className="icon-tab" /> 
                                <span className="tab-text">{'ครุภัณฑ์ที่ชำรุด/เสื่อมสภาพ'}</span>
                            </>
                        }>
                            {dataD.length > 0 ? (
                                <>
                                    <div className="table-scroll">
                                        <Table striped bordered hover className="table-responsive mt-3">
                                            <thead>
                                                <tr>
                                                    <th>ลำดับ</th>
                                                    <th>รายการ</th>
                                                    <th>หมายเลขครุภัณฑ์</th>
                                                    <th>หน่วยงาน</th>
                                                    <th>ผู้รับผิดชอบ</th>
                                                    <th>เบอร์โทร</th>
                                                    <th>อาคาร</th>
                                                    <th>ชั้น</th>
                                                    <th>ห้อง</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems1.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1 + indexOfFirstItem1}</td>
                                                        <td>{row.inv_name}</td>
                                                        <td>{row.inv_sn}</td>
                                                        <td>{row.sub_division_name}</td>
                                                        <td>{row.emp_name}</td>
                                                        <td>{row.dss_phone}</td>
                                                        <td>{row.building_name || ''}</td>
                                                        <td>{row.floor_no || ''}</td>
                                                        <td>{row.room_name || ''}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <Pagination>
                                        <Pagination.First onClick={() => setActivePage1(1)} disabled={activePage1 === 1} />
                                        <Pagination.Prev onClick={() => setActivePage1(prevPage => Math.max(prevPage - 1, 1))} disabled={activePage1 === 1} />
                                            {(() => {
                                                const pages = [];
                                                const totalPages = totalPagesmodal2;
                                                let startPage, endPage;
                                                if (totalPages <= 5) {
                                                    startPage = 1;
                                                    endPage = totalPages;
                                                } else {
                                                    if (activePage1 <= 3) {
                                                        startPage = 1;
                                                        endPage = 5;
                                                    } else if (activePage1 >= totalPages - 2) {
                                                        startPage = totalPages - 4;
                                                        endPage = totalPages;
                                                    } else {
                                                        startPage = activePage1 - 2;
                                                        endPage = activePage1 + 2;
                                                    }
                                                }
                                                if (startPage > 1) {
                                                    pages.push(
                                                        <Pagination.Ellipsis key="ellipsis-start" disabled />
                                                    );
                                                }
                                                for (let i = startPage; i <= endPage; i++) {
                                                    pages.push(
                                                        <Pagination.Item key={i} active={i === activePage1} onClick={() => setActivePage1(i)}>
                                                            {i}
                                                        </Pagination.Item>
                                                    );
                                                }
                                                if (endPage < totalPages) {
                                                    pages.push(
                                                        <Pagination.Ellipsis key="ellipsis-end" disabled />
                                                    );
                                                }
                                                return pages;
                                            }) ()}
                                        <Pagination.Next onClick={() => setActivePage1(nextPage => Math.min(nextPage + 1, totalPagesmodal2))} disabled={activePage1 === totalPagesmodal2} />
                                        <Pagination.Last onClick={() => setActivePage1(totalPagesmodal2)} disabled={activePage1 === totalPagesmodal2} />
                                    </Pagination>
                                </>
                            ) : (
                                <tr>
                                    <td className="none-data" colSpan="9">
                                        {'ไม่พบข้อมูลครุภัณฑ์'}
                                    </td>
                                </tr>
                            )}
                        </Tab>
                        <Tab eventKey="unnecessary" className="tab-toggle" title={
                            <>
                                <MdOutlineCancel className="icon-tab" /> 
                                <span className="tab-text">{'ครุภัณฑ์ที่หมดความจำเป็นใช้งาน'}</span>
                            </>
                        }>
                            {dataU.length > 0 ? (
                                <>
                                    <div className="table-scroll">
                                        <Table striped bordered hover className="table-responsive mt-3">
                                            <thead>
                                                <tr>
                                                    <th>ลำดับ</th>
                                                    <th>รายการ</th>
                                                    <th>หมายเลขครุภัณฑ์</th>
                                                    <th>หน่วยงาน</th>
                                                    <th>ผู้รับผิดชอบ</th>
                                                    <th>เบอร์โทร</th>
                                                    <th>อาคาร</th>
                                                    <th>ชั้น</th>
                                                    <th>ห้อง</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems2.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1 + indexOfFirstItem2}</td>
                                                        <td>{row.inv_name}</td>
                                                        <td>{row.inv_sn}</td>
                                                        <td>{row.sub_division_name}</td>
                                                        <td>{row.emp_name}</td>
                                                        <td>{row.dss_phone}</td>
                                                        <td>{row.building_name || ''}</td>
                                                        <td>{row.floor_no || ''}</td>
                                                        <td>{row.room_name || ''}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <Pagination>
                                        <Pagination.First onClick={() => setActivePage2(1)} disabled={activePage2 === 1} />
                                        <Pagination.Prev onClick={() => setActivePage2(prevPage => Math.max(prevPage - 1, 1))} disabled={activePage2 === 1} />
                                            {(() => {
                                                const pages = [];
                                                const totalPages = totalPagesmodal3;
                                                let startPage, endPage;
                                                if (totalPages <= 5) {
                                                    startPage = 1;
                                                    endPage = totalPages;
                                                } else {
                                                    if (activePage2 <= 3) {
                                                        startPage = 1;
                                                        endPage = 5;
                                                    } else if (activePage2 >= totalPages - 2) {
                                                        startPage = totalPages - 4;
                                                        endPage = totalPages;
                                                    } else {
                                                        startPage = activePage2 - 2;
                                                        endPage = activePage2 + 2;
                                                    }
                                                }
                                                if (startPage > 1) {
                                                    pages.push(
                                                        <Pagination.Ellipsis key="ellipsis-start" disabled />
                                                    );
                                                }
                                                for (let i = startPage; i <= endPage; i++) {
                                                    pages.push(
                                                        <Pagination.Item key={i} active={i === activePage2} onClick={() => setActivePage2(i)}>
                                                            {i}
                                                        </Pagination.Item>
                                                    );
                                                }
                                                if (endPage < totalPages) {
                                                    pages.push(
                                                        <Pagination.Ellipsis key="ellipsis-end" disabled />
                                                    );
                                                }
                                                return pages;
                                            }) ()}
                                        <Pagination.Next onClick={() => setActivePage2(nextPage => Math.min(nextPage + 1, totalPagesmodal3))} disabled={activePage2 === totalPagesmodal3} />
                                        <Pagination.Last onClick={() => setActivePage2(totalPagesmodal3)} disabled={activePage2 === totalPagesmodal3} />
                                    </Pagination>
                                </>
                            ):(
                                <tr>
                                    <td className="none-data" colSpan="9">
                                        {'ไม่พบข้อมูลครุภัณฑ์'}
                                    </td>
                                </tr>
                            )}
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Dropdown onToggle={handlePDFToggle}>
                        <Dropdown.Toggle className="check-btn checklist-download-btn" variant="outline-danger" id="dropdown-basic">
                            <FaRegFilePdf size={16} className="m-1" />
                            {'ดาวน์โหลด PDF'}
                            <MdKeyboardArrowDown className={`arrow-toggle toggle-btn-dropdown ${isPDFOpen ? 'rotate-arrow' : ''}`} size={20} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleDownloadPDF1}>รวมชีท</Dropdown.Item>
                            <Dropdown.Item onClick={handleDownloadPDF2}>เลือกเฉพาะครุภัณฑ์ที่มีการใช้งานอยู่</Dropdown.Item>
                            <Dropdown.Item onClick={handleDownloadPDF3}>เลือกเฉพาะครุภัณฑ์ที่ชำรุด/เสื่อมสภาพ</Dropdown.Item>
                            <Dropdown.Item onClick={handleDownloadPDF4}>เลือกเฉพาะครุภัณฑ์ที่หมดความจำเป็นใช้งาน</Dropdown.Item>
                        </Dropdown.Menu> 
                    </Dropdown>
                    <Dropdown onToggle={handleExcelToggle}>
                        <Dropdown.Toggle className="check-btn checklist-download-btn" variant="btn btn-outline-success" id="dropdown-basic">
                            <RiFileExcel2Line size={16} className="m-1" />
                            {'ดาวน์โหลด Excel'}
                            <MdKeyboardArrowDown className={`arrow-toggle toggle-btn-dropdown ${isExcelOpen ? 'rotate-arrow' : ''}`} size={20} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleDownloadExcel1}>รวมชีท</Dropdown.Item>
                            <Dropdown.Item onClick={handleDownloadExcel2}>เลือกเฉพาะครุภัณฑ์ที่มีการใช้งานอยู่</Dropdown.Item>
                            <Dropdown.Item onClick={handleDownloadExcel3}>เลือกเฉพาะครุภัณฑ์ที่ชำรุด/เสื่อมสภาพ</Dropdown.Item>
                            <Dropdown.Item onClick={handleDownloadExcel4}>เลือกเฉพาะครุภัณฑ์ที่หมดความจำเป็นใช้งาน</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown onToggle={handleHTMLToggle}>
                        <Dropdown.Toggle className="check-btn checklist-download-btn" variant="outline-primary" id="dropdown-basic">
                            <MdPreview size={16} className="m-1" />
                            {'ดูข้อมูล HTML'}
                            <MdKeyboardArrowDown className={`arrow-toggle toggle-btn-dropdown ${isHTMLOpen ? 'rotate-arrow' : ''}`} size={20} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleHTML1}>รวมทุกสถานะ</Dropdown.Item>
                            <Dropdown.Item onClick={handleHTML2}>เลือกเฉพาะครุภัณฑ์ที่มีการใช้งานอยู่</Dropdown.Item>
                            <Dropdown.Item onClick={handleHTML3}>เลือกเฉพาะครุภัณฑ์ที่ชำรุด/เสื่อมสภาพ</Dropdown.Item>
                            <Dropdown.Item onClick={handleHTML4}>เลือกเฉพาะครุภัณฑ์ที่หมดความจำเป็นใช้งาน</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <GrayOutlineButton className="check-btn close-btn" title="ยกเลิก" onClick={handleCancel}>
                        <IoClose size={16} className="m-1" />
                        {'ปิด'}
                    </GrayOutlineButton>
                </Modal.Footer>
            </Modal>
            {currentInventoryCheckList && (
                <InventoriesCheckListDetailModal show={showInventoryCheckListModal} onHide={() => setShowInventoryCheckListModal(false)} inventory={currentInventoryCheckList} title={inventoryCheckListModalTitle} />
            )}
        </Layout>
    );
}

export default InventoriesCheckList;