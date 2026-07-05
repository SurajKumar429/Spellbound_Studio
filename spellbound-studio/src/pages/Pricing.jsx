import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import './Pricing.css';

const tiers = [
    {
        id: 'landing',
        name: 'Landing Page',
        price: '7000 INR',
        desc: 'A single, high-converting page for a launch, campaign, or simple business presence.',
        features: [
            '1 custom-designed page',
            'Up to 2 rounds of revisions',
            'Mobile & tablet responsive',
            'Contact / lead capture form',
            '3–5 day timeline',
            '14 days of post-launch support',
        ],
        featured: false,
    },
    {
        id: 'website',
        name: 'Full Website',
        price: '20,000 INR',
        desc: 'A complete multi-page site built to represent your whole business, not just one offer.',
        features: [
            'Up to 6 custom-designed pages',
            'Up to 3 rounds of revisions',
            'Mobile & tablet responsive',
            'Booking, contact & lead forms',
            'Basic on-page SEO setup',
            '7–10 day timeline',
            '30 days of post-launch support',
        ],
        featured: true,
        badge: 'Most popular',
    },
    {
        id: 'ecommerce',
        name: 'E-commerce Website',
        price: '50,000 INR',
        desc: 'A full storefront built to take orders — catalog, cart, checkout, and payments included.',
        features: [
            'Up to 10 custom-designed pages',
            'Product catalog & cart setup',
            'Secure checkout & payments',
            'Up to 3 rounds of revisions',
            '10–14 day timeline',
            '45 days of post-launch support',
        ],
        featured: false,
    },
];

const faqs = [
    {
        q: "What if my project doesn't fit a tier?",
        a: "Most projects do, but if yours needs custom features — memberships, integrations, multilingual content — reach out and we'll scope a custom quote.",
    },
    {
        q: 'Do you handle hosting and domains?',
        a: 'Yes. We can set up hosting and connect your domain, or work with an existing setup if you already have one.',
    },
    {
        q: 'What happens after the support window?',
        a: 'You can request ongoing support or updates on an as-needed basis, billed hourly, or move to a monthly care plan.',
    },
    {
        q: 'Do revisions cost extra?',
        a: 'The included rounds are free. Additional revision rounds beyond your tier are billed at a flat hourly rate, agreed upfront.',
    },
];

export default function Pricing() {
    useReveal();

    return (
        <>
            <section className="page-hero">
                <div className="wrap">
                    <p className="eyebrow">Pricing</p>
                    <h1>Simple pricing, no surprise invoices</h1>
                    <p className="lead">
                        Every tier includes design, development, and launch. Pick the scope that matches
                        where your business is today.
                    </p>
                </div>
            </section>

            <section className="section-tight" style={{ paddingTop: 0 }}>
                <div className="wrap">
                    <div className="price-grid reveal-stagger">
                        {tiers.map((tier) => (
                            <div
                                key={tier.id}
                                className={`price-card ${tier.featured ? 'featured' : ''}`}
                            >
                                {tier.badge && <span className="price-badge">{tier.badge}</span>}
                                <h3>{tier.name}</h3>
                                <div className="price-amt">
                                    <span className="num">{tier.price}</span>
                                    <span className="per">starting price</span>
                                </div>
                                <p className="price-desc">{tier.desc}</p>
                                <ul className="price-list">
                                    {tier.features.map((f) => (
                                        <li key={f}>{f}</li>
                                    ))}
                                </ul>
                                <Link
                                    to="/contact"
                                    className={`btn ${tier.featured ? 'btn-primary' : 'btn-ghost'}`}
                                >
                                    Get Started
                                </Link>
                            </div>
                        ))}
                    </div>
                    <p className="price-note reveal in">✦ Custom quotes available — reach out for details</p>
                </div>
            </section>

            <section className="faq-section">
                <div className="wrap">
                    <div className="section-head reveal">
                        <p className="eyebrow">Common questions</p>
                        <h2>Before you reach out</h2>
                    </div>
                    <div className="grid-2 reveal-stagger">
                        {faqs.map((item) => (
                            <div className="svc-card" key={item.q}>
                                <h3>{item.q}</h3>
                                <p>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <div className="wrap">
                    <div className="cta-band reveal">
                        <p className="eyebrow" style={{ color: 'var(--amber)' }}>Not sure which tier fits?</p>
                        <h2 style={{ marginTop: 14 }}>Let's talk through your project</h2>
                        <p>Tell us what you're building — we'll recommend the right scope and a free quote.</p>
                        <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>
                    </div>
                </div>
            </section>
        </>
    );
}