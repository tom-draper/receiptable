import handlebars from "npm:handlebars";
import barcodeSvg from "./barcode.ts";
import qrCodeSvg from "./qrcode.ts";
import { fontTags } from "./fonts.ts";

function getSubtotal(items: Array<{ price: number; quantity: number; discount?: number }>) {
	if (!items || items.length === 0) {
		return 0;
	}

	return items.reduce((sum: number, item) => {
		const itemTotal = item.price * item.quantity;
		const discount = item.discount || 0;
		return sum + (itemTotal - discount);
	}, 0);
}


export function registerHelpers() {
	// Register custom Handlebars helpers
	handlebars.registerHelper('formatCurrency', function (value: number, currency: string = 'usd', showSymbol: boolean = true) {
		if (value === undefined) {
			return "N/A";
		}

		// Currency configuration object with format specifications
		const currencyFormats: Record<string, { symbol: string, decimals: number, symbolPosition: 'prefix' | 'suffix' }> = {
			usd: { symbol: '$', decimals: 2, symbolPosition: 'prefix' },
			eur: { symbol: '€', decimals: 2, symbolPosition: 'suffix' },
			gbp: { symbol: '£', decimals: 2, symbolPosition: 'prefix' },
			jpy: { symbol: '¥', decimals: 0, symbolPosition: 'prefix' },
			aud: { symbol: 'A$', decimals: 2, symbolPosition: 'prefix' },
			cad: { symbol: 'C$', decimals: 2, symbolPosition: 'prefix' },
			chf: { symbol: 'CHF', decimals: 2, symbolPosition: 'prefix' },
			cny: { symbol: '¥', decimals: 2, symbolPosition: 'prefix' },
			inr: { symbol: '₹', decimals: 2, symbolPosition: 'prefix' },
			rub: { symbol: '₽', decimals: 2, symbolPosition: 'prefix' },
			brl: { symbol: 'R$', decimals: 2, symbolPosition: 'prefix' },
			mxn: { symbol: 'MX$', decimals: 2, symbolPosition: 'prefix' },
			sgd: { symbol: 'S$', decimals: 2, symbolPosition: 'prefix' },
			hkd: { symbol: 'HK$', decimals: 2, symbolPosition: 'prefix' },
			krw: { symbol: '₩', decimals: 0, symbolPosition: 'prefix' },
			sek: { symbol: 'kr', decimals: 2, symbolPosition: 'prefix' },
			nzd: { symbol: 'NZ$', decimals: 2, symbolPosition: 'prefix' },
			aed: { symbol: 'د.إ', decimals: 2, symbolPosition: 'prefix' },
			dkk: { symbol: 'kr', decimals: 2, symbolPosition: 'prefix' },
			nok: { symbol: 'kr', decimals: 2, symbolPosition: 'prefix' },
			pln: { symbol: 'zł', decimals: 2, symbolPosition: 'prefix' },
			try: { symbol: '₺', decimals: 2, symbolPosition: 'prefix' },
			thb: { symbol: '฿', decimals: 2, symbolPosition: 'prefix' },
			zar: { symbol: 'R', decimals: 2, symbolPosition: 'prefix' },
			myr: { symbol: 'RM', decimals: 2, symbolPosition: 'prefix' }
		};

		// Default to USD if currency is not found
		const currencyCode = currency.toLowerCase();
		const format = currencyFormats[currencyCode] || currencyFormats.usd;

		// Format the value with the correct decimal places
		const formattedValue = value.toFixed(format.decimals);

		// Return formatted string with or without symbol
		if (!showSymbol) {
			return formattedValue;
		}

		return format.symbolPosition === 'prefix'
			? `${format.symbol}${formattedValue}`
			: `${formattedValue}${format.symbol}`;
	});

	handlebars.registerHelper('formatDate', function (date: string | number | Date) {
		if (!date) {
			return "";
		}

		// You can customize date formatting as needed
		const dateObj = new Date(date);
		return dateObj.toLocaleDateString();
	});

	// Example of a conditional helper
	handlebars.registerHelper('isDiscounted', function (discount: number, options) {
		return discount && discount > 0 ? options.fn(this) : options.inverse(this);
	});

	handlebars.registerHelper('hasItems', function (items) {
		return items && items.length > 0;
	});

	handlebars.registerHelper('hasCustomer', function (customer) {
		return customer && (customer.name || customer.address || customer.phone || customer.email);
	});

	handlebars.registerHelper('hasPaymentDetails', function (paymentDetails) {
		return paymentDetails && (paymentDetails.cardType && paymentDetails.lastFour);
	});

	handlebars.registerHelper('fontTag', function (font: string) {
		return fontTags[font] ? fontTags[font] : '';
	});

	handlebars.registerHelper('font', function (font: string) {
		if (font !== 'monospace' && font in fontTags) {
			return `"${font}", monospace`
		} else {
			return font;
		}
	});

	handlebars.registerHelper('barcodeSvg', function (barcode: string, color: string = '#000000', height: number = 70) {
		if (!barcode) {
			return "";
		}
		return barcodeSvg(barcode, { color, height });
	});

	handlebars.registerHelper('qrCodeSvg', function (qrCode: string, color: string = '#000000', width: number = 40) {
		if (!qrCode) {
			return "";
		}
		return qrCodeSvg({ msg: qrCode, pal: [color], dim: width || 40 });
	});

	handlebars.registerHelper('fallback', function (primary, fallback) {
		return primary || fallback;
	});

	handlebars.registerHelper('multiply', function (n1: number, n2: number) {
		if (isNaN(n1) || isNaN(n2)) {
			return 0;
		}
		return n1 * n2;
	});

	handlebars.registerHelper('dashLine', function (width: number) {
		const line = '-'.repeat(width);
		return new handlebars.SafeString(line);
	});

	handlebars.registerHelper('starLine', function (width: number) {
		const line = '*'.repeat(width);
		return new handlebars.SafeString(line);
	});

	handlebars.registerHelper('line', function (width: number, char: string) {
		const line = char.repeat(width);
		return new handlebars.SafeString(line);
	});

	handlebars.registerHelper('totalPrice', function (item: { price: number; quantity: number; discount?: number }) {
		const { price, quantity } = item;
		return price * quantity;
	});

	handlebars.registerHelper('subtotal', function (items: Array<{ price: number; quantity: number; discount?: number }>) {
		return getSubtotal(items);
	});

	handlebars.registerHelper('grayscaleFilterCSS', function (show: boolean) {
		return show ? 'filter: grayscale(100%);' : '';
	});

	handlebars.registerHelper('footerFontSizeCSS', function (fontSize: number) {
		return fontSize ? `font-size: ${fontSize - 2}px;` : '';
	});

	handlebars.registerHelper('barcodeFontSizeCSS', function (fontSize: number) {
		return fontSize ? `font-size: ${fontSize - 3}px;` : '';
	});

	handlebars.registerHelper('receiptBorderCSS', function (color: string) {
		return color ? `border: 1px solid ${color};` : '';
	});

	handlebars.registerHelper('total', function (items: Array<{ price: number; quantity: number; discount?: number }>, tax: { rate?: number; amount?: number }, tip: number) {
		if (!items || items.length === 0) {
			return 0;
		}

		const subtotal = getSubtotal(items);

		let total = subtotal;

		if (tax && tax.amount) {
			total += tax.amount;
		} else if (tax && tax.rate) {
			total += subtotal * (tax.rate / 100);
		}

		if (tip) {
			total += tip;
		}

		return total;
	});

	handlebars.registerHelper('taxAmount', function (items: Array<{ price: number; quantity: number; discount?: number }>, tax: { rate?: number; amount?: number }) {
		if (!items || items.length === 0) {
			return 0;
		}

		const subtotal = getSubtotal(items);

		if (tax && tax.amount) {
			return tax.amount;
		} else if (tax && tax.rate) {
			return subtotal * (tax.rate / 100);
		}

		return 0;
	});

	// Helper to check if a string is a valid hex color
	handlebars.registerHelper('isHexColor', function (color) {
		if (typeof color !== 'string') return false;
		return /^#([A-Fa-f0-9]{3}){1,2}$/.test(color);
	});

	// Helper to check if a value is a number
	handlebars.registerHelper('isNumber', function (value) {
		return !isNaN(parseFloat(value)) && isFinite(value);
	});

	// Helper to lighten a hex color by specified percentage
	handlebars.registerHelper('lightenColor', function (color, percentage) {
		if (typeof color !== 'string' || !color.startsWith('#')) {
			return color; // Return unchanged if not a hex color
		}

		try {
			// Parse the hex color
			let hex = color.replace('#', '');

			// Convert to RGB
			let r, g, b;
			if (hex.length === 3) {
				r = parseInt(hex[0] + hex[0], 16);
				g = parseInt(hex[1] + hex[1], 16);
				b = parseInt(hex[2] + hex[2], 16);
			} else {
				r = parseInt(hex.substring(0, 2), 16);
				g = parseInt(hex.substring(2, 4), 16);
				b = parseInt(hex.substring(4, 6), 16);
			}

			// Calculate lighter values
			const percent = parseInt(percentage) || 10; // Default to 10% if percentage is invalid
			r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
			g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
			b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

			// Convert back to hex
			const toHex = (c) => {
				const hex = c.toString(16);
				return hex.length === 1 ? '0' + hex : hex;
			};

			return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
		} catch (e) {
			console.error('Error in lightenColor helper:', e);
			return color; // Return original color on error
		}
	});

	// Helper to format percentage displays for discounts
	handlebars.registerHelper('formatPercentage', function (value, currency) {
		if (isNaN(parseFloat(value))) {
			return 'SALE';
		}

		const numValue = parseFloat(value);

		// If it's already a percentage (0-100 range)
		if (numValue <= 100) {
			return `SAVE ${numValue}%`;
		}

		// If it's a currency amount
		return `SAVE ${currency || '$'}${numValue.toFixed(2)}`;
	});

	// Helper for regex testing
	handlebars.registerHelper('regexTest', function (pattern, subject) {
		const regex = new RegExp(pattern);
		return regex.test(subject);
	});
}