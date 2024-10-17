// Import Libraries
import axios from 'axios';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

// Import Assets
import '@assets/css/global.css';
import '@assets/css/features/InventoriesCheckList/InventoriesCheckListDataTable.css'

// Import Components
import { GreenPillBadge, RedPillBadge, YellowPillBadge, GrayPillBadge } from '@components/badges/PillBadges';
import { DarkOutlineButton, YellowOutlineButton, RedOutlineButton, GrayOutlineButton } from '@components/buttons/OutlineButton';

// Import Icons
import { FiEdit3 } from 'react-icons/fi';
import { IoClose } from "react-icons/io5";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineImageNotSupported, MdCancel } from 'react-icons/md';
import { FaRegFilePdf, FaSpinner, FaCheckCircle } from 'react-icons/fa';

const formatDateToThaiLocale = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('th-TH', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }).format(date);
};

const InventoriesCheckListDataTable = ({ inventory, filteredCheckLists, currentPage, itemsPerPage, handleInventoryCheckListClick, apiUrl }) => {
    const [selectedStatus, setSelectedStatus] = useState('');

    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('');

    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedCheck, setSelectedCheck] = useState(null);

    const notifySuccess = (message) => {
        toast.success(message, {
            position: "bottom-right",
            autoClose: 10000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            progressClassName: 'toast-progress-bar',
        });
    };

    const notifyError = (message) => {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 10000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            progressClassName: 'toast-progress-bar',
        });
    };

    const handleDeleteClick = (check) => {
        setSelectedCheck(check);
        setShowConfirm(true); 
    };

    const handleCancel = () => {
        setShowConfirm(false); 
    };

    const handleCheckDelete = async () => {
        setLoading(true);
        try {
            setSelectedStatus(selectedCheck.dispense_flg);
            await axios.put(`${apiUrl}api/putInventories/${selectedCheck.inv_id}`, {
                check_fiscal_year: null,
                dispense_flg: selectedCheck.dispense_flg
            });
            await axios.delete(`${apiUrl}api/deleteCheckHistories/${selectedCheck.check_id}`);
            notifySuccess('ลบประวัติการตรวจนับครุภัณฑ์สำเร็จ');
            setShowConfirm(false);
            window.location.reload(); 
        } 
        catch (error) {
            notifyError('เกิดข้อผิดพลาดในการลบข้อมูล กรุณาลองใหม่อีกครั้ง');
        }
        finally {
            setLoading(false);
        }
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : (sortDirection === 'desc' ? '' : 'asc'));
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedCheckLists = () => {
        if (!sortColumn || !sortDirection) return filteredCheckLists;

        return [...filteredCheckLists].sort((a, b) => {
            const valueA = a[sortColumn];
            const valueB = b[sortColumn];

            if (valueA == null || valueB == null) return 0;

            if (sortDirection === 'asc') {
                return valueA > valueB ? 1 : -1;
            } else if (sortDirection === 'desc') {
                return valueA < valueB ? 1 : -1;
            }
            return 0;
        });
    };

    return (
        <>
            <div className="table-responsive">
                <table className="table table-check table-hover mb-0 text-center">
                    <thead className="table-dark">
                        <tr className="align-middle">
                            <th>#</th>
                            <th className="table-header" onClick={() => handleSort('inv_sn')}>หมายเลขครุภัณฑ์</th>
                            <th className="table-header" onClick={() => handleSort('inv_name')}>ชื่อครุภัณฑ์</th>
                            <th className="table-header" onClick={() => handleSort('fiscal_year')}>ปีที่ตรวจนับ</th>
                            <th className="table-header" onClick={() => handleSort('division.org_name')}>หน่วยงานที่ดูแล</th>
                            <th className="table-header" onClick={() => handleSort('check_location')}>สถานที่ตั้ง</th>
                            {/* <th>การตรวจนับ</th> */}
                            <th className="table-header" onClick={() => handleSort('dispense_flg')}>สถานะ</th>
                            <th className="table-header" onClick={() => handleSort('updated_at')}>วันที่แก้ไขข้อมูล</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="align-middle">
                        {sortedCheckLists().length > 0 ? (
                            sortedCheckLists().map((check, index) => (
                                <tr key={check.check_id}>
                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td>{check.inv_sn ? check.inv_sn : <span className="span-text">{'ไม่ระบุ'}</span>}</td>
                                    <td>
                                        <a className="inv-name" href="#" onClick={(e) => { e.preventDefault(); handleInventoryCheckListClick(check, check.inv_name); }}>
                                            {check.inv_name ? check.inv_name : <span className="span-text">{'ไม่ระบุ'}</span>}
                                        </a>
                                    </td>
                                    <td>{check.fiscal_year ? check.fiscal_year : <span className="span-text">{'ไม่ระบุ'}</span>}</td>
                                    <td>{check.division ? check.division.org_name : <span className="span-text">{'ไม่ระบุ'}</span>}</td>
                                    <td>{check.check_location ? check.check_location : <span className="span-text">{'ไม่ระบุ'}</span>}</td>
                                    {/* <td>
                                        {check.check_flg === '1' ? (
                                            <FaCheckCircle className="icon-check-true" size={25} />
                                        ):(
                                            <MdCancel className="icon-check-false" size={25} />
                                        )}
                                    </td> */}
                                    <td>
                                        {check.dispense_flg === 'N' ? (
                                            <GreenPillBadge>
                                                {'ใช้งานอยู่'}
                                            </GreenPillBadge>
                                        ): check.dispense_flg === 'F' ? (
                                            <YellowPillBadge>
                                                {'จำหน่ายบางส่วน'}
                                            </YellowPillBadge>
                                        ): check.dispense_flg === 'W' ? (
                                            <YellowPillBadge>
                                                {'รอจำหน่าย'}
                                            </YellowPillBadge>
                                        ): check.dispense_flg === 'Y' ? (
                                            <RedPillBadge>
                                                {'จำหน่ายออก'}
                                            </RedPillBadge>
                                        ): check.dispense_flg === 'T' ? (
                                            <RedPillBadge>
                                                {'โอนย้าย'}
                                            </RedPillBadge>
                                        ): check.dispense_flg === 'C' ? (
                                            <RedPillBadge>
                                                {'ถูกโจรกรรม'}
                                            </RedPillBadge>
                                        ): check.dispense_flg === 'D' ? (
                                            <RedPillBadge>
                                                {'ชำรุด/เสื่อมสภาพ'}
                                            </RedPillBadge>
                                        ): check.dispense_flg === 'U' ? (
                                            <RedPillBadge>
                                                {'หมดความจำเป็นใช้งาน'}
                                            </RedPillBadge>
                                        ):(
                                            <GrayPillBadge>
                                                {'ไม่ทราบสถานะ'}
                                            </GrayPillBadge>
                                        )}
                                    </td>
                                    <td>{formatDateToThaiLocale(check.updated_at)}{' น.'}</td>
                                    <td className="btn-column justify-center items-center">
                                        {/* <YellowOutlineButton className="edit-btn" title="แก้ไขข้อมูล" href={`#`}>
                                            <FiEdit3 size={16} className="m-1" />
                                            <span className="responsive-text-hidden">แก้ไข</span>
                                        </YellowOutlineButton> */}
                                        {/* <RedOutlineButton className="delete-btn" title="ลบข้อมูล" onClick={() => handleDeleteClick(check)}>
                                            <RiDeleteBin6Line size={16} className="m-1" />
                                            <span className="responsive-text-hidden">ลบ</span>
                                        </RedOutlineButton> */}
                                        {/* <DarkOutlineButton className="pdf-btn" title="ดาวน์โหลด PDF">
                                            <FaRegFilePdf size={16} className="m-1" />
                                            <span className="responsive-text-hidden">PDF</span>
                                        </DarkOutlineButton> */}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="none-data" colSpan="11">
                                    {'ไม่พบข้อมูลครุภัณฑ์'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Modal show={showConfirm} onHide={handleCancel} centered>
                <Modal.Header>
                    <Modal.Title>
                        <RiDeleteBin6Line size={26} className="m-2" />
                        {'ลบประวัติการตรวจนับครุภัณฑ์'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {'ต้องการลบประวัติการตรวจนับครุภัณฑ์นี้หรือไม่ ?'}
                </Modal.Body>
                <Modal.Footer>
                    <RedOutlineButton className="check-btn me-2" title="ลบประวัติการตรวจนับครุภัณฑ์" onClick={handleCheckDelete} disabled={loading}>
                        {loading ? <FaSpinner size={16} className="m-1 spin" /> : <RiDeleteBin6Line size={16} className="m-1" />}
                        {loading ? <span className="responsive-text-hidden">กำลังบันทึก...</span> : <span className="responsive-text-hidden">ลบประวัติการตรวจนับ</span>}
                    </RedOutlineButton>
                    <GrayOutlineButton className="check-btn me-2" title="ยกเลิก" onClick={handleCancel}>
                        <IoClose size={16} className="m-1" />
                        <span className="responsive-text-hidden">ยกเลิก</span>
                    </GrayOutlineButton>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default InventoriesCheckListDataTable;