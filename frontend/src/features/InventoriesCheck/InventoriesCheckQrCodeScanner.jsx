// Import Libraries
import { toast } from 'react-toastify';
import QrScanner from 'react-qr-scanner';
import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

// Import Assets
import '../../assets/css/features/InventoriesCheck/InventoriesCheckQrCodeScanner.css';

// Import Icons
import { IoQrCode } from "react-icons/io5";
import { FaCheck, FaTimes } from "react-icons/fa";

function InventoriesCheckQrCodeScanner({ onScanResult }) {
    const [scanResult, setScanResult] = useState('');
    const [scannerClass, setScannerClass] = useState('qrcode-scanner');

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

    const handleScan = (data) => {
        if (data && !scanResult) { 
            const newResult = data.text;
            setScanResult(newResult);
            notifySuccess(`พบข้อมูลครุภัณฑ์แล้ว`);
            setScannerClass('qrcode-scanner success-scan');
            onScanResult(newResult);
        }
    };

    const handleError = (err) => {
        console.error(err);
        notifyError('เกิดข้อผิดพลาด กรุณากดปุ่ม "รีเฟรช" เพื่อลองใหม่อีกครั้ง');
        setScannerClass('qrcode-scanner error-scan');
    };

    return (
        <div>
            <QrScanner className={`${scannerClass} square-scanner`} onScan={handleScan} onError={handleError} style={{ width: '100%' }} />
            {/* <Form.Group className="mt-4" title="ข้อมูลรหัสครุภัณฑ์จากรหัสคิวอาร์">
                <InputGroup className="ingroup-qrcode">
                    <InputGroup.Text>
                        <IoQrCode className="qrcode-icon-ingroup" />
                        <span className="input-group-span-text">
                            {'รหัสครุภัณฑ์'}
                        </span>
                    </InputGroup.Text>
                    <Form.Control className="ingroup-qrcode-form" type="text" value={scanResult} readOnly disabled style={{ borderRadius: '0 0.5rem 0.5rem 0' }} />
                </InputGroup>
            </Form.Group> */}
        </div>
    );
}

export default InventoriesCheckQrCodeScanner;