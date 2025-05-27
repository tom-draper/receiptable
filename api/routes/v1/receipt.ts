import { htmlReceipt, imageReceipt, pdfReceipt, ReceiptContent, ReceiptStyle } from "../../lib/receipt.ts";
import { defaultReceiptContentExample, exampleTemplates } from "../../lib/example.ts";

export type Payload = {
    template?: 'default';
    output?: 'html' | 'pdf' | 'image' | 'png' | 'jpeg' | 'jpg';
    content: ReceiptContent;
    style?: ReceiptStyle;
};

type OutputFormat = 'html' | 'pdf' | 'png' | 'jpeg';

const outputMappings: Record<string, OutputFormat> = {
    'html': 'html',
    'pdf': 'pdf',
    'image': 'png',
    'png': 'png',
    'jpeg': 'jpeg',
    'jpg': 'jpeg'
};

const contentTypes: Record<OutputFormat, string> = {
    'html': 'text/html',
    'pdf': 'application/pdf',
    'png': 'image/png',
    'jpeg': 'image/jpeg'
};

export async function handleReceiptExample(req: Request): Promise<Response> {
    const params = new URL(req.url).searchParams;
    const template = params.get('template') || 'default';
    const outputParam = params.get('output') || 'html';

    const { content, style } = exampleTemplates[template] || defaultReceiptContentExample;

    const payload: Payload = {
        content,
        style,
        template: template as 'default',
        output: outputParam as Payload['output']
    };

    return await generateReceiptResponse(payload);
}

export async function handleReceipt(req: Request): Promise<Response> {
    let payload: Payload;
    
    try {
        payload = await req.json();
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return createErrorResponse("Invalid JSON format.", 400);
    }

    console.log(payload);
    return await generateReceiptResponse(payload);
}

async function generateReceiptResponse(payload: Payload): Promise<Response> {
    const outputFormat = normalizeOutputFormat(payload.output);
    
    try {
        switch (outputFormat) {
            case 'html':
                return await createHTMLResponse(payload);
            case 'pdf':
                return await createPDFResponse(payload);
            case 'png':
            case 'jpeg':
                return await createImageResponse(payload, outputFormat);
            default:
                return await createHTMLResponse(payload);
        }
    } catch (error) {
        console.error(`Error generating ${outputFormat} receipt:`, error);
        return createErrorResponse(`Failed to generate ${outputFormat} receipt.`, 500);
    }
}

function normalizeOutputFormat(output?: string): OutputFormat {
    if (!output) {
        return 'html';
    }
    return outputMappings[output.toLowerCase()] || 'html';
}

async function createHTMLResponse(payload: Payload): Promise<Response> {
    const html = await htmlReceipt(payload.content, payload.style, payload.template);
    
    return new Response(html, {
        status: 200,
        headers: { "Content-Type": contentTypes.html }
    });
}

async function createImageResponse(payload: Payload, format: 'png' | 'jpeg'): Promise<Response> {
    const imageBuffer = await imageReceipt(payload.content, payload.style, payload.template, format);
    
    return new Response(imageBuffer, {
        status: 200,
        headers: {
            "Content-Type": contentTypes[format],
            "Content-Disposition": `inline; filename=receipt.${format}`
        }
    });
}

async function createPDFResponse(payload: Payload): Promise<Response> {
    const pdfBuffer = await pdfReceipt(payload.content, payload.style, payload.template);
    
    return new Response(pdfBuffer, {
        status: 200,
        headers: {
            "Content-Type": contentTypes.pdf,
            "Content-Disposition": "inline; filename=receipt.pdf"
        }
    });
}

function createErrorResponse(message: string, status: number): Response {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { "Content-Type": "application/json" }
    });
}