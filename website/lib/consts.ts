
export const serverUrl = Deno.env.get("DENO_ENV") === "development" ? "http://localhost:8000" : "https://receiptable.dev";