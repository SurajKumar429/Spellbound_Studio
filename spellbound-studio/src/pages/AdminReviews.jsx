import { useEffect, useState } from 'react';
import './AdminReviews.css';

const API_BASE = 'http://localhost:4000';

export default function AdminReviews() {
    const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem('spellbound_admin_key') || '');
    const [keyInput, setKeyInput] = useState('');
    const [reviews, setReviews] = useState([]);
    const [status, setStatus] = useState('idle'); // idle | loading | ready | error
    const [actionError, setActionError] = useState('');

    const fetchPending = async (key) => {
        setStatus('loading');
        setActionError('');
        try {
            const res = await fetch(`${API_BASE}/api/reviews/pending`, {
                headers: { 'x-admin-key': key },
            });
            if (res.status === 401) {
                sessionStorage.removeItem('spellbound_admin_key');
                setAdminKey('');
                setStatus('idle');
                setActionError('That key was rejected. Try again.');
                return;
            }
            if (!res.ok) throw new Error('Failed to load');
            const data = await res.json();
            setReviews(data);
            setStatus('ready');
        } catch (err) {
            setStatus('error');
        }
    };

    useEffect(() => {
        if (adminKey) fetchPending(adminKey);
    }, [adminKey]);

    const handleUnlock = (e) => {
        e.preventDefault();
        if (!keyInput.trim()) return;
        sessionStorage.setItem('spellbound_admin_key', keyInput.trim());
        setAdminKey(keyInput.trim());
    };

    const handleApprove = async (id) => {
        setActionError('');
        try {
            const res = await fetch(`${API_BASE}/api/reviews/${id}/approve`, {
                method: 'POST',
                headers: { 'x-admin-key': adminKey },
            });
            if (!res.ok) throw new Error('Approve failed');
            setReviews((prev) => prev.filter((r) => r.id !== id));
        } catch (err) {
            setActionError('Could not approve that review — please try again.');
        }
    };

    const handleReject = async (id) => {
        setActionError('');
        try {
            const res = await fetch(`${API_BASE}/api/reviews/${id}`, {
                method: 'DELETE',
                headers: { 'x-admin-key': adminKey },
            });
            if (!res.ok) throw new Error('Reject failed');
            setReviews((prev) => prev.filter((r) => r.id !== id));
        } catch (err) {
            setActionError('Could not reject that review — please try again.');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('spellbound_admin_key');
        setAdminKey('');
        setReviews([]);
        setStatus('idle');
    };

    // --- Locked view: ask for the admin key ---
    if (!adminKey) {
        return (
            <section className="section-tight">
                <div className="wrap" style={{ maxWidth: 420 }}>
                    <div className="form-card">
                        <h2 style={{ fontSize: 20, marginBottom: 6 }}>Admin access</h2>
                        <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 20 }}>
                            Enter the admin key to review pending submissions.
                        </p>
                        <form onSubmit={handleUnlock}>
                            <div className="field">
                                <label htmlFor="adminKey">Admin key</label>
                                <input
                                    type="password"
                                    id="adminKey"
                                    value={keyInput}
                                    onChange={(e) => setKeyInput(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                            {actionError && <p className="form-server-error">{actionError}</p>}
                            <button type="submit" className="btn btn-primary form-submit">Unlock</button>
                        </form>
                    </div>
                </div>
            </section>
        );
    }

    // --- Unlocked view: pending queue ---
    return (
        <section className="section-tight">
            <div className="wrap" style={{ maxWidth: 720 }}>
                <div className="admin-header">
                    <div>
                        <h2 style={{ fontSize: 22 }}>Pending reviews</h2>
                        <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
                            {status === 'ready' ? `${reviews.length} waiting for approval` : 'Loading…'}
                        </p>
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Lock</button>
                </div>

                {actionError && <p className="form-server-error">{actionError}</p>}

                {status === 'error' && (
                    <p className="form-server-error">
                        Couldn't reach the server. Make sure the backend is running.
                    </p>
                )}

                {status === 'ready' && reviews.length === 0 && (
                    <p style={{ color: 'var(--ink-soft)', marginTop: 20 }}>
                        No pending reviews right now — you're all caught up.
                    </p>
                )}

                <div className="admin-review-list">
                    {reviews.map((r) => (
                        <div className="admin-review-card" key={r.id}>
                            <div className="admin-review-top">
                                <div>
                                    <p className="admin-review-name">{r.name}</p>
                                    <p className="admin-review-biz">{r.business || 'No business given'}</p>
                                </div>
                                <div className="admin-review-stars">
                                    {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                                </div>
                            </div>
                            <p className="admin-review-quote">"{r.quote}"</p>
                            <div className="admin-review-actions">
                                <button className="btn-approve" onClick={() => handleApprove(r.id)}>Approve</button>
                                <button className="btn-reject" onClick={() => handleReject(r.id)}>Reject</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}