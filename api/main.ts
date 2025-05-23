import { handleReceiptExample, handleReceipt } from "./routes/v1/receipt.ts";
import { handleHealthCheck } from "./routes/v1/health.ts";
import { createNewUser } from "./lib/user.ts";
import { isValidUser } from "./lib/auth.ts";
import { isRateLimited } from "./lib/ratelimit.ts";

// CORS configuration
const CORS_HEADERS = {
	"Access-Control-Allow-Origin": "*", // Allow requests from any origin
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allowed methods
	"Access-Control-Allow-Headers": "Content-Type, X-AUTH-TOKEN", // Allowed headers
	"Access-Control-Max-Age": "86400", // Cache preflight requests for 24 hours
};

// Handle preflight requests (OPTIONS)
function handleOptions() {
	return new Response(null, {
		status: 204, // No content
		headers: CORS_HEADERS,
	});
}

// Add CORS headers to any response
function addCorsHeaders(response: Response): Response {
	const headers = new Headers(response.headers);

	Object.entries(CORS_HEADERS).forEach(([key, value]) => {
		headers.set(key, value);
	});

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}

// Handle POST requests and other routes
function handler(req: Request) {
	const userID = req.headers.get("X-AUTH-TOKEN") || req.headers.get("X-FORWARDED-FOR") || "unknown";

	// Handle OPTIONS requests for CORS preflight
	if (req.method === "OPTIONS") {
		return handleOptions();
	}

	// Rate limiter layer
	// if (isRateLimited(userID)) {
	// 	return addCorsHeaders(new Response("Too Many Requests", {
	// 		status: 429,
	// 		headers: { "content-type": "text/plain" },
	// 	}));
	// }

	// Handle request methods
	switch (req.method) {
		case "POST":
			return handlePost(req).then(addCorsHeaders);
		case "GET":
			return handleGet(req).then(addCorsHeaders);
		default:
			return addCorsHeaders(new Response("Method Not Allowed", {
				status: 405,
				headers: { "content-type": "text/plain" },
			}));
	}
}

async function handlePost(req: Request) {
	const url = new URL(req.url);

	switch (url.pathname) {
		case "/api/v1/receipt": {
			const token = req.headers.get("X-AUTH-TOKEN");
			if (!token || !isValidUser(token)) {
				return new Response("Unauthorized", { status: 401 });
			}

			return await handleReceipt(req);
		}

		case "/api/v1/user": {
			try {
				const { uuid, count } = createNewUser();
				return new Response(JSON.stringify({ uuid, count }), {
					status: 201,
					headers: { "Content-Type": "application/json" },
				});
			} catch (error) {
				console.error("Error creating new user:", error);
				return new Response("Internal Server Error", {
					status: 500,
					headers: { "content-type": "text/plain" },
				});
			}
		}

		default:
			return new Response("Not Found", {
				status: 404,
				headers: { "content-type": "text/plain" },
			});
	}
}

async function handleGet(req: Request) {
	const url = new URL(req.url);

	switch (url.pathname) {
		case "/api/v1/receipt":
		case "/api/receipt": {
			// const token = req.headers.get("X-AUTH-TOKEN");
			// if (!token || !isValidUser(token)) {
			// 	return new Response("Unauthorized", { status: 401 });
			// }

			return await handleReceiptExample(req); // For default receipt route
		}

		case "/api/health":
		case "/api/status":
			return handleHealthCheck();

		default:
			return new Response("Not Found", {
				status: 404,
				headers: { "content-type": "text/plain" },
			});
	}
}

// For local development
if (import.meta.main) {
	const port = parseInt(Deno.env.get("PORT") || "8000");
	Deno.serve({ port }, handler);
}

export default handler;