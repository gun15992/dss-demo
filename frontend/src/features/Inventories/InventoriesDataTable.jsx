// Import Libraries
import React, { useState } from 'react';

// Import Assets
import '@assets/css/global.css';
import '@assets/css/features/Inventories/InventoriesDataTable.css'

// Import Components
import { GreenPillBadge, RedPillBadge, YellowPillBadge, GrayPillBadge } from '@components/badges/PillBadges';
import { DarkOutlineButton, YellowOutlineButton, RedOutlineButton } from '@components/buttons/OutlineButton';

// Import Icons
import { FiEdit3 } from 'react-icons/fi';
import { FaRegFilePdf } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineImageNotSupported } from 'react-icons/md';


const InventoriesDataTable = ({ filteredInventories, currentPage, itemsPerPage, handleImageClick, handleInventoryClick, logoImage }) => {
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    const sortedInventories = [...filteredInventories].sort((a, b) => {
        if (sortConfig.key) {
            const aValue = a[sortConfig.key] || '';
            const bValue = b[sortConfig.key] || '';

            if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
            setSortConfig({ key: '', direction: '' });
            return;
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="table-responsive">
            <table className="table table-inventory table-hover mb-0 text-center">
                <thead className="table-dark">
                    <tr className="align-middle">
                        <th className="table-header" onClick={() => handleSort('id')}>#</th>
                        <th>รูปภาพ</th>
                        <th className="table-header" onClick={() => handleSort('inv_sn')}>หมายเลขครุภัณฑ์</th>
                        <th className="table-header" onClick={() => handleSort('inv_name')}>ชื่อครุภัณฑ์</th>
                        <th className="table-header" onClick={() => handleSort('classify_inv_type')}>ประเภทครุภัณฑ์</th>
                        <th>หน่วยงานที่ดูแล</th>
                        <th>สถานที่ตั้ง</th>
                        <th>สถานะ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="align-middle">
                    {sortedInventories.length > 0 ? (
                        sortedInventories.map((inventory, index) => (
                            <tr key={inventory.id}>
                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td>
                                    {inventory.images && inventory.images.length > 0 ? ( 
                                        <div className="image-cropper" onClick={() => handleImageClick(inventory.images, inventory.inv_name)}>
                                            <img className="img-fluid" src={inventory.images[0].image_url} alt={`รหัสครุภัณฑ์: ${inventory.id} - ${inventory.inv_name}`} title={`รหัสครุภัณฑ์: ${inventory.id} - ${inventory.inv_name}`} />
                                        </div>
                                    ):( 
                                        <div className="image-cropper-none">
                                            {/* <MdOutlineImageNotSupported className="inv-not-image" size={35} title="ไม่พบข้อมูล" /> */}
                                            <img src={logoImage} width="45" height="45" />
                                        </div>
                                    )}
                                </td>
                                <td>
                                    {inventory.pfix_inv_no && inventory.inv_no1 && inventory.inv_no2 && inventory.inv_no3 && inventory.inv_no4 && inventory.fiscal_year ? (
                                        `${inventory.inv_sn}`
                                    ):(
                                        <span className="span-text">{'ไม่ระบุ'}</span>
                                    )}
                                </td>
                                <td>
                                    <a className="inv-name" href="#" onClick={(e) => { e.preventDefault(); handleInventoryClick(inventory, inventory.inv_name); }}>
                                        {inventory.inv_name ? inventory.inv_name : <span className="span-text">{'ไม่ระบุ'}</span>}
                                    </a>
                                </td>
                                <td>
                                    {inventory.classify_inv_type === '1' ? (
                                        <span>{'ครุภัณฑ์ก่อสร้าง'}</span>
                                    ): inventory.classify_inv_type === '2' ? (
                                        <span>{'ครุภัณฑ์การเกษตร'}</span>
                                    ): inventory.classify_inv_type === '3' ? (
                                        <span>{'ครุภัณฑ์การแพทย์และวิทยาศาสตร์'}</span>
                                    ): inventory.classify_inv_type === '4' ? (
                                        <span>{'ครุภัณฑ์การศึกษา'}</span>
                                    ): inventory.classify_inv_type === '5' ? (
                                        <span>{'ครุภัณฑ์กีฬา/กายภาพ'}</span>
                                    ): inventory.classify_inv_type === '6' ? (
                                        <span>{'ครุภัณฑ์คอมพิวเตอร์'}</span>
                                    ): inventory.classify_inv_type === '7' ? (
                                        <span>{'ครุภัณฑ์โฆษณาและการเผยแพร่'}</span>
                                    ): inventory.classify_inv_type === '8' ? (
                                        <span>{'ครุภัณฑ์งานบ้าน/งานครัว'}</span>
                                    ): inventory.classify_inv_type === '9' ? (
                                        <span>{'ครุภัณฑ์ดนตรี/นาฏศิลป์'}</span>
                                    ): inventory.classify_inv_type === '10' ? (
                                        <span>{'ครุภัณฑ์ที่ดินของหน่วยงาน'}</span>
                                    ): inventory.classify_inv_type === '11' ? (
                                        <span>{'ครุภัณฑ์ไฟฟ้าและวิทยุ'}</span>
                                    ): inventory.classify_inv_type === '12' ? (
                                        <span>{'ครุภัณฑ์ยานพาหนะและขนส่ง'}</span>
                                    ): inventory.classify_inv_type === '13' ? (
                                        <span>{'ครุภัณฑ์โรงงาน'}</span>
                                    ): inventory.classify_inv_type === '14' ? (
                                        <span>{'ครุภัณฑ์สนาม'}</span>
                                    ): inventory.classify_inv_type === '15' ? (
                                        <span>{'ครุภัณฑ์สำนักงาน'}</span>
                                    ): inventory.classify_inv_type === '16' ? (
                                        <span>{'ครุภัณฑ์สำรวจ'}</span>
                                    ): inventory.classify_inv_type === '17' ? (
                                        <span>{'ครุภัณฑ์อาวุธ'}</span>
                                    ): inventory.classify_inv_type === '18' ? (
                                        <span>{'ครุภัณฑ์อื่นๆ'}</span>
                                    ): inventory.classify_inv_type === '19' ? (
                                        <span>{'ครุภัณฑ์ที่ดิน/ที่ราชพัสดุ'}</span>
                                    ): inventory.classify_inv_type === '20' ? (
                                        <span>{'ครุภัณฑ์โปรแกรมคอมพิวเตอร์'}</span>
                                    ): inventory.classify_inv_type === '21' ? (
                                        <span>{'สิ่งก่อสร้าง'}</span>
                                    ): inventory.classify_inv_type === '22' ? (
                                        <span>{'สิ่งปลูกสร้าง'}</span>
                                    ): inventory.classify_inv_type === '23' ? (
                                        <span>{'สินทรัพย์โครงสร้าง'}</span>
                                    ): inventory.classify_inv_type === '24' ? (
                                        <span>{'สินทรัพย์ไม่มีตัวตน'}</span>
                                    ): inventory.classify_inv_type === '25' ? (
                                        <span>{'อาคารชั่วคราว/โรงเรือน'}</span>
                                    ): inventory.classify_inv_type === '26' ? (
                                        <span>{'อาคารถาวร'}</span>
                                    ):(
                                        <span className="span-text">{'ไม่ระบุ'}</span>
                                    )}
                                </td>
                                <td>
                                    {Array.isArray(inventory.move_histories) && inventory.move_histories.length > 0 ? (
                                        `${inventory.move_histories[0].sub_division.org_name}`
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
                                        <span className="span-text">{'ไม่ระบุ'}</span>
                                    ):(
                                        <span className="span-text">{'ไม่ระบุ'}</span>
                                    )}
                                </td>
                                <td>
                                    {Array.isArray(inventory.move_histories) && inventory.move_histories.length > 0 ? (
                                        `${inventory.move_histories[0].location}`
                                    ): inventory.inv_uom ? ( 
                                        `${inventory.inv_uom}`
                                    ):( 
                                        <span className="span-text">{'ไม่ระบุ'}</span>
                                    )}
                                </td>
                                <td>
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
                                </td>
                                <td className="btn-column justify-center items-center">
                                    {/* <YellowOutlineButton className="edit-btn" title="แก้ไขข้อมูล" href={`#`}>
                                        <FiEdit3 size={16} className="m-1" />
                                        <span className="responsive-text-hidden">แก้ไข</span>
                                    </YellowOutlineButton>
                                    <RedOutlineButton className="delete-btn" title="ลบข้อมูล">
                                        <RiDeleteBin6Line size={16} className="m-1" />
                                        <span className="responsive-text-hidden">ลบ</span>
                                    </RedOutlineButton>
                                    <DarkOutlineButton className="pdf-btn" title="ดาวน์โหลด PDF">
                                        <FaRegFilePdf size={16} className="m-1" />
                                        <span className="responsive-text-hidden">PDF</span>
                                    </DarkOutlineButton> */}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="none-data" colSpan="9">
                                {'ไม่พบข้อมูลครุภัณฑ์'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default InventoriesDataTable;