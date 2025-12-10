import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <Navbar />
            <main>
                {/* Your auth related content will be rendered here */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default AuthLayout;