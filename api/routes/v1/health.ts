export function handleHealthCheck(): Response {
    // Create a JSON response with status information
    const healthData = {
        status: "ok",
        timestamp: new Date().toISOString(),
        service: "charming-receipts",
        version: "1.0.0",
    };

    // Return the health status with a 200 OK status code
    return new Response(JSON.stringify(healthData, null, 2), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
        },
    });
}