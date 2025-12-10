import React from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <main className="min-h-screen">
                {/* Your main content will be rendered here */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;