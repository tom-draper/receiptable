
import { useEffect, useRef, useState } from "preact/hooks";


// Separate form sections into individual components
const FormSection = ({ title, children, className = "" }) => (
    <div className={`mb-6 p-4 bg-white rounded-[1px] receipt-section ${className}`}>
        <h2 className="text-[16px] uppercase font-semibold mb-2 receipt-header">{title}</h2>
        {children}
    </div>
);

const FormField = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder = "",
    className = "",
    ...props
}) => (
    <div className={className}>
        <label className="block text-sm mb-1 uppercase tracking-wide">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-2 border rounded-[1px] font-mono text-sm"
            {...props}
        />
    </div>
);

const SelectField = ({ label, name, value, onChange, options, className = "" }) => (
    <div className={className}>
        <label className="block text-sm mb-1 uppercase tracking-wide">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-2 border rounded-[1px] font-mono text-sm"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

const ColorField = ({ label, name, value, onChange, className = "" }) => (
    <div className={className}>
        <label className="block text-sm mb-1 uppercase tracking-wide">{label}</label>
        <div className="flex">
            <input
                type="color"
                name={name}
                value={value}
                onChange={onChange}
                className="w-10 h-10 p-0 border rounded-[1px]"
            />
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                className="flex-1 p-2 border rounded-[1px] ml-2 font-mono text-sm"
            />
        </div>
    </div>
);

const CheckboxField = ({ label, name, checked, onChange, className = "" }) => (
    <div className={`grid place-items-end ${className}`}>
        <label className="flex items-center text-sm uppercase tracking-wide mr-auto mb-2 ml-2">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className="mr-2"
            />
            {label}
        </label>
    </div>
);

// Authentication Section Component
const AuthenticationSection = ({ apiKey, setApiKey }) => (
    <FormSection title="Authentication">
        <label className="block text-sm mb-1 uppercase tracking-wide">API Key</label>
        <input
            type="text"
            value={apiKey}
            onInput={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="w-full p-2 border rounded-[1px] font-mono text-sm placeholder-shown:bg-[yellow] bg-white transition-colors"
        />
    </FormSection>
);

// Template Section Component
const TemplateSection = ({ formData, handleInputChange, applyDefaultStyles, templateOptions }) => (
    <FormSection title="Template">
        <SelectField
            label="Name"
            name="template"
            value={formData.template}
            onChange={(e) => {
                handleInputChange(e);
                applyDefaultStyles(e.target.value);
            }}
            options={templateOptions}
        />
    </FormSection>
);

// Style Options Section Component
const StyleOptionsSection = ({ formData, handleInputChange, fontOptions }) => (
    <FormSection title="Style Options">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                label="Border Radius"
                type="number"
                name="borderRadius"
                value={formData.borderRadius}
                onChange={handleInputChange}
                placeholder="2"
            />
            <FormField
                label="Width (characters)"
                type="number"
                name="width"
                value={formData.width}
                onChange={handleInputChange}
                placeholder="43"
            />
            <SelectField
                label="Font"
                name="fontFamily"
                value={formData.fontFamily}
                onChange={handleInputChange}
                options={fontOptions}
            />
            <FormField
                label="Line Spacing"
                type="number"
                name="lineSpacing"
                value={formData.lineSpacing}
                onChange={handleInputChange}
                placeholder="1.4"
                step="0.1"
            />
            <FormField
                label="Font Size"
                type="number"
                name="fontSize"
                value={formData.fontSize}
                onChange={handleInputChange}
                placeholder="14"
            />
            <FormField
                label="Footer Font Size"
                type="number"
                name="footerFontSize"
                value={formData.footerFontSize}
                onChange={handleInputChange}
                placeholder="12"
            />
            <FormField
                label="Barcode Font Size"
                type="number"
                name="barcodeFontSize"
                value={formData.barcodeFontSize}
                onChange={handleInputChange}
                placeholder="11"
            />
            <ColorField
                label="Background Color"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleInputChange}
            />
            <ColorField
                label="Text Color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
            />
            <ColorField
                label="Barcode Color"
                name="barcodeColor"
                value={formData.barcodeColor}
                onChange={handleInputChange}
            />
            <ColorField
                label="QR Code Color"
                name="qrCodeColor"
                value={formData.qrCodeColor}
                onChange={handleInputChange}
            />
            <ColorField
                label="Border Color"
                name="borderColor"
                value={formData.borderColor}
                onChange={handleInputChange}
            />
        </div>
    </FormSection>
);

// Store Information Section Component
const StoreInformationSection = ({ formData, handleInputChange, currencyOptions }) => (
    <FormSection title="Store Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                label="Store Name"
                name="storeName"
                value={formData.storeName}
                onChange={handleInputChange}
            />
            <FormField
                label="Store Address"
                name="storeAddress"
                value={formData.storeAddress}
                onChange={handleInputChange}
            />
            <FormField
                label="Store Phone"
                name="storePhone"
                value={formData.storePhone}
                onChange={handleInputChange}
            />
            <FormField
                label="Store Website"
                name="storeWebsite"
                value={formData.storeWebsite}
                onChange={handleInputChange}
            />
            <SelectField
                label="Currency"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                options={currencyOptions}
            />
            <FormField
                label="Store Image URL"
                name="storeImageUrl"
                value={formData.storeImageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/logo.png"
                className="md:col-span-2"
            />

            {/* Store Image Settings */}
            <div className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        label="Width (%)"
                        type="number"
                        name="storeImageWidth"
                        value={formData.storeImageWidth || ""}
                        onChange={handleInputChange}
                    />
                    <FormField
                        label="Alt Text"
                        name="storeImageAlt"
                        value={formData.storeImageAlt || ""}
                        onChange={handleInputChange}
                        placeholder="Store logo description"
                    />
                    <CheckboxField
                        label="Grayscale"
                        name="storeImageGrayscale"
                        checked={formData.storeImageGrayscale || false}
                        onChange={(e) => handleInputChange({
                            target: {
                                name: e.target.name,
                                value: e.target.checked
                            }
                        })}
                    />
                </div>
            </div>
        </div>
    </FormSection>
);

// Order Information Section Component
const OrderInformationSection = ({ formData, handleInputChange }) => (
    <FormSection title="Order Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                label="Order Number"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleInputChange}
            />
            <FormField
                label="Date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
            />
            <FormField
                label="Time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
            />
            <FormField
                label="Cashier"
                name="cashier"
                value={formData.cashier}
                onChange={handleInputChange}
            />
        </div>
    </FormSection>
);

// Customer Information Section Component
const CustomerInformationSection = ({ formData, handleInputChange }) => (
    <FormSection title="Customer Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                label="Name"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
            />
            <FormField
                label="Email"
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleInputChange}
            />
            <FormField
                label="Phone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleInputChange}
            />
            <FormField
                label="Address"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleInputChange}
            />
        </div>
    </FormSection>
);

