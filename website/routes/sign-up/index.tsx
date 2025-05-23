import { Navigation } from "../../components/Navigation.tsx";
import { Handlers } from "$fresh/server.ts";
import { serverUrl } from "../../lib/consts.ts";


export const handler: Handlers = {
    async GET(_, ctx) {
        // Perform server-side fetch to get UUID
        const data: { uuid: string | null, count: number | null } = { uuid: null, count: null };
        try {
            // const url = Deno.env.get("ENV") === "development" ? "http://localhost:8000/api/v1/user" : "https://receiptable.dev/api/v1/user";
            const response = await fetch(serverUrl + "/api/v1/user", {
                method: "POST",
            });

            if (response.ok) {
                const body = await response.json();
                data.uuid = body.uuid;
                data.count = body.count;
            }
        } catch (error) {
            console.log("Error fetching UUID:", error);
        }

        // Pass the UUID to the component as a prop
        return ctx.render(data);
    },
};

interface UserPageProps {
    data: {
        uuid: string | null;
        count: number | null;
    }
}

export default function UserPage({ data }: UserPageProps) {
    const { uuid, count } = data;
    return (
        <div>
            <Navigation />

            <div class="p-4 min-h-[80vh] flex items-center justify-center">
                <div style="width: 43ch; max-width: 43ch; padding: 1.5rem; font-family: monospace; background: white; border-radius: 4px; color: #484848; font-size: 14px; line-height: 1.4; word-wrap: break-word; box-sizing: content-box;">
                    <div style="text-align: center; margin-bottom: 10px;">
                        <h1 style="margin: 0; font-size: 1.5em;">User #{count}</h1>
                        {/* <p style="margin: 4px 0;">New User</p> */}
                    </div>

                    <div style="text-align: center; margin-bottom: 10px;">
                        {/* <!-- SVG Barcode --> */}
                        <div style="margin: 15px 0; text-align: center; place-items: center;">
                            <svg width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
                                {/* <!-- UPC/EAN style barcode representation --> */}
                                <rect x="10" y="5" width="2" height="40" fill="black" />
                                <rect x="14" y="5" width="1" height="40" fill="black" />
                                <rect x="17" y="5" width="3" height="40" fill="black" />
                                <rect x="22" y="5" width="2" height="40" fill="black" />
                                <rect x="26" y="5" width="1" height="40" fill="black" />
                                <rect x="30" y="5" width="3" height="40" fill="black" />
                                <rect x="35" y="5" width="1" height="40" fill="black" />
                                <rect x="38" y="5" width="2" height="40" fill="black" />
                                <rect x="42" y="5" width="3" height="40" fill="black" />
                                <rect x="47" y="5" width="1" height="40" fill="black" />
                                <rect x="50" y="5" width="2" height="40" fill="black" />
                                <rect x="54" y="5" width="3" height="40" fill="black" />
                                <rect x="60" y="5" width="1" height="40" fill="black" />
                                <rect x="63" y="5" width="3" height="40" fill="black" />
                                <rect x="68" y="5" width="2" height="40" fill="black" />
                                <rect x="72" y="5" width="1" height="40" fill="black" />
                                <rect x="75" y="5" width="3" height="40" fill="black" />
                                <rect x="80" y="5" width="2" height="40" fill="black" />
                                <rect x="84" y="5" width="1" height="40" fill="black" />
                                <rect x="87" y="5" width="3" height="40" fill="black" />
                                <rect x="92" y="5" width="2" height="40" fill="black" />
                                <rect x="96" y="5" width="3" height="40" fill="black" />
                                <rect x="101" y="5" width="1" height="40" fill="black" />
                                <rect x="105" y="5" width="2" height="40" fill="black" />
                                <rect x="110" y="5" width="1" height="40" fill="black" />
                                <rect x="114" y="5" width="3" height="40" fill="black" />
                                <rect x="119" y="5" width="2" height="40" fill="black" />
                                <rect x="123" y="5" width="1" height="40" fill="black" />
                                <rect x="126" y="5" width="2" height="40" fill="black" />
                                <rect x="130" y="5" width="3" height="40" fill="black" />
                                <rect x="135" y="5" width="1" height="40" fill="black" />
                                <rect x="138" y="5" width="2" height="40" fill="black" />
                                <rect x="142" y="5" width="3" height="40" fill="black" />
                                <rect x="148" y="5" width="1" height="40" fill="black" />
                                <rect x="151" y="5" width="1" height="40" fill="black" />
                                <rect x="154" y="5" width="2" height="40" fill="black" />
                                <rect x="158" y="5" width="3" height="40" fill="black" />
                                <rect x="163" y="5" width="1" height="40" fill="black" />
                                <rect x="166" y="5" width="2" height="40" fill="black" />
                                <rect x="170" y="5" width="3" height="40" fill="black" />
                                <rect x="175" y="5" width="2" height="40" fill="black" />
                                <rect x="180" y="5" width="1" height="40" fill="black" />
                                <rect x="183" y="5" width="3" height="40" fill="black" />
                                <rect x="188" y="5" width="2" height="40" fill="black" />
                            </svg>
                            {/* <p style="margin: 4px 0; font-size: 11px;">8675309-04252025</p> */}
                            {/* <div style="font-size: 14px; margin-top: 1em;"> */}

                            <p style="margin: 4px 0; font-size: 14px;">
                                {uuid || "Error: Failed to generate API key"}
                            </p>
                        </div>
                        <div style="font-size: 12px; margin-top: 0.5em;">
                            Make a note of your API key above.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}