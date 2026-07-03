import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import caseStudies from '../data/caseStudies';
import useReveal from '../hooks/useReveal';
import './Portfolio.css';

const filters = [
    { key: 'all', label: 'All Work' },
    { key: 'landing', label: 'Landing Pages' },
    { key: 'website', label: 'Full Websites' },
    { key: 'ecommerce', label: 'E-commerce' },
];

export default function Portfolio() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeCase, setActiveCase] = useState(null);

    useReveal([activeFilter]);

    // Close modal on Escape, lock body scroll while open
    useEffect(() => {
        if (!activeCase) return;
        document.body.classList.add('menu-open');
        const onKey = (e) => {
            if (e.key === 'Escape') setActiveCase(null);
        };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.classList.remove('menu-open');
            window.removeEventListener('keydown', onKey);
        };
    }, [activeCase]);

    const visible = caseStudies.filter(
        (p) => activeFilter === 'all' || p.category === activeFilter
    );

    return (
        <>
            <section className="page-hero">
                <div className="wrap">
                    <p className="eyebrow">Our work</p>
                    <h1>Sites we've designed, built, and shipped</h1>
                    <p className="lead">
                        Every project below launched in under two weeks. Click a project to see the problem,
                        the solution, and the result.
                    </p>
                </div>
            </section>

            <section className="section-tight" style={{ paddingTop: 0 }}>
                <div className="wrap">
                    <div className="filter-row reveal in">
                        {filters.map((f) => (
                            <button
                                key={f.key}
                                className={`filter-chip ${activeFilter === f.key ? 'active' : ''}`}
                                onClick={() => setActiveFilter(f.key)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    <div className="port-grid reveal-stagger">
                        {visible.map((p) => (
                            <button
                                key={p.id}
                                className="port-card"
                                onClick={() => setActiveCase(p)}
                            >
                                <div className="port-img">
                                    <img src={p.image} alt={p.title} loading="lazy" />
                                </div>
                                <div className="port-body">
                                    <p className="port-tag">{p.tag}</p>
                                    <h3>{p.title}</h3>
                                    <p>{p.blurb}</p>
                                    <span className="port-link">View Case Study <span className="arrow">→</span></span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <div className="wrap">
                    <div className="cta-band reveal">
                        <p className="eyebrow" style={{ color: 'var(--amber)' }}>Like what you see?</p>
                        <h2 style={{ marginTop: 14 }}>Your project could be next</h2>
                        <p>Tell us about your business — we'll reply with a free quote within 48 hours.</p>
                        <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>
                    </div>
                </div>
            </section>

            {/* Case study slide-over */}
            <div
                className={`case-modal-backdrop ${activeCase ? 'open' : ''}`}
                onClick={() => setActiveCase(null)}
            />
            <div
                className={`case-modal ${activeCase ? 'open' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label="Case study"
            >
                {activeCase && (
                    <>
                        <button
                            className="case-close"
                            aria-label="Close case study"
                            onClick={() => setActiveCase(null)}
                        >
                            ✕
                        </button>
                        <div className="case-img">
                            <img src={activeCase.image} alt={activeCase.title} />
                        </div>
                        <p className="case-tag">{activeCase.tag}</p>
                        <h2>{activeCase.title}</h2>
                        <div className="case-section">
                            <h4>The Problem</h4>
                            <p>{activeCase.problem}</p>
                        </div>
                        <div className="case-section">
                            <h4>The Solution</h4>
                            <p>{activeCase.solution}</p>
                        </div>
                        <div className="case-section">
                            <h4>The Result</h4>
                            <p>{activeCase.result}</p>
                        </div>
                        <div className="case-stats">
                            {activeCase.stats.map((s) => (
                                <div key={s.lbl}>
                                    <span className="num">{s.num}</span>
                                    <span className="lbl">{s.lbl}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}