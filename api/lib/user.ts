import db from "./db.ts";

export function createNewUser() {
    const uuid = crypto.randomUUID();
    try {
        db.query("INSERT INTO users (user_id) VALUES (?)", [uuid]);
        const result = [...db.query("SELECT last_insert_rowid()")];
        const count = result[0][0];
        return { uuid, count };
    } catch (error) {
        console.error("Error inserting user into database:", error);
        throw new Error("Failed to create user");
    }
}
