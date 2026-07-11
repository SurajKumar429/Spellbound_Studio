import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Create table if it doesn't exist
export async function initializeDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS submissions (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                business VARCHAR(255) NOT NULL,
                industry VARCHAR(255) NOT NULL,
                project_type VARCHAR(255) NOT NULL,
                budget VARCHAR(255) NOT NULL,
                timeline VARCHAR(255) NOT NULL,
                details TEXT NOT NULL,
                inspiration TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("✅ PostgreSQL connected.");
        console.log("✅ submissions table ready.");
    } catch (err) {
        console.error("Database Initialization Error:", err);
    }
}

export async function insertSubmission(data) {
    const query = `
        INSERT INTO submissions (
            name, email, business, industry, project_type, budget, timeline, details, inspiration
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING id;
    `;

    const values = [
        data.name,
        data.email,
        data.business,
        data.industry,
        data.projectType,
        data.budget,
        data.timeline,
        data.details,
        data.inspiration,
    ];

    const result = await pool.query(query, values);

    return result.rows[0].id;
}

export default pool;