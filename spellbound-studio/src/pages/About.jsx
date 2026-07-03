import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import './About.css';

const founders = [
    {
        initials: 'NM',
        color: 'linear-gradient(135deg,#0E6E62,#FFB020)',
        name: 'Nadia Morais',
        role: 'Design Lead',
        bio: 'Ten years designing for startups before co-founding Spellbound. Obsessive about type, spacing, and pages that load in under a second.',
    },
    {
        initials: 'KO',
        color: 'linear-gradient(135deg,#0A5147,#123B33)',
        name: 'Kian Osei',
        role: 'Development Lead',
        bio: 'Builds every site by hand — no page-builder bloat. Formerly a front-end engineer at a mid-size product company.',
    },
    {
        initials: 'EV',
        color: 'linear-gradient(135deg,#3A5AE0,#1B1B2F)',
        name: 'Elena Voss',
        role: 'Client Strategy',
        bio: 'Runs discovery and keeps projects on schedule. Previously ran ops for a boutique branding agency.',
    },
];

const values = [
    {
        title: 'Days, not months',
        text: 'Most projects launch within a week or two of kickoff — because we keep our process tight, not because we cut corners.',
    },
    {
        title: 'Hand-built, not templated',
        text: 'Every site is custom-coded to your brand. No drag-and-drop builder slowing down your load times or limiting your design.',
    },
    {
        title: 'Direct access to the team',
        text: 'You work directly with the people building your site — no account managers relaying messages back and forth.',
    },
];

export default function About() {
    useReveal();

    return (
        <>
            <section className="page-hero">
                <div className="wrap">
                    <p className="eyebrow">About us</p>
                    <h1>A small studio that ships fast, on purpose</h1>
                    <p className="lead">
                        Spellbound Studio started because too many small businesses were quoted six-week
                        timelines and five-figure invoices for a website they could have live in days.
                    </p>
                </div>
            </section>

            <section className="section-tight" style={{ paddingTop: 0 }}>
                <div className="wrap story-block reveal">
                    <p>
                        We're three people who spent years inside larger agencies watching good projects get
                        buried under process — endless discovery decks, committees, and timelines that
                        stretched a two-week job into two months.
                    </p>
                    <p>
                        So we built the studio we wished existed: small enough to move fast, senior enough to
                        skip the guesswork, and structured around a simple promise — you tell us what you
                        need, we design and build it, and you're live within days.
                    </p>
                    <p>
                        Every project still gets real strategy and real craft. We just don't charge you for
                        the meetings it takes to get there.
                    </p>
                </div>
            </section>

            <section className="founders-section">
                <div className="wrap">
                    <div className="section-head reveal">
                        <p className="eyebrow">The team</p>
                        <h2>Three founders, one studio</h2>
                    </div>
                    <div className="founder-grid reveal-stagger">
                        {founders.map((f) => (
                            <div className="founder-card" key={f.name}>
                                <div className="founder-avatar" style={{ background: f.color }}>
                                    <span>{f.initials}</span>
                                </div>
                                <h3>{f.name}</h3>
                                <span className="role">{f.role}</span>
                                <p>{f.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <div className="wrap">
                    <div className="section-head reveal">
                        <p className="eyebrow">What makes us different</p>
                        <h2>Small studio, no compromises</h2>
                    </div>
                    <div className="value-grid reveal-stagger">
                        {values.map((v) => (
                            <div className="value-item" key={v.title}>
                                <h3>{v.title}</h3>
                                <p>{v.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <div className="wrap">
                    <div className="cta-band reveal">
                        <p className="eyebrow" style={{ color: 'var(--amber)' }}>Let's work together</p>
                        <h2 style={{ marginTop: 14 }}>Tell us about your business</h2>
                        <p>We'll reply with a free quote and a realistic timeline within 48 hours.</p>
                        <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>
                    </div>
                </div>
            </section>
        </>
    );
}