// Item Component
const ItemComponent = ({ item, index, updateItem, removeItem }) => (
    <div className="mb-4 p-3 border border-dashed border-gray-300 rounded-[1px] bg-gray-50">
        <div className="flex justify-between mb-2">
            <h3 className="font-mono uppercase">Item #{index + 1}</h3>
            <button
                onClick={() => removeItem(index)}
                className="text-red-500 hover:text-red-700 font-mono"
            >
                Remove [X]
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <FormField
                label="Item Name"
                value={item.name}
                onChange={(e) => updateItem(index, "name", e.target.value)}
            />
            <FormField
                label="Quantity"
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", e.target.value)}
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                label="Price"
                type="number"
                step="0.01"
                min="0"
                value={item.price}
                onChange={(e) => updateItem(index, "price", e.target.value)}
            />
            <FormField
                label="Discount"
                type="number"
                step="0.01"
                min="0"
                value={item.discount}
                onChange={(e) => updateItem(index, "discount", e.target.value)}
            />
        </div>
    </div>
);

// Items Section Component
const ItemsSection = ({ items, updateItem, removeItem, addItem }) => (
    <FormSection title="Items">
        {items.map((item, index) => (
            <ItemComponent
                key={index}
                item={item}
                index={index}
                updateItem={updateItem}
                removeItem={removeItem}
            />
        ))}
        <button
            onClick={addItem}
            className="w-full p-2 bg-gray-100 text-gray-700 rounded-[1px] hover:bg-gray-200 transition font-mono uppercase"
        >
            [+] Add Item
        </button>
    </FormSection>
);

