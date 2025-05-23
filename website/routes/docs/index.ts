import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
    GET(_) {
        return new Response(null, {
            status: 307, // or 308 for permanent redirect
            headers: {
                Location: "/docs/v1",
            },
        });
    },
};