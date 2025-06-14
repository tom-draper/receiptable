import { loadTemplates } from "./templates.ts";
import { registerHelpers } from "./helpers.ts";
import { prepareReceiptData } from "./preprocess.ts";
import puppeteer from "puppeteer-core";
import { existsSync } from "https://deno.land/std@0.224.0/fs/exists.ts";

export type ReceiptData = {
    template?: string;
    output?: 'html' | 'pdf' | 'image' | 'png' | 'jpeg' | 'jpg';
    content: ReceiptContent;
    style?: ReceiptStyle;
}

export type ReceiptContent = {
    store?: {
        name?: string;
        image?: {
            url?: string;
            alt?: string;
            grayscale?: boolean;
            width?: number;
        };
        address?: string;
        phone?: string;
        website?: string;
        number?: string;
        vatNumber?: string;
    },
    orderNumber?: string;
    date?: string;
    time?: string;
    cashier?: string;
    paid?: boolean;
    socialMedia?: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
    };
    survey?: {
        code?: string;
        url?: string;
        info?: string;
    };
    customer?: {
        name?: string;
        address?: string;
        phone?: string;
        email?: string;
    };
    currency?: string;
    items?: Array<{
        name: string;
        quantity?: number;
        price: number;
        discount?: number;
        id?: string;
        group?: string;
        notes?: string;
    }>;
    subtotal?: number;
    tax?: {
        rate?: number;
        amount?: number;
    };
    tip?: number;
    total?: number;
    paymentMethod?: string;
    paymentDetails?: {
        cardType?: string;
        lastFour?: string;
    };
    barcode?: {
        barcode?: string;
        showBarcode?: boolean;
        barcodeHeight?: number;
        qrCode?: string;
        qrCodeWidth?: number;
    };
    thankYou?: string;
    info?: string[];
    preFooter?: string[];
    footer?: string[];
}

export type ReceiptStyle = {
    borderRadius?: number;
    fontFamily?: string;
    fontSize?: number;
    footerFontSize?: number;
    barcodeFontSize?: number;
    lineSpacing?: number;
    backgroundColor?: string;
    color?: string;
    barcodeColor?: string;
    qrCodeColor?: string;
    borderColor?: string;
    width?: number;
}


let templates = await loadTemplates();

registerHelpers();

export async function htmlReceipt(content: ReceiptContent, format: ReceiptStyle = {}, template: string = 'default') {
    if (Deno.env.get("DENO_ENV") === "development") {
        templates = await loadTemplates(); // Load templates fresh on each request in development
    }
    const processedData = prepareReceiptData(content, format);

    const compiledTemplate = templates[template];
    if (!compiledTemplate) {
        throw new Error(`Template ${template} not found`);
    }

    return compiledTemplate(processedData);
}

function findChromePath() {
    const envChromePath = Deno.env.get('CHROME_PATH');
    if (envChromePath && existsSync(envChromePath)) {
        return envChromePath;
    }

    const platform = Deno.build.os;

    const paths = {
        windows: [
            'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
        ],
        darwin: [
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
        ],
        linux: [
            // Docker-friendly paths first
            '/usr/bin/google-chrome-stable',
            '/usr/bin/google-chrome',
            '/usr/bin/chromium-browser',
            '/usr/bin/chromium'
        ]
    };

    const platformPaths = platform === 'windows' ? paths.windows :
        platform === 'darwin' ? paths.darwin : paths.linux;

    for (const path of platformPaths) {
        try {
            if (existsSync(path)) {
                return path;
            }
        } catch (error) {
            // Permission denied or other access issues - continue checking other paths
            console.warn(`Cannot access ${path}: ${error}`);
            continue;
        }
    }

    // If no Chrome installation is found
    throw new Error('Could not find Chrome installation. Please install Chrome or specify executablePath.');
}

export async function imageReceipt(content: ReceiptContent, format: ReceiptStyle = {}, template: string = 'default', imgFormat: string = 'png') {
    const html = await htmlReceipt(content, format, template);

    const args = Deno.env.get("PUPPETEER_ARGS")?.split(" ") ?? [];
    const browser = await puppeteer.launch({
        defaultViewport: null, // Don't set a fixed viewport initially
        executablePath: findChromePath(),
        args,
        headless: true
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Calculate the dimensions of the content
    const dimensions = await page.evaluate(() => {
        // Get the first div which is our receipt container
        // @ts-ignore: document is not defined in Deno
        const receiptElement = document.body.querySelector('div[style*="width"]');
        if (!receiptElement) return { width: 448, height: 600 }; // Default fallback

        const rect = receiptElement.getBoundingClientRect();
        return {
            width: Math.ceil(rect.width),
            height: Math.ceil(rect.height)
        };
    });

    // Set viewport with the calculated dimensions
    await page.setViewport({
        width: dimensions.width + 16,
        height: dimensions.height + 16,
        deviceScaleFactor: 2, // For higher resolution image
    });

    // Take screenshot of the receipt with the exact dimensions
    const imageBuffer = await page.screenshot({
        type: imgFormat,
        omitBackground: true,
        clip: {
            x: 8,
            y: 8,
            width: dimensions.width,
            height: dimensions.height
        }
    });

    await browser.close();

    return imageBuffer;
}

export async function pdfReceipt(content: ReceiptContent, format: ReceiptStyle = {}, template: string = 'default') {
    const html = await htmlReceipt(content, format, template);

    const args = Deno.env.get("PUPPETEER_ARGS")?.split(" ") ?? [];
    const browser = await puppeteer.launch({
        defaultViewport: null,
        executablePath: findChromePath(),
        args,
        headless: true
    });

    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    return pdfBuffer;
}