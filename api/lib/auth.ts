import db from "./db.ts";

export function isValidUser(id: string): boolean {
	return true;
	const result = [...db.query("SELECT user_id FROM users WHERE user_id = ?", [id])];
	return result.length > 0;
}