import { assertEquals } from "@std/assert";
import handler from "./main.ts"; // Import the handler function directly

// Test the home page route
Deno.test(async function serverFetchHomePage() {
	const req = new Request("https://deno.land/");
	const res = await handler(req); // Call the handler directly
	assertEquals(await res.text(), "Welcome to my Deno web server!");
	assertEquals(res.status, 200);
	assertEquals(res.headers.get("content-type"), "text/plain");
});

// Test the /api/hello route
Deno.test(async function serverFetchHelloAPI() {
	const req = new Request("https://deno.land/api/hello");
	const res = await handler(req); // Call the handler directly
	const jsonResponse = await res.json();
	assertEquals(jsonResponse.message, "Hello, World!");
	assertEquals(res.status, 200);
	assertEquals(res.headers.get("content-type"), "application/json");
});

// Test the /about route
Deno.test(async function serverFetchAbout() {
	const req = new Request("https://deno.land/about");
	const res = await handler(req); // Call the handler directly
	assertEquals(
		await res.text(),
		"This is a Deno web server that can be deployed to Vercel or run locally.",
	);
	assertEquals(res.status, 200);
	assertEquals(res.headers.get("content-type"), "text/plain");
});

// Test a 404 Not Found route
Deno.test(async function serverFetchNotFound() {
	const req = new Request("https://deno.land/404");
	const res = await handler(req); // Call the handler directly
	assertEquals(res.status, 404);
	assertEquals(await res.text(), "Not Found");
	assertEquals(res.headers.get("content-type"), "text/plain");
});
