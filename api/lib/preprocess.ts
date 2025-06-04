import { getDefaultStyle } from "./style.ts";
import { ReceiptContent, ReceiptStyle } from "./receipt.ts";

type ProcessedReceiptData = {
    content: ReceiptContent;
    style: ReceiptStyle;
}

// Pre-process receipt data before passing to template
export function prepareReceiptData(content: ReceiptContent, style: ReceiptStyle = {}) {
    const receiptData: ProcessedReceiptData = { content, style };

    const defaultFormat = getDefaultStyle();

    if (content.barcode) {
        if (content.barcode.barcode) {
            if (content.barcode.showBarcode === undefined) {
                content.barcode.showBarcode = true;
            }
            if (content.barcode.barcodeHeight === undefined) {
                content.barcode.barcodeHeight = 40;
            }
        }
        if (content.barcode.qrCode) {
            if (content.barcode.qrCodeWidth === undefined) {
                content.barcode.qrCodeWidth = 40;
            }
        }
    }

    // Add formatting if not provided
    receiptData.style = {
        borderRadius: style?.borderRadius || defaultFormat.borderRadius,
        fontFamily: style?.fontFamily || defaultFormat.fontFamily,
        fontSize: style?.fontSize || defaultFormat.fontSize,
        footerFontSize: style?.footerFontSize || defaultFormat.footerFontSize,
        barcodeFontSize: style?.barcodeFontSize || defaultFormat.barcodeFontSize,
        lineSpacing: style?.lineSpacing || defaultFormat.lineSpacing,
        backgroundColor: style?.backgroundColor || defaultFormat.backgroundColor,
        color: style?.color || defaultFormat.color,
        barcodeColor: style?.barcodeColor || defaultFormat.barcodeColor,
        qrCodeColor: style?.qrCodeColor || defaultFormat.qrCodeColor,
        borderColor: style?.borderColor || defaultFormat.borderColor,
        width: style?.width || defaultFormat.width
    };

    return receiptData as ProcessedReceiptData;
}
