import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { ensureDir } from "https://deno.land/std/fs/mod.ts";

await ensureDir("./data");

const db = new DB("./data/users.db");

db.execute(`
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id TEXT NOT NULL UNIQUE
	);
`);

export default db;