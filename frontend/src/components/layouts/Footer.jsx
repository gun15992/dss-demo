// Import Libraries
import React from 'react';

// Import Assets
import '@assets/css/components/layouts/Footer.css';

function Footer() {
    return (
        <footer className="footer-text bg-dark text-white">
            &copy;{' 2024 กรมวิทยาศาสตร์บริการ (วศ.)'}<br/>
            {'กระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม (อว.)'}
        </footer>
    );
}

export default Footer;