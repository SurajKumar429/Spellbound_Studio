import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import './Home.css';
import mysticindia from '../assets/portfolio/mysticindia.jpeg';
import smartattendence from '../assets/portfolio/smartattendence.jpeg';
import bookbazaar from '../assets/portfolio/bookbazaar.jpeg';
import todoexpee from '../assets/portfolio/todoexpee.jpeg';

const portfolioPreview = [
    {
        id: 'MysticIndia',
        tag: 'Landing Page · Travel & Explore',
        title: 'Mystic India',
        blurb: 'A captivating landing page for a travel blog.',
        image: mysticindia,
    },
    {
        id: 'Attendence',
        tag: 'Full Website · Workforce Management',
        title: 'Smart Attendance Management System',
        blurb: 'An efficient attendance management system designed for organizations and teams.',
        image: smartattendence,
    },
    {
        id: 'Bookbazaar',
        tag: 'E-commerce · Book Marketplace',
        title: 'Book Bazaar',
        blurb: 'Buy and sell pre-owned books through a simple and user-friendly online marketplace.',
        image: bookbazaar,
    },
    {
        id: 'Todoexpee',
        tag: 'Landing Page · Tasks & Expenses',
        title: 'Todo-Expee',
        blurb: 'Track tasks, monitor expenses, and stay organized every day.',
        image: todoexpee,
    },
];

const process = [
    {
        num: '01 / TELL US',
        title: 'Tell Us Your Requirements',
        text: 'A short questionnaire and call to understand your business, goals, and style preferences.',
    },
    {
        num: '02 / BUILD',
        title: 'We Design & Build',
        text: 'Our team designs and codes your site, with a first look ready in as little as 3 days.',
    },
    {
        num: '03 / REVIEW',
        title: 'You Review & Request Changes',
        text: 'Walk through the live preview and request revisions — no vague back-and-forth.',
    },
    {
        num: '04 / LAUNCH',
        title: 'We Launch Your Site',
        text: 'We handle domain, hosting, and go-live, then hand you the keys — with support after launch.',
    },
];

const testimonials = [
    {
        initials: 'RM',
        color: 'linear-gradient(135deg,#0E6E62,#FFB020)',
        quote: '"We had a working, beautiful site in five days. Spellbound actually listened instead of pushing a template at us."',
        name: 'Rosa Marchetti',
        biz: 'Kettlebread Bakery',
    },
    {
        initials: 'JT',
        color: 'linear-gradient(135deg,#0A5147,#123B33)',
        quote: '"Bookings went up almost immediately after launch. The revision process was painless."',
        name: 'Jordan Tan',
        biz: 'Coastal Pilates Studio',
    },
    {
        initials: 'DN',
        color: 'linear-gradient(135deg,#3A5AE0,#1B1B2F)',
        quote: '"They handled the store setup end-to-end. I sold products online for the first time and it just worked from day one."',
        name: 'Devon Ng',
        biz: 'Northbound Supply Co.',
    },
];

