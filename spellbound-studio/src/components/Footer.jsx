import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer>
            <div className="wrap">
                <div className="foot-top">
                    <div className="foot-brand">
                        <Link className="logo" to="/">
                            <span className="logo-mark">✦</span>Spellbound Studio
                        </Link>
                        <p>Landing pages and websites for small businesses and startups —  fast, beautiful, and scalable.</p>
                        <div className="socials">
                            <a href="#" aria-label="Instagram">◎</a>
                            <a href="#" aria-label="LinkedIn">in</a>
                        </div>
                    </div>

                    <div className="foot-cols">
                        <div className="foot-col">
                            <h4>Studio</h4>
                            <Link to="/">Home</Link>
                            <Link to="/portfolio">Portfolio</Link>
                            <Link to="/pricing">Pricing</Link>
                            <Link to="/about">About</Link>
                        </div>
                        <div className="foot-col">
                            <h4>Get in touch</h4>
                            <Link to="/contact">Start a Project</Link>
                            <a href="mailto:spellbound.studio3@gmail.com">spellbound.studio3@gmail.com</a>
                        </div>
                    </div>
                </div>

                <div className="foot-bottom">
                    <span>© {new Date().getFullYear()} Spellbound Studio. All rights reserved.</span>
                    <span>Designed &amp; built by Spellbound Studio</span>
                </div>
            </div>
        </footer>
    );
}