import { ReceiptContent, ReceiptData } from "./receipt.ts";

export const defaultReceiptContentExample: ReceiptData = {
    content: {
        store: {
            "name": "COFFEE & BAKERY CO.",
            "address": "123 Main Street, Anytown, CA 94105",
            "phone": "(555) 123-4567",
            "website": "www.coffeebakery.com",
        },
        orderNumber: "ORD-2025-04567",
        date: "April 24, 2025",
        time: "10:35 AM",
        cashier: "Emma S.",
        customer: {
            name: "John Doe",
            email: "john@example.com",
        },
        items: [
            {
                name: "Cappuccino (Large)",
                quantity: 2,
                price: 4.95,
            },
            {
                name: "Avocado Toast",
                quantity: 1,
                price: 8.75,
                discount: 1.5,
            },
        ],
        tax: {
            rate: 8.5,
        },
        tip: 4.0,
        paymentMethod: "Credit Card",
        paymentDetails: {
            cardType: "Visa",
            lastFour: "4321",
        },
        barcode: {
            barcode: "28675309-04252025"
        },
        thankYou: "Thank you for your purchase!",
        footer: [
            "Rewards Points Earned: 25",
            "Visit our website for monthly specials!",
            "Receipt ID: TXN-25698-042425",
        ]
    },
    style: {}
};


export const barcodeReceiptContentExample: ReceiptData = {
    content: {
        store: {
            "name": "COFFEE & BAKERY CO.",
            "address": "123 Main Street, Anytown, CA 94105",
            "phone": "(555) 123-4567",
            "website": "www.coffeebakery.com",
        },
        barcode: {
            qrCode: "https://receiptable.dev/api/v1/receipt/barcode",
        },
        info: [
            "Organic Coffee - Locally Sourced",
            "Open Mon-Fri: 7am-7pm, Sat-Sun: 8am-5pm",
            "WiFi password: coffee123"
        ],
        footer: [
            "Rewards Points Earned: 25",
            "Visit our website for monthly specials!",
            "Receipt ID: TXN-25698-042425",
        ]
    },
    style: {}
}

export const ticketReceiptContentExample: ReceiptData = {
    content: {
        store: {
            "name": "COFFEE & BAKERY CO.",
            "address": "123 Main Street, Anytown, CA 94105",
            "phone": "(555) 123-4567",
            "website": "www.coffeebakery.com",
            image: {
                url: "https://www.citypng.com/public/uploads/preview/brown-coffee-cup-logo-design-hd-png-701751694776791z8t9jck4mz.png",
                width: 60
            }
        },
        barcode: {
            barcode: "28675309-04252",
        },
        info: [
            "Organic Coffee - Locally Sourced",
            "Open Mon-Fri: 7am-7pm, Sat-Sun: 8am-5pm",
            "WiFi password: coffee123"
        ],
        footer: [
            "Rewards Points Earned: 25",
            "Visit our website for monthly specials!",
            "Receipt ID: TXN-25698-042425",
        ]
    },
    style: {
        width: 72
    }
}

export const exampleTemplates = {
    default: defaultReceiptContentExample,
    barcode: barcodeReceiptContentExample,
    ticket: ticketReceiptContentExample,
}