export default function Home() {
    useReveal();

    return (
        <>
            {/* HERO */}
            <section className="hero">
                <div className="hero-glow" aria-hidden="true" />
                <div className="wrap hero-inner">
                    <p className="eyebrow reveal in">Web design & development studio</p>
                    <h1 style={{ marginTop: 18 }}>
                        We build landing pages &amp; websites that <em>convert</em> — fast, beautiful, and scalable.
                    </h1>
                    <p className="lead">
                        Spellbound Studio partners with small businesses and startups to design, build, and
                        launch fast, beautiful websites — without the six-week agency runaround.
                    </p>
                    <div className="hero-cta">
                        <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>
                        <Link to="/portfolio" className="btn btn-ghost">See Our Work</Link>
                    </div>
                    <div className="hero-meta">
                        <div><span className="num">20+</span><span className="lbl">SITES LAUNCHED</span></div>
                        <div><span className="num">15 Days</span><span className="lbl">AVG. TURNAROUND</span></div>
                        <div><span className="num">--</span><span className="lbl">CLIENT RATING</span></div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section>
                <div className="wrap">
                    <div className="section-head reveal">
                        <p className="eyebrow">What we build</p>
                        <h2>One studio, every stage of your web presence</h2>
                        <p>Pick the scope that fits where your business is today — every project is designed and coded by hand, no bloated templates.</p>
                    </div>
                    <div className="grid-3 reveal-stagger">
                        <div className="svc-card">
                            <div className="svc-icon">◆</div>
                            <h3>Landing Page</h3>
                            <p>A single, sharply-written page built to turn visitors into leads — perfect for launches, campaigns, or a first web presence.</p>
                            <div className="svc-price"><span className="from">Starting at</span><span className="amt">7000 INR</span></div>
                        </div>
                        <div className="svc-card">
                            <div className="svc-icon">▣</div>
                            <h3>Full Website</h3>
                            <p>A complete multi-page site — home, about, services, contact and more — designed around how customers actually find you.</p>
                            <div className="svc-price"><span className="from">Starting at</span><span className="amt">20,000 INR</span></div>
                        </div>
                        <div className="svc-card">
                            <div className="svc-icon">◈</div>
                            <h3>E-commerce Website</h3>
                            <p>A storefront built to sell — product catalog, cart, checkout, and payments, ready to take orders from day one.</p>
                            <div className="svc-price"><span className="from">Starting at</span><span className="amt">50,000 INR</span></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PORTFOLIO PREVIEW */}
            <section className="work-section">
                <div className="wrap">
                    <div className="section-head reveal">
                        <p className="eyebrow">Recent work</p>
                        <h2>Real launches for real businesses</h2>
                        <p>A sample of landing pages and full sites we've shipped for founders across food, wellness, and retail.</p>
                    </div>
                    <div className="port-grid reveal-stagger">
                        {portfolioPreview.map((p) => (
                            <Link className="port-card" to="/portfolio" key={p.id}>
                                <div className="port-img">
                                    <img src={p.image} alt={p.title} loading="lazy" />
                                </div>
                                <div className="port-body">
                                    <p className="port-tag">{p.tag}</p>
                                    <h3>{p.title}</h3>
                                    <p>{p.blurb}</p>
                                    <span className="port-link">View Project <span className="arrow">→</span></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="section-dark">
                <div className="wrap">
                    <div className="section-head reveal">
                        <p className="eyebrow" style={{ color: 'var(--teal-light, #3FA394)' }}>How it works</p>
                        <h2>Four steps from idea to live site</h2>
                        <p>The same process for every project — clear, fast, and built around your feedback.</p>
                    </div>
                    <div className="process-list reveal-stagger">
                        {process.map((step) => (
                            <div className="proc-step" key={step.num}>
                                <span className="proc-num">{step.num}</span>
                                <h3>{step.title}</h3>
                                <p>{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section>
                <div className="wrap">
                    <div className="section-head reveal">
                        <p className="eyebrow">Client stories</p>
                        <h2>Founders who launched with us</h2>
                    </div>
                    <div className="testi-grid reveal-stagger">
                        {testimonials.map((t) => (
                            <div className="testi-card" key={t.name}>
                                <div className="testi-stars">★★★★★</div>
                                <p className="testi-quote">{t.quote}</p>
                                <div className="testi-person">
                                    <div className="avatar" style={{ background: t.color }}>{t.initials}</div>
                                    <div className="who"><b>{t.name}</b><span>{t.biz}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section>
                <div className="wrap">
                    <div className="cta-band reveal">
                        <p className="eyebrow" style={{ color: 'var(--amber)' }}>Ready when you are</p>
                        <h2 style={{ marginTop: 14 }}>Let's build something that actually converts</h2>
                        <p>Tell us about your project — we'll reply with a free, no-obligation quote within 48 hours.</p>
                        <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>
                    </div>
                </div>
            </section>
        </>
    );
}