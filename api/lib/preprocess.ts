import { getDefaultStyle } from "./style.ts";
import { ReceiptContent, ReceiptStyle } from "./receipt.ts";

type ProcessedReceiptData = {
    content: ReceiptContent;
    style: ReceiptStyle;
}

// Pre-process receipt data before passing to template
export function prepareReceiptData(content: ReceiptContent, format: ReceiptStyle = {}) {
    const receiptData: Partial<ProcessedReceiptData> & {
        content: ReceiptContent;
        format: ReceiptStyle;
    } = { content, style: format };

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
        borderRadius: format?.borderRadius || defaultFormat.borderRadius,
        fontFamily: format?.fontFamily || defaultFormat.fontFamily,
        fontSize: format?.fontSize || defaultFormat.fontSize,
        lineSpacing: format?.lineSpacing || defaultFormat.lineSpacing,
        backgroundColor: format?.backgroundColor || defaultFormat.backgroundColor,
        color: format?.color || defaultFormat.color,
        barcodeColor: format?.barcodeColor || defaultFormat.barcodeColor,
        qrCodeColor: format?.qrCodeColor || defaultFormat.qrCodeColor,
        borderColor: format?.borderColor || defaultFormat.borderColor,
        width: format?.width || defaultFormat.width
    };

    return receiptData;
}
