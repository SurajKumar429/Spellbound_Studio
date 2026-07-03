import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.classList.toggle('menu-open', menuOpen);
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-inner">
                    <Link className="logo" to="/">
                        <span className="logo-mark">✦</span>Spellbound Studio
                    </Link>

                    <nav>
                        <ul className="nav-links">
                            {links.map((link) => (
                                <li key={link.to}>
                                    <NavLink
                                        to={link.to}
                                        end={link.end}
                                        className={({ isActive }) => (isActive ? 'active' : '')}
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="nav-cta">
                        <Link to="/contact" className="btn btn-ghost btn-sm">Contact</Link>
                        <Link to="/contact" className="btn btn-primary btn-sm">Get a Quote</Link>
                    </div>

                    <button
                        className="nav-toggle"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        <span />
                    </button>
                </div>
            </header>

            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.end}
                        onClick={closeMenu}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        {link.label}
                    </NavLink>
                ))}
                <Link to="/contact" className="btn btn-primary" onClick={closeMenu}>
                    Get a Quote
                </Link>
            </div>
        </>
    );
}