import { ReceiptStyle } from "./receipt.ts";

export function getDefaultStyle(): Required<ReceiptStyle> {
    return {
        borderRadius: 2,
        fontFamily: "monospace",
        fontSize: 14,
        footerFontSize: 12,
        barcodeFontSize: 11,
        lineSpacing: 1.4,
        backgroundColor: "#ffffff",
        color: "#484848",
        barcodeColor: "#484848",
        qrCodeColor: "#484848",
        borderColor: "",
        width: 43,
    };
}