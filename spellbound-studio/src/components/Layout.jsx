import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
    const location = useLocation();

    // Scroll to top on every route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
            <a className="skip-link" href="#main">Skip to content</a>
            <Navbar />
            <main id="main">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}