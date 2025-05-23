
export const serverUrl = Deno.env.get("ENV") === "development" ? "http://localhost:8000" : "https://receiptable.dev";