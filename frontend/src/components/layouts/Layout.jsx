// Import Libraries
import React from 'react';

// Import Components
import Header from '@layouts/Header';
import Footer from '@layouts/Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default Layout;