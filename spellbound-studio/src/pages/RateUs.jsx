import { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatingInput from '../components/StarRatingInput';
import useReveal from '../hooks/useReveal';
import './RateUs.css';

const API_BASE = 'http://localhost:4000';

export default function RateUs() {
    useReveal();

    const [form, setForm] = useState({ name: '', business: '', rating: 0, quote: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const next = {};
        if (!form.name.trim()) next.name = 'Please enter your name.';
        if (!form.rating) next.rating = 'Please choose a star rating.';
        if (!form.quote.trim() || form.quote.trim().length < 5) {
            next.quote = 'Please write a few words about your experience.';
        }
        return next;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const next = validate();
        setErrors(next);
        if (Object.keys(next).length > 0) return;

        setStatus('submitting');
        try {
            const res = await fetch(`${API_BASE}/api/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name.trim(),
                    business: form.business.trim() || null,
                    rating: form.rating,
                    quote: form.quote.trim(),
                }),
            });
            if (!res.ok) throw new Error('Request failed');
            setStatus('success');
        } catch (err) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <section className="section-tight">
                <div className="wrap">
                    <div className="form-success show">
                        <div className="check">✓</div>
                        <h3>Thanks for the feedback!</h3>
                        <p>Your review is in — we read every one, and it'll appear on the site once approved.</p>
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
                    <p className="eyebrow">Rate us</p>
                    <h1>Worked with us? Tell us how it went</h1>
                    <p className="lead">
                        We're a new studio and still building our track record — your review helps other
                        small businesses decide to trust us with their site.
                    </p>
                </div>
            </section>

            <section className="section-tight" style={{ paddingTop: 16 }}>
                <div className="wrap" style={{ maxWidth: 560 }}>
                    <div className="form-card reveal in">
                        <form onSubmit={handleSubmit} noValidate>
                            <div className={`field ${errors.rating ? 'invalid' : ''}`}>
                                <label>Your rating</label>
                                <StarRatingInput
                                    value={form.rating}
                                    onChange={(n) => setForm((prev) => ({ ...prev, rating: n }))}
                                />
                                {errors.rating && <span className="err">{errors.rating}</span>}
                            </div>

                            <div className={`field ${errors.name ? 'invalid' : ''}`}>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} />
                                {errors.name && <span className="err">{errors.name}</span>}
                            </div>

                            <div className="field">
                                <label htmlFor="business">Business Name <span className="opt">(optional)</span></label>
                                <input type="text" id="business" name="business" value={form.business} onChange={handleChange} />
                            </div>

                            <div className={`field ${errors.quote ? 'invalid' : ''}`}>
                                <label htmlFor="quote">Your review</label>
                                <textarea
                                    id="quote" name="quote" value={form.quote} onChange={handleChange}
                                    placeholder="What was it like working with Spellbound Studio?"
                                />
                                {errors.quote && <span className="err">{errors.quote}</span>}
                            </div>

                            {status === 'error' && (
                                <p className="form-server-error">
                                    Something went wrong sending your review — please try again in a moment.
                                </p>
                            )}

                            <button type="submit" className="btn btn-primary form-submit" disabled={status === 'submitting'}>
                                {status === 'submitting' ? 'Sending…' : 'Submit Review'}
                            </button>
                            <p className="form-note">
                                Reviews are checked before appearing on the site.
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}