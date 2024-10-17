// Import Libraries
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Pages
import Home from '../pages/Home';
import Manual from '../pages/Manual';
// import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import Inventories from '../pages/Inventories';
// import InventoriesType from '../pages/InventoriesType';
import InventoriesCheck from '../pages/InventoriesCheck';
import InventoriesCheckList from '../pages/InventoriesCheckList';
import InventoriesQrCodeGenerator from '../pages/InventoriesQrCodeGenerator';

function DefaultRoute() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/manual" element={<Manual />} />
                {/* <Route path="/about" element={<About />} /> */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inventories" element={<Inventories />} />
                {/* <Route path="/inventories/type" element={<InventoriesType />} /> */}
                <Route path="/inventories/check" element={<InventoriesCheck />} />
                <Route path="/inventories/check/list" element={<InventoriesCheckList />} />
                <Route path="/inventories/qrcode" element={<InventoriesQrCodeGenerator />} />
            </Routes>
        </Router>
    );
}

export default DefaultRoute;