// Payment Information Section Component
const PaymentInformationSection = ({ formData, handleInputChange }) => (
    <FormSection title="Payment Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                label="Tax Rate (%)"
                type="number"
                step="0.01"
                min="0"
                name="taxRate"
                value={formData.taxRate}
                onChange={handleInputChange}
            />
            <FormField
                label="Tip"
                type="number"
                step="0.01"
                min="0"
                name="tip"
                value={formData.tip}
                onChange={handleInputChange}
            />
            <FormField
                label="Payment Method"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
            />
            <FormField
                label="Card Type"
                name="cardType"
                value={formData.cardType}
                onChange={handleInputChange}
            />
            <FormField
                label="Last Four"
                name="lastFour"
                value={formData.lastFour}
                onChange={handleInputChange}
            />
        </div>
    </FormSection>
);

// Barcode Section Component
const BarcodeSection = ({ formData, handleInputChange }) => (
    <FormSection title="Barcode">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <FormField
                    label="Barcode Number"
                    name="barcodeNumber"
                    value={formData.barcodeNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 1234567890128"
                />
                <p className="text-xs text-gray-500 mt-1">Enter a valid barcode number (EAN-13, UPC, etc.)</p>
            </div>
            <div>
                <FormField
                    label="QR Code Data"
                    name="qrCodeData"
                    value={formData.qrCodeData}
                    onChange={handleInputChange}
                    placeholder="e.g. https://example.com/order/123"
                />
                <p className="text-xs text-gray-500 mt-1">Enter URL or text for QR code</p>
            </div>
            {formData.barcodeNumber && (
                <CheckboxField
                    label="Show Barcode Number"
                    name="showBarcode"
                    checked={formData.showBarcode || false}
                    onChange={(e) => handleInputChange({
                        target: {
                            name: e.target.name,
                            value: e.target.checked
                        }
                    })}
                    className="md:col-span-2"
                />
            )}
            <FormField
                label="Barcode Height (pixels)"
                type="number"
                name="barcodeHeight"
                value={formData.barcodeHeight}
                onChange={handleInputChange}
            />
            <FormField
                label="QR Code Width (%)"
                type="number"
                name="qrCodeWidth"
                value={formData.qrCodeWidth}
                onChange={handleInputChange}
            />
        </div>
    </FormSection>
);

// Social Media Section Component
const SocialMediaSection = ({ formData, handleInputChange }) => (
    <FormSection title="Social Media">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
                label="Facebook"
                name="socialMediaFacebook"
                value={formData.socialMediaFacebook}
                onChange={handleInputChange}
                placeholder="username or URL"
            />
            <FormField
                label="Instagram"
                name="socialMediaInstagram"
                value={formData.socialMediaInstagram}
                onChange={handleInputChange}
                placeholder="username or URL"
            />
            <FormField
                label="Twitter"
                name="socialMediaTwitter"
                value={formData.socialMediaTwitter}
                onChange={handleInputChange}
                placeholder="username or URL"
            />
        </div>
    </FormSection>
);

// Surveys Section Component
const SurveysSection = ({ formData, handleInputChange }) => (
    <FormSection title="Surveys">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                label="Survey Code"
                name="surveyCode"
                value={formData.surveyCode}
                onChange={handleInputChange}
            />
        </div>
    </FormSection>
);

// Additional Information Section Component
const AdditionalInformationSection = ({ formData, handleInputChange }) => (
    <FormSection title="Additional Information">
        <FormField
            label="Thank You Message"
            name="thankYou"
            value={formData.thankYou}
            onChange={handleInputChange}
            className="mb-4"
        />

        {/* Info Lines */}
        <div className="mb-4">
            <FormField
                label="Info Line 1"
                name="infoLine1"
                value={formData.infoLine1}
                onChange={handleInputChange}
                className="mb-2"
            />
            <FormField
                label="Info Line 2"
                name="infoLine2"
                value={formData.infoLine2}
                onChange={handleInputChange}
                className="mb-2"
            />
            <FormField
                label="Info Line 3"
                name="infoLine3"
                value={formData.infoLine3}
                onChange={handleInputChange}
            />
        </div>

        {/* Pre-Footer Lines */}
        <div className="mb-4">
            <FormField
                label="Pre-Footer Line 1"
                name="preFooterLine1"
                value={formData.preFooterLine1}
                onChange={handleInputChange}
                className="mb-2"
            />
            <FormField
                label="Pre-Footer Line 2"
                name="preFooterLine2"
                value={formData.preFooterLine2}
                onChange={handleInputChange}
                className="mb-2"
            />
            <FormField
                label="Pre-Footer Line 3"
                name="preFooterLine3"
                value={formData.preFooterLine3}
                onChange={handleInputChange}
            />
        </div>

        {/* Footer Lines */}
        <div>
            <FormField
                label="Footer Line 1"
                name="footerLine1"
                value={formData.footerLine1}
                onChange={handleInputChange}
                className="mb-2"
            />
            <FormField
                label="Footer Line 2"
                name="footerLine2"
                value={formData.footerLine2}
                onChange={handleInputChange}
                className="mb-2"
            />
            <FormField
                label="Footer Line 3"
                name="footerLine3"
                value={formData.footerLine3}
                onChange={handleInputChange}
            />
        </div>
    </FormSection>
);

// JSON View Section Component
const JsonViewSection = ({ copyJsonToClipboard, jsonCopied, codeElementRef }) => (
<div className="mb-6 p-4 bg-white rounded-[1px] receipt-section">
    <div className="flex justify-between items-center mb-2">
        <h2 className="text-[16px] uppercase font-semibold receipt-header">API Request JSON</h2>
        <div>
            <button
                onClick={copyJsonToClipboard}
                className="text-sm px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-[1px] font-mono uppercase"
            >
                {jsonCopied ? "✓ Copied!" : "Copy JSON"}
            </button>
        </div>
    </div>

    <div className="mt-2 relative !text-[12px]">
        <pre className="language-json bg-gray-800 text-gray-100 p-4 rounded-[1px] overflow-x-auto text-xs font-mono">
            <code ref={codeElementRef} className="language-json">
            </code>
        </pre>
    </div>
</div>

const Header = ({ generateReceipt, isLoading, apiKey, resetForm }) => (
    <div className="flex items-center justify-between mb-6 border-b border-dashed border-gray-400 pb-4">
        <h1 className="text-xl receipt-header tracking-wider">Receipt Builder</h1>
        <div className="flex gap-4">
            <button
                onClick={generateReceipt}
                disabled={isLoading || !apiKey}
                title={!apiKey ? 'Enter API key to generate receipt' : ''}
                className={`px-4 py-2 w-40 rounded-[1px] receipt-btn ${!apiKey ? 'bg-gray-300' : 'bg-gray-700 hover:bg-gray-800 text-white'
                    }`}
            >
                {isLoading ? '...' : 'Generate Receipt'}
            </button>
            <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 rounded-[1px] receipt-btn hover:bg-gray-300"
            >
                Reset Form
            </button>
        </div>
    </div>
);

// Preview Component
const PreviewSection = () => (
    <div className="mr-8 mt-[46px]">
        <div className="text-center text-[#484848] text-[13px]">
            Receipt Preview<br />v
        </div>
        <iframe
            id="receipt-preview"
            className="min-w-[43ch] min-h-[732px] mb-32 mt-4 border-0 bg-white text-[16px] rounded-[1px] flex-grow"
            scrolling="no"
            title="Receipt Preview"
        />
    </div>
);

export default function Builder({ serverUrl }: { serverUrl: string }) {
    // State for viewing JSON
    const [jsonCopied, setJsonCopied] = useState(false);
    const codeElementRef = useRef(null); // Ref to the code element

    // State for all form values
    const [formData, setFormData] = useState({
        template: "default",
        storeName: "COFFEE & BAKERY CO.",
        storeAddress: "123 Main Street, Anytown, CA 94105",
        storePhone: "(555) 123-4567",
        storeWebsite: "www.coffeebakery.com",
        storeImageUrl: "https://raw.githubusercontent.com/tom-draper/receiptable/refs/heads/main/api/static/coffee.png",
        storeImageWidth: 40,
        storeImageAlt: "Coffee & Bakery",
        storeImageGrayscale: true,
        orderNumber: "ORD-2025-04567",
        date: "April 24, 2025",
        time: "10:35 AM",
        cashier: "Emma S.",
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerPhone: "",
        customerAddress: "",
        currency: "usd",
        taxRate: 8.5,
        tip: 4.0,
        paymentMethod: "Credit Card",
        cardType: "Visa",
        lastFour: "4321",
        thankYou: "Thank you for your purchase!",
        // New social media section
        socialMediaFacebook: "",
        socialMediaInstagram: "",
        socialMediaTwitter: "",
        // Surveys
        surveyCode: "",
        // New pre-footer lines
        infoLine1: "Organic Coffee - Locally Sourced",
        infoLine2: "Open Mon-Fri: 7am-7pm, Sat-Sun: 8am-5pm",
        infoLine3: "WiFi password: coffee123",
        preFooterLine1: "",
        preFooterLine2: "",
        preFooterLine3: "",
        // Original footer lines
        footerLine1: "Rewards Points Earned: 25",
        footerLine2: "Visit our website for monthly specials!",
        footerLine3: "Receipt ID: TXN-25698-042425",
        barcodeNumber: undefined,
        showBarcode: true,
        barcodeHeight: 40,
        qrCodeData: "https://receiptable.dev/",
        qrCodeWidth: 40,
        // New format options
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
        borderColor: "#ffffff",
        width: 43
    });

    // State for items (with separate management)
    const [items, setItems] = useState([
        { name: "Cappuccino (Large)", quantity: 2, price: 4.95, discount: 0 },
        { name: "Avocado Toast", quantity: 1, price: 8.75, discount: 1.5 }
    ]);

    // State for iframe content
    const [iframeContent, setIframeContent] = useState("");

    // State for loading indicator
    const [isLoading, setIsLoading] = useState(false);

    // State for API key
    const [apiKey, setApiKey] = useState("");

    // Update form data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Add a new empty item
    const addItem = () => {
        setItems([...items, { name: "", quantity: 1, price: 0, discount: 0 }]);
    };

    // Remove an item
    const removeItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    // Update an item
    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = field === "name" ? value : Number(value);
        setItems(newItems);
    }

    // Create a helper function to filter out empty values
    const removeEmptyValues = (obj) => {
        // Base case: if obj is null, undefined, or not an object, return it
        if (obj === null || obj === undefined || typeof obj !== 'object') {
            return obj;
        }

        // Handle arrays
        if (Array.isArray(obj)) {
            // Filter out null/undefined and empty strings in arrays
            const filteredArray = obj.filter(item =>
                item !== null &&
                item !== undefined &&
                item !== ''
            );

            // Process each item in the array
            const mappedArray = filteredArray.map(item => removeEmptyValues(item));

            // Return the filtered array if it has items, otherwise return undefined
            return mappedArray.length > 0 ? mappedArray : undefined;
        }

        // For objects, create a new object with non-empty values
        const result = {};
        let hasValues = false;

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                // Process the value
                const value = removeEmptyValues(obj[key]);

                // Skip null/undefined values and empty strings
                if (value !== null && value !== undefined && value !== '') {
                    result[key] = value;
                    hasValues = true;
                }
            }
        }

        // Return the filtered object if it has properties, otherwise return undefined
        return hasValues ? result : undefined;
    };

    // Update the prepareReceiptData function
    const prepareReceiptData = () => {
        // First create the full data object
        const fullData = {
            template: formData.template,
            output: "html",
            content: {
                store: {
                    name: formData.storeName,
                    address: formData.storeAddress,
                    phone: formData.storePhone,
                    website: formData.storeWebsite,
                },
                orderNumber: formData.orderNumber,
                date: formData.date,
                time: formData.time,
                cashier: formData.cashier,
                currency: formData.currency,
                customer: {
                    name: formData.customerName,
                    email: formData.customerEmail,
                    phone: formData.customerPhone,
                    address: formData.customerAddress,
                },
                items: items.length > 0 ? items : undefined,
                tax: {
                    rate: Number(formData.taxRate) || undefined
                },
                tip: Number(formData.tip) || undefined,
                paymentMethod: formData.paymentMethod,
                paymentDetails: {
                    cardType: formData.cardType,
                    lastFour: formData.lastFour
                },
                thankYou: formData.thankYou,
                socialMedia: {
                    facebook: formData.socialMediaFacebook,
                    instagram: formData.socialMediaInstagram,
                    twitter: formData.socialMediaTwitter
                },
                surveyCode: formData.surveyCode,
                info: [
                    formData.infoLine1,
                    formData.infoLine2,
                    formData.infoLine3
                ],
                preFooter: [
                    formData.preFooterLine1,
                    formData.preFooterLine2,
                    formData.preFooterLine3
                ],
                footer: [
                    formData.footerLine1,
                    formData.footerLine2,
                    formData.footerLine3
                ],
            },
            style: {
                borderRadius: formData.borderRadius,
                fontFamily: formData.fontFamily,
                fontSize: Number(formData.fontSize) || undefined,
                footerFontSize: Number(formData.footerFontSize) || undefined,
                barcodeFontSize: Number(formData.barcodeFontSize) || undefined,
                lineSpacing: Number(formData.lineSpacing) || undefined,
                backgroundColor: formData.backgroundColor,
                color: formData.color,
                barcodeColor: formData.barcodeColor,
                qrCodeColor: formData.qrCodeColor,
                borderColor: formData.borderColor,
                width: Number(formData.width) || undefined
            }
        };

        // Add image conditionally if URL is provided
        if (formData.storeImageUrl) {
            fullData.content.store.image = {
                url: formData.storeImageUrl,
                alt: formData.storeImageAlt || undefined,
                width: formData.storeImageWidth || undefined,
                grayscale: formData.storeImageGrayscale || undefined
            };
        }

        // Add barcode conditionally
        if (formData.barcodeNumber || formData.qrCodeData) {
            fullData.content.barcode = {};
            if (formData.barcodeNumber) {
                fullData.content.barcode.barcode = formData.barcodeNumber;
                fullData.content.barcode.showBarcode = formData.showBarcode;
                fullData.content.barcode.barcodeHeight = formData.barcodeHeight;
            }
            if (formData.qrCodeData) {
                fullData.content.barcode.qrCode = formData.qrCodeData;
                fullData.content.barcode.qrCodeWidth = formData.qrCodeWidth;
            }
        }

        // Filter out all empty values
        return removeEmptyValues(fullData);
    };

    const setJsonPreview = () => {
        if (typeof window === 'undefined' || !codeElementRef.current) return;

        // Set the content directly to avoid append issues
        if (codeElementRef.current) {
            codeElementRef.current.textContent = jsonPreview();
        }

        const Prism = (window).Prism;
        if (Prism && Prism.highlightElement) {
            Prism.highlightElement(codeElementRef.current);
        }
    };

    useEffect(() => {
        const loadPrism = async () => {
            if (typeof window === 'undefined') return;

            try {
                const Prism = await import('prismjs');
                await import('prismjs/components/prism-json');

                Prism.default.highlightAll();
            } catch (error) {
                console.error('Failed to load Prism:', error);
            }
        };

        loadPrism();

        setJsonPreview();
    }, []);

    useEffect(() => {
        setJsonPreview();
    }, [formData])

    const jsonPreview = () => {
        const receiptData = prepareReceiptData();
        return JSON.stringify(receiptData, null, 2);
    }


    // Generate receipt
    const generateReceipt = async () => {
        setIsLoading(true);

        // Prepare data for API
        const receiptData = prepareReceiptData();

        try {
            const response = await fetch(serverUrl + "/api/v1/receipt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": apiKey
                },
                body: JSON.stringify(receiptData)
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const htmlContent = await response.text();
            setIframeContent(htmlContent);
        } catch (error) {
            console.error("Error generating receipt:", error);
            alert(`Error generating receipt: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Copy JSON to clipboard
    const copyJsonToClipboard = () => {
        const receiptData = prepareReceiptData();
        navigator.clipboard.writeText(JSON.stringify(receiptData, null, 2))
            .then(() => {
                setJsonCopied(true);
                setTimeout(() => setJsonCopied(false), 2000);
            })
            .catch(err => {
                console.error('Failed to copy JSON: ', err);
                alert('Failed to copy JSON to clipboard');
            });
    };

    // Reset form to default values
    const resetForm = () => {
        setFormData({
            template: "default",
            storeName: "",
            storeAddress: "",
            storePhone: "",
            storeWebsite: "",
            storeImageUrl: "",
            storeImageWidth: 40,
            storeImageAlt: "",
            storeImageGrayscale: true,
            orderNumber: "",
            date: "",
            time: "",
            cashier: "",
            customerName: "",
            customerEmail: "",
            customerPhone: "",
            customerAddress: "",
            currency: "usd",
            taxRate: 0,
            tip: 0,
            paymentMethod: "",
            cardType: "",
            lastFour: "",
            thankYou: "",
            socialMediaFacebook: "",
            socialMediaInstagram: "",
            socialMediaTwitter: "",
            surveyCode: "",
            infoLine1: "",
            infoLine2: "",
            infoLine3: "",
            preFooterLine1: "",
            preFooterLine2: "",
            preFooterLine3: "",
            footerLine1: "",
            footerLine2: "",
            footerLine3: "",
            barcodeNumber: undefined,
            showBarcode: true,
            barcodeHeight: 40,
            qrCodeData: "",
            qrCodeWidth: 40,
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
            borderColor: "#ffffff",
            width: 43
        });
        setItems([]);
    };

    // Update iframe content when it changes
    const updateIframe = () => {
        const iframe = document.getElementById("receipt-preview");
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(iframeContent);
            iframe.contentWindow.document.close();
            iframe.contentWindow.document.body.style.margin = "0";
            iframe.style.minHeight = 'unset';
            iframe.style.minWidth = 'unset';
            iframe.style.background = 'transparent';
            // Apply buffer of 2px for potential 2px border on receipt
            iframe.style.height = (iframe.contentWindow.document.body.children[0].scrollHeight + 2) + 'px';
            iframe.style.width = (iframe.contentWindow.document.body.children[0].clientWidth + 2) + 'px';
            for (const ms of [500, 1000, 2000]) {
                setTimeout(() => {
                    iframe.style.height = (iframe.contentWindow.document.body.children[0].scrollHeight + 2) + 'px';
                    iframe.style.width = (iframe.contentWindow.document.body.children[0].clientWidth + 2) + 'px';
                }, ms);
            }
        }
    }

    // Call updateIframe when iframeContent changes
    if (iframeContent) {
        setTimeout(updateIframe, 0);
    }

    // Currency options
    const currencyOptions = [
        { value: "usd", label: "USD ($)" },
        { value: "eur", label: "EUR (€)" },
        { value: "gbp", label: "GBP (£)" },
        { value: "cad", label: "CAD (C$)" },
        { value: "aud", label: "AUD (A$)" },
        { value: "jpy", label: "JPY (¥)" }
    ];

    const templateOptions: { value: template; label: string }[] = [
        { value: 'default', label: 'default' },
        { value: 'barcode', label: 'barcode' },
        { value: 'ticket', label: 'ticket' },
        { value: 'self-service', label: 'self-service' },
    ]

    const fontOptions: { value: string; label: string }[] = [
        { value: 'monospace', label: 'monospace' },
        { value: 'Anonymous Pro', label: 'Anonymous Pro' },
        { value: 'Atkinson Hyperlegible Mono', label: 'Atkinson Hyperlegible Mono' },
        { value: 'Azeret Mono', label: 'Azeret Mono' },
        { value: 'B612 Mono', label: 'B612 Mono' },
        { value: 'Chivo Mono', label: 'Chivo Mono' },
        { value: 'Courier Prime', label: 'Courier Prime' },
        { value: 'Cousine', label: 'Cousine' },
        { value: 'Cutive Mono', label: 'Cutive Mono' },
        { value: 'DM Mono', label: 'DM Mono' },
        { value: 'Doto', label: 'Doto' },
        { value: 'Fira Code', label: 'Fira Code' },
        { value: 'Fira Mono', label: 'Fira Mono' },
        { value: 'Fragment Mono', label: 'Fragment Mono' },
        { value: 'Geist Mono', label: 'Geist Mono' },
        { value: 'IBM Plex Mono', label: 'IBM Plex Mono' },
        { value: 'Inconsolata', label: 'Inconsolata' },
        { value: 'JetBrains Mono', label: 'JetBrains Mono' },
        { value: 'Kode Mono', label: 'Kode Mono' },
        { value: 'Lekton', label: 'Lekton' },
        { value: 'Major Mono Display', label: 'Major Mono Display' },
        { value: 'Martian Mono', label: 'Martian Mono' },
        { value: 'Nova Mono', label: 'Nova Mono' },
        { value: 'Overpass Mono', label: 'Overpass Mono' },
        { value: 'Oxygen Mono', label: 'Oxygen Mono' },
        { value: 'PT Mono', label: 'PT Mono' },
        { value: 'Red Hat Mono', label: 'Red Hat Mono' },
        { value: 'Reddit Mono', label: 'Reddit Mono' },
        { value: 'Roboto Mono', label: 'Roboto Mono' },
        { value: 'Share Tech Mono', label: 'Share Tech Mono' },
        { value: 'Sixtyfour', label: 'Sixtyfour' },
        { value: 'Sometype Mono', label: 'Sometype Mono' },
        { value: 'Sono', label: 'Sono' },
        { value: 'Source Code Pro', label: 'Source Code Pro' },
        { value: 'Space Mono', label: 'Space Mono' },
        { value: 'Spline Sans Mono', label: 'Spline Sans Mono' },
        { value: 'Syne Mono', label: 'Syne Mono' },
        { value: 'Ubuntu Mono', label: 'Ubuntu Mono' },
        { value: 'Ubuntu Sans Mono', label: 'Ubuntu Sans Mono' },
        { value: 'Victor Mono', label: 'Victor Mono' },
        { value: 'VT323', label: 'VT323' },
        { value: 'Workbench', label: 'Workbench' },
        { value: 'Xanh Mono', label: 'Xanh Mono' },
    ]

    type template = 'default' | 'barcode' | 'ticket' | 'self-service';

    const applyDefaultStyles = (template: template) => {
        if (template in defaultStylesMap) {
            console.log(template)
            applyStyles(defaultStylesMap[template])
        }

        switch (template) {
            case 'default':
            case 'barcode':
            case 'self-service':
                setFormData((prev) => {
                    prev.qrCodeData = "https://receiptable.dev/";
                    prev.barcodeNumber = "";
                    return prev;
                })
                break;
            case 'ticket':
                setFormData((prev) => {
                    const today = new Date();

                    const yyyy = today.getFullYear();
                    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
                    const dd = String(today.getDate()).padStart(2, '0');

                    prev.qrCodeData = ""
                    prev.barcodeNumber = `${yyyy}${mm}${dd}`;
                    return prev;
                })
                break;
        }
    }

    type Styles = {
        borderRadius: number;
        fontFamily: string;
        fontSize: number;
        footerFontSize: number;
        barcodeFontSize: number;
        lineSpacing: number;
        backgroundColor: string;
        color: string;
        barcodeColor: string;
        qrCodeColor: string;
        borderColor: string;
        width: number;
    }

    const applyStyles = (styles: Styles) => {
        setFormData((prev) => {
            prev.borderRadius = styles.borderRadius
            prev.fontFamily = styles.fontFamily
            prev.fontSize = styles.fontSize;
            prev.footerFontSize = styles.footerFontSize;
            prev.barcodeFontSize = styles.barcodeFontSize;
            prev.lineSpacing = styles.lineSpacing;
            prev.backgroundColor = styles.backgroundColor;
            prev.color = styles.color;
            prev.barcodeColor = styles.barcodeColor;
            prev.qrCodeColor = styles.qrCodeColor;
            prev.borderColor = styles.borderColor;
            prev.width = styles.width;

            return prev;
        });
    }

    const defaultStyles: Styles = {
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
        borderColor: "#ffffff",
        width: 43,
    }

    const barcodeStyles: Styles = {
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
        borderColor: "#ffffff",
        width: 43,
    }

    const ticketStyles: Styles = {
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
        borderColor: "#ffffff",
        width: 68,
    }

    const defaultStylesMap: Record<template, Styles> = {
        'default': defaultStyles,
        'barcode': barcodeStyles,
        'ticket': ticketStyles,
        'self-service': defaultStyles,
    }

    return (
        <div className="min-h-screen bg-[#f9f9f9]">
            <div className="flex">
                <div className="flex-grow p-6 overflow-y-auto text-[#484848]">
                    <Header
                        generateReceipt={generateReceipt}
                        isLoading={isLoading}
                        apiKey={apiKey}
                        resetForm={resetForm}
                    />

                    {/* API Key and Template in flex container */}
                    <div className="flex gap-6">
                        <div className="flex-1">
                            <AuthenticationSection apiKey={apiKey} setApiKey={setApiKey} />
                        </div>
                        <div className="flex-1">
                            <TemplateSection
                                formData={formData}
                                handleInputChange={handleInputChange}
                                applyDefaultStyles={applyDefaultStyles}
                                templateOptions={templateOptions}
                            />
                        </div>
                    </div>

                    <StyleOptionsSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                        fontOptions={fontOptions}
                    />

                    <StoreInformationSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                        currencyOptions={currencyOptions}
                    />

                    <OrderInformationSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />

                    <CustomerInformationSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />

                    <ItemsSection
                        items={items}
                        updateItem={updateItem}
                        removeItem={removeItem}
                        addItem={addItem}
                    />

                    <PaymentInformationSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />

                    <BarcodeSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />

                    <SocialMediaSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />

                    <SurveysSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />

                    <AdditionalInformationSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />

                    <JsonViewSection
                        copyJsonToClipboard={copyJsonToClipboard}
                        jsonCopied={jsonCopied}
                        codeElementRef={codeElementRef}
                    />
                </div>

                <PreviewSection />
            </div>
        </div>
    );
}