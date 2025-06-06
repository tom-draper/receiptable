import { getDefaultStyle } from "./style.ts";
import { ReceiptContent, ReceiptStyle } from "./receipt.ts";

type ProcessedReceiptData = {
    content: Required<ReceiptContent>;
    style: Required<ReceiptStyle>;
}

const DEFAULT_BARCODE_CONFIG = {
    showBarcode: true,
    barcodeHeight: 40,
    qrCodeWidth: 40,
} as const;

function applyBarcodeDefaults(content: ReceiptContent): void {
    if (!content.barcode) return;

    const { barcode, qrCode } = content.barcode;

    if (barcode && content.barcode.showBarcode === undefined) {
        content.barcode.showBarcode = DEFAULT_BARCODE_CONFIG.showBarcode;
    }
    
    if (barcode && content.barcode.barcodeHeight === undefined) {
        content.barcode.barcodeHeight = DEFAULT_BARCODE_CONFIG.barcodeHeight;
    }
    
    if (qrCode && content.barcode.qrCodeWidth === undefined) {
        content.barcode.qrCodeWidth = DEFAULT_BARCODE_CONFIG.qrCodeWidth;
    }
}

function mergeStyles(userStyle: ReceiptStyle, defaultStyle: Required<ReceiptStyle>): Required<ReceiptStyle> {
    return {
        borderRadius: userStyle.borderRadius ?? defaultStyle.borderRadius,
        fontFamily: userStyle.fontFamily ?? defaultStyle.fontFamily,
        fontSize: userStyle.fontSize ?? defaultStyle.fontSize,
        footerFontSize: userStyle.footerFontSize ?? defaultStyle.footerFontSize,
        barcodeFontSize: userStyle.barcodeFontSize ?? defaultStyle.barcodeFontSize,
        lineSpacing: userStyle.lineSpacing ?? defaultStyle.lineSpacing,
        backgroundColor: userStyle.backgroundColor ?? defaultStyle.backgroundColor,
        color: userStyle.color ?? defaultStyle.color,
        barcodeColor: userStyle.barcodeColor ?? defaultStyle.barcodeColor,
        qrCodeColor: userStyle.qrCodeColor ?? defaultStyle.qrCodeColor,
        borderColor: userStyle.borderColor ?? defaultStyle.borderColor,
        width: userStyle.width ?? defaultStyle.width,
    };
}

/**
 * Pre-processes receipt data by applying default values for missing properties
 */
export function prepareReceiptData(
    content: ReceiptContent, 
    style: ReceiptStyle = {}
): ProcessedReceiptData {
    // Apply barcode defaults in-place
    applyBarcodeDefaults(content);
    
    // Merge user style with defaults
    const processedStyle = mergeStyles(style, getDefaultStyle());
    
    return {
        content: content as Required<ReceiptContent>,
        style: processedStyle,
    };
}