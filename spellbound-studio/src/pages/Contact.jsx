import { useState } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import './Contact.css';

const initialForm = {
    name: '',
    email: '',
    business: '',
    industry: '',
    projectType: '',
    budget: '',
    timeline: '',
    details: '',
    inspiration: '',
};

const validators = {
    name: (v) => v.trim().length > 1,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    business: (v) => v.trim().length > 1,
    industry: (v) => v.trim().length > 1,
    projectType: (v) => v !== '',
    budget: (v) => v !== '',
    timeline: (v) => v !== '',
    details: (v) => v.trim().length > 9,
};

const errorMessages = {
    name: 'Please enter your name.',
    email: 'Please enter a valid email address.',
    business: 'Please enter your business name.',
    industry: 'Please enter your industry.',
    projectType: 'Please select a project type.',
    budget: 'Please select a budget range.',
    timeline: 'Please select a timeline.',
    details: 'Please add a few details about your project.',
};

const API_URL = 'http://localhost:4000/api/contact';

export default function Contact() {
    useReveal();

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error
    const [serverError, setServerError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Clear the error for this field as soon as it becomes valid again
        if (errors[name]) {
            setErrors((prev) => {
                const next = { ...prev };
                if (validators[name]?.(value)) delete next[name];
                return next;
            });
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (!validators[name]) return;
        const ok = validators[name](value);
        setErrors((prev) => ({ ...prev, [name]: ok ? undefined : errorMessages[name] }));
    };

    const validateAll = () => {
        const nextErrors = {};
        Object.keys(validators).forEach((key) => {
            if (!validators[key](form[key])) {
                nextErrors[key] = errorMessages[key];
            }
        });
        return nextErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nextErrors = validateAll();
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            // focus the first invalid field
            const firstKey = Object.keys(nextErrors)[0];
            document.getElementsByName(firstKey)[0]?.focus();
            return;
        }

        setStatus('submitting');
        setServerError('');

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Request failed');

            setStatus('success');
        } catch (err) {
            setStatus('error');
            setServerError("Something went wrong on our end — please try again, or email us directly at hello@spellboundstudio.com.");
        }
    };

    if (status === 'success') {
        return (
            <section className="section-tight">
                <div className="wrap">
                    <div className="form-success show">
                        <div className="check">✓</div>
                        <h3>Thanks! We'll get back to you within 24–48 hours.</h3>
                        <p>Keep an eye on your inbox — we read every submission personally.</p>
                        <Link to="/" className="btn btn-ghost">Back to Home</Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="page-hero" style={{ paddingBottom: 24 }}>
                <div className="wrap">
                    <p className="eyebrow">Get started</p>
                    <h1>Let's build your site</h1>
                    <p className="lead">
                        Tell us a bit about your project. We reply with a free, no-obligation quote within
                        24–48 hours.
                    </p>
                </div>
            </section>

            <section className="section-tight" style={{ paddingTop: 16 }}>
                <div className="wrap">
                    <div className="contact-layout">
                        <div className="contact-side reveal">
                            <h2>What happens next</h2>
                            <p>
                                We read every submission personally. Within 24–48 hours you'll hear back with a
                                scoped quote, a rough timeline, and a couple of questions if we need more detail.
                            </p>
                            <div className="contact-info">
                                <div className="contact-info-item">
                                    <div className="ico">✉</div>
                                    <div><b>Email us directly</b><span>hello@spellboundstudio.com</span></div>
                                </div>
                                <div className="contact-info-item">
                                    <div className="ico">⏱</div>
                                    <div><b>Response time</b><span>24–48 hours, weekdays</span></div>
                                </div>
                                <div className="contact-info-item">
                                    <div className="ico">✦</div>
                                    <div><b>No pressure</b><span>Every quote is free and non-binding</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="reveal">
                            <div className="form-card">
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="form-row">
                                        <div className={`field ${errors.name ? 'invalid' : ''}`}>
                                            <label htmlFor="name">Name</label>
                                            <input
                                                type="text" id="name" name="name" autoComplete="name"
                                                value={form.name} onChange={handleChange} onBlur={handleBlur}
                                            />
                                            {errors.name && <span className="err">{errors.name}</span>}
                                        </div>
                                        <div className={`field ${errors.email ? 'invalid' : ''}`}>
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email" id="email" name="email" autoComplete="email"
                                                value={form.email} onChange={handleChange} onBlur={handleBlur}
                                            />
                                            {errors.email && <span className="err">{errors.email}</span>}
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className={`field ${errors.business ? 'invalid' : ''}`}>
                                            <label htmlFor="business">Business Name</label>
                                            <input
                                                type="text" id="business" name="business" autoComplete="organization"
                                                value={form.business} onChange={handleChange} onBlur={handleBlur}
                                            />
                                            {errors.business && <span className="err">{errors.business}</span>}
                                        </div>
                                        <div className={`field ${errors.industry ? 'invalid' : ''}`}>
                                            <label htmlFor="industry">Industry</label>
                                            <input
                                                type="text" id="industry" name="industry" placeholder="e.g. Food & beverage"
                                                value={form.industry} onChange={handleChange} onBlur={handleBlur}
                                            />
                                            {errors.industry && <span className="err">{errors.industry}</span>}
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className={`field ${errors.projectType ? 'invalid' : ''}`}>
                                            <label htmlFor="projectType">Project Type</label>
                                            <select
                                                id="projectType" name="projectType"
                                                value={form.projectType} onChange={handleChange} onBlur={handleBlur}
                                            >
                                                <option value="">Select one</option>
                                                <option value="landing">Landing Page</option>
                                                <option value="website">Full Website</option>
                                                <option value="ecommerce">E-commerce</option>
                                                <option value="unsure">Not Sure</option>
                                            </select>
                                            {errors.projectType && <span className="err">{errors.projectType}</span>}
                                        </div>
                                        <div className={`field ${errors.budget ? 'invalid' : ''}`}>
                                            <label htmlFor="budget">Budget Range</label>
                                            <select
                                                id="budget" name="budget"
                                                value={form.budget} onChange={handleChange} onBlur={handleBlur}
                                            >
                                                <option value="">Select a range</option>
                                                <option value="under-1k">Under $1,000</option>
                                                <option value="1k-3k">$1,000 – $3,000</option>
                                                <option value="3k-5k">$3,000 – $5,000</option>
                                                <option value="5k-plus">$5,000+</option>
                                                <option value="not-sure">Not sure yet</option>
                                            </select>
                                            {errors.budget && <span className="err">{errors.budget}</span>}
                                        </div>
                                    </div>

                                    <div className={`field ${errors.timeline ? 'invalid' : ''}`}>
                                        <label htmlFor="timeline">Timeline</label>
                                        <select
                                            id="timeline" name="timeline"
                                            value={form.timeline} onChange={handleChange} onBlur={handleBlur}
                                        >
                                            <option value="">Select a timeline</option>
                                            <option value="asap">As soon as possible</option>
                                            <option value="2-4-weeks">2–4 weeks</option>
                                            <option value="1-2-months">1–2 months</option>
                                            <option value="flexible">Flexible / just exploring</option>
                                        </select>
                                        {errors.timeline && <span className="err">{errors.timeline}</span>}
                                    </div>

                                    <div className={`field ${errors.details ? 'invalid' : ''}`}>
                                        <label htmlFor="details">Project Details</label>
                                        <textarea
                                            id="details" name="details"
                                            placeholder="Tell us about your business and what you need from your website."
                                            value={form.details} onChange={handleChange} onBlur={handleBlur}
                                        />
                                        {errors.details && <span className="err">{errors.details}</span>}
                                    </div>

                                    <div className="field">
                                        <label htmlFor="inspiration">
                                            Inspiration Links <span className="opt">(optional)</span>
                                        </label>
                                        <input
                                            type="text" id="inspiration" name="inspiration"
                                            placeholder="Sites or styles you like"
                                            value={form.inspiration} onChange={handleChange}
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <p className="form-server-error">{serverError}</p>
                                    )}

                                    <button type="submit" className="btn btn-primary form-submit" disabled={status === 'submitting'}>
                                        {status === 'submitting' ? 'Sending…' : 'Send Project Details'}
                                    </button>
                                    <p className="form-note">
                                        By submitting, you agree to be contacted by Spellbound Studio about your project.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}