import { useEffect, useState } from "preact/hooks";

function getDateCode() {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

    const formattedDate = `${day}${month}${year}`;
    return formattedDate;
}

function formatCurrentTime() {
    return (new Date()).toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).replace(/am|pm/, match => match.toUpperCase());
}

function formatCurrentDate() {
    return (new Date()).toLocaleDateString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });
}

export default function NavigationV1() {
    // Use useState for orderNumber to prevent regeneration on every render
    const [orderNumber] = useState(Math.floor(100000 + Math.random() * 900000));
    const [currentTime, setCurrentTime] = useState(formatCurrentTime());
    // Move date to useState to prevent recalculation on each render
    const [date] = useState(formatCurrentDate());
    // Use useState for dateCode too
    const [dateCode] = useState(getDateCode());

    // Set up interval to update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(formatCurrentTime());
        }, 1000);

        // Clean up interval on component unmount
        return () => clearInterval(timer);
    }, []);

    return (
        <nav class="fixed h-screen bg-white overflow-y-auto hide-scrollbar">
            <div style="width: 43ch; padding: 1.5rem; font-family: monospace; background: white; border-radius: 4px; color: #484848; font-size: 14px; line-height: 1.4; word-wrap: break-word; box-sizing: content-box;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="margin: 0; font-size: 1.5em;">Docs v1</h1>
                    <p style="margin: 4px 0;"><a class="cursor-pointer" href="/">Receiptable API</a></p>
                    <p style="margin: 4px 0;"><a class="cursor-pointer" href="/">www.receiptable.dev</a></p>
                </div>

                <div style="margin: 15px 0;">
                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <div>Order #: {orderNumber}</div>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <div>Date: {date}</div>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <div>Time: {currentTime}</div>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <div>Cashier: Tom</div>
                    </div>
                </div>

                <div style="margin: 15px 0;">
                    <p style="margin: 0;">-------------------------------------------</p>
                    <div style="display: flex; justify-content: space-between; font-weight: bold; margin: 8px 0;">
                        <div>Item</div>
                    </div>
                    <p style="margin: 0; text-align: center;">-------------------------------------------</p>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 1ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#base-structure">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">Base structure</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 1ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#content">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">Content</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 3ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#customers">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">Customers</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 3ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#items">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">Items</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 3ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#tax">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">Tax</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 3ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#payment-details">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">Payment Details</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 3ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#barcodes">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">Barcodes</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 1ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#style">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">Style</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 1ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#templates">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">Templates</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 1ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#examples">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">Examples</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 3ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#json-payload">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">JSON Payload</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 3ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#api-request">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">API Request</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 5ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#node.js">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">Node.js</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 5ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#python">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">Python</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 5ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#c%23">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">C#</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 5ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#curl">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">cURL</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 3ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#embedding">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">Embedding</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 5ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#express">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">Express</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 5ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#next.js">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">Next.js</span>
                        </a>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                        <a style="display: flex; margin-left: 5ch; justify-content: space-between; cursor-pointer" class="relative group cursor-pointer" href="/docs/v1#sendgrid">
                            <span class="invisible group-hover:visible absolute right-full">*</span>
                            <span class="ml-[1ch]">SendGrid</span>
                        </a>
                    </div>

                    <p style="margin: 0; text-align: center;">-------------------------------------------</p>
                </div>

                {/* <!-- SVG Barcode --> */}
                <div style="margin: 15px 0; text-align: center; place-items: center;">
                    <svg width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
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
                    <p style="margin: 4px 0; font-size: 11px;">{orderNumber}-{dateCode}</p>
                </div>

                <div style="margin-top: 20px; text-align: center;">
                    <p style="margin: 8px 0;">Thank you!</p>
                </div>
            </div>

        </nav>
    );
}