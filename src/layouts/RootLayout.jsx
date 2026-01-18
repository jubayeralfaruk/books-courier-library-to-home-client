import React from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import ScrollToTop from '../components/ScrollToTop';
import ScrollProgress from '../components/ScrollProgress';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            <ScrollProgress />
            <Navbar />
            <main className="min-h-screen">
                {/* Your main content will be rendered here */}
                <Outlet />
            </main>
            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default RootLayout;