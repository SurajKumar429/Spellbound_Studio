import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import { insertSubmission } from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const resend = new Resend(process.env.RESEND_API_KEY);

const requiredFields = [
    'name', 'email', 'business', 'industry',
    'projectType', 'budget', 'timeline', 'details',
];

app.post('/api/contact', async (req, res) => {
    const data = req.body || {};

    // Server-side validation — never trust the client alone
    const missing = requiredFields.filter((field) => !data[field] || !String(data[field]).trim());
    if (missing.length > 0) {
        return res.status(400).json({ error: 'Missing required fields', missing });
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());
    if (!emailOk) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    let submissionId;
    try {
        submissionId = insertSubmission({
            name: data.name.trim(),
            email: data.email.trim(),
            business: data.business.trim(),
            industry: data.industry.trim(),
            projectType: data.projectType,
            budget: data.budget,
            timeline: data.timeline,
            details: data.details.trim(),
            inspiration: data.inspiration ? data.inspiration.trim() : null,
        });
    } catch (err) {
        console.error('DB insert failed:', err);
        return res.status(500).json({ error: 'Could not save submission' });
    }

    // Try to send the email, but don't fail the whole request if email fails —
    // the submission is already safely stored in the database either way.
    try {
        await resend.emails.send({
            from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
            to: process.env.NOTIFY_TO,
            replyTo: data.email.trim(),
            subject: `New project inquiry — ${data.business}`,
            text: [
                `Name: ${data.name}`,
                `Email: ${data.email}`,
                `Business: ${data.business}`,
                `Industry: ${data.industry}`,
                `Project Type: ${data.projectType}`,
                `Budget: ${data.budget}`,
                `Timeline: ${data.timeline}`,
                `Inspiration: ${data.inspiration || '—'}`,
                '',
                'Details:',
                data.details,
            ].join('\n'),
        });
    } catch (err) {
        console.error('Email send failed (submission was still saved):', err.message);
    }

    res.status(201).json({ ok: true, id: submissionId });
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
    console.log(`Spellbound API running on http://localhost:${PORT}`);
});