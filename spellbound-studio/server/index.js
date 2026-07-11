import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import {
    insertSubmission,
    initializeDatabase,
} from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Gmail Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const requiredFields = ["name", "email", "business", "industry",
"projectType", "budget", "timeline", "details",
];

app.post("/api/contact", async (req, res) => {
    const data = req.body || {};

    const missing = requiredFields.filter(
        (field) => !data[field] || !String(data[field]).trim()
    );

    if (missing.length > 0) {
        return res.status(400).json({
            error: "Missing required fields",
            missing,
        });
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());

    if (!emailOk) {
        return res.status(400).json({
            error: "Invalid email address",
        });
    }

    let submissionId;

    try {
        submissionId = await insertSubmission({
            name: data.name.trim(),
            email: data.email.trim(),
            business: data.business.trim(),
            industry: data.industry.trim(),
            projectType: data.projectType,
            budget: data.budget,
            timeline: data.timeline,
            details: data.details.trim(),
            inspiration: data.inspiration
                ? data.inspiration.trim()
                : null,
        });
    } catch (err) {
        console.error("Database Error:", err);

        return res.status(500).json({
            error: "Could not save submission",
        });
    }

    try {
        // Admin Email
        await transporter.sendMail({
            from: `"Spellbound Studio" <${process.env.EMAIL_USER}>`,
            to: process.env.NOTIFY_TO,
            replyTo: data.email.trim(),
            subject: `New Project Inquiry - ${data.business}`,
            text: `
            New Project Inquiry

            Name: ${data.name}

            Email: ${data.email}

            Business: ${data.business}

            Industry: ${data.industry}

            Project Type: ${data.projectType}

            Budget: ${data.budget}

            Timeline: ${data.timeline}

            Inspiration: ${data.inspiration || "N/A"}

            Details:

            ${data.details}
            `,
        });

        // Customer Email
        await transporter.sendMail({
            from: `"Spellbound Studio" <${process.env.EMAIL_USER}>`,
            to: data.email.trim(),
            subject: "Thank You for Contacting Spellbound Studio",
            text: `
            Hi ${data.name},

            Thank you for contacting Spellbound Studio.

            We have received your inquiry.

            Our team will contact you shortly.

            Regards,

            Spellbound Studio
            `,
        });

        console.log("Emails sent successfully.");
    } catch (err) {
        console.error("Email Error:", err);
    }

    return res.status(201).json({
        ok: true,
        id: submissionId,
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        ok: true,
    });
});

await initializeDatabase();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});