// Import Libraries
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Hooks
// import useAuth from './hooks/useAuth';

// Import Global CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Import Routes
import DefaultRoute from './routes/DefaultRoute';

function App() {
    // const isLogin = useAuth();
    return (
        <>
            <DefaultRoute />
            <ToastContainer />
        </>
    );
}

export default App;