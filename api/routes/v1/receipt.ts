import { htmlReceipt, imageReceipt, ReceiptContent, ReceiptStyle } from "../../lib/receipt.ts";
import { defaultReceiptContentExample, exampleTemplates } from "../../lib/example.ts";

export type Payload = {
    template?: 'default';
    output?: 'html' | 'pdf' | 'image' | 'png' | 'jpeg' | 'jpg';
    content: ReceiptContent
    style?: ReceiptStyle
}

export async function handleReceiptExample(req: Request) {
    const params = new URL(req.url).searchParams;
    const template = params.get('template') || 'default';

    const { content, style } = exampleTemplates[template] || defaultReceiptContentExample;

    const html = await htmlReceipt(content, style, template); // generate your dynamic HTML

    return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" },
    });
}

export async function handleReceipt(req: Request) {
    let body: Payload;
    try {
        body = await req.json(); // Parse the body as JSON
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return new Response(JSON.stringify({ error: "Invalid JSON format." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const output = body.output || "html"; // Default to "html" if not provided

    console.log(body);

    switch (output) {
        case "pdf":
            return await handleReceiptPDF(body);
        case "image":
        case "png":
            return await handleReceiptImage(body, "png");
        case "jpeg":
        case "jpg":
            return await handleReceiptImage(body, "jpeg");
        case "html":
            return handleReceiptHTML(body);
        default:
            return handleReceiptHTML(body);
    }
}


export async function handleReceiptHTML(body: Payload) {
    const html = await htmlReceipt(body.content, body.style, body.template); // generate your dynamic HTML

    return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" },
    });
}


export async function handleReceiptImage(body: Payload, format: string = 'png') {
    const imageBuffer = await imageReceipt(body.content, body.style, body.template, format); // generate your dynamic HTML

    return new Response(imageBuffer, {
        status: 200,
        headers: {
            "Content-Type": `image/${format}`,
            "Content-Disposition": `inline; filename=receipt.${format}`,
        },
    });
}

export async function handleReceiptPDF(body: Payload) {
    const pdfBuffer = await htmlReceipt(body.content, body.style, body.template); // generate your dynamic HTML

    return new Response(pdfBuffer, {
        status: 200,
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline; filename=receipt.pdf",
        },
    });
}