import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, 'spellbound.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    business TEXT NOT NULL,
    industry TEXT NOT NULL,
    projectType TEXT NOT NULL,
    budget TEXT NOT NULL,
    timeline TEXT NOT NULL,
    details TEXT NOT NULL,
    inspiration TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

export function insertSubmission(data) {
    const stmt = db.prepare(`
    INSERT INTO submissions
      (name, email, business, industry, projectType, budget, timeline, details, inspiration)
    VALUES (@name, @email, @business, @industry, @projectType, @budget, @timeline, @details, @inspiration)
  `);
    const info = stmt.run(data);
    return info.lastInsertRowid;
}

export default db;