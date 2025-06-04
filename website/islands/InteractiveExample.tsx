import { useState, useEffect, useRef } from 'preact/hooks';

export function InteractiveExample() {
    const [language, setLanguage] = useState('nodejs');
    const [showImage, setShowImage] = useState(false);
    const [mounted, setMounted] = useState(false);
    const codeElementRef = useRef(null); // Ref to the code element

    const languageExamples = {
        nodejs: `const receiptData = {
    'template': 'default',
    'output': 'html',
    'data': {
        'storeName': 'COFFEE & BAKERY CO.',
        'storeAddress': '123 Main Street, Anytown, CA 94105',
        'storePhone': '(555) 123-4567',
        'storeWebsite': 'www.coffeebakery.com',
        'orderNumber': 'ORD-2025-04567',
        'date': 'April 24, 2025',
        'time': '10:35 AM',
        'cashier': 'Emma S.',
        'customer': {
            'name': 'John Doe',
            'email': 'john@example.com'
        },
        'items': [
            {
                'name': 'Cappuccino (Large)',
                'quantity': 2,
                'price': 4.95
            },
            {
                'name': 'Avocado Toast',
                'quantity': 1,
                'price': 8.75,
                'discount': 1.50
            }
        ],
        'tax': {
            'rate': 8.5
        },
        'tip': 4.00,
        'paymentMethod': 'Credit Card',
        'paymentDetails': {
            'cardType': 'Visa',
            'lastFour': '4321'
        },
        'thankYou': 'Thank you for your purchase!',
        'footer': [
            'Rewards Points Earned: 25',
            'Visit our website for monthly specials!',
            'Receipt ID: TXN-25698-042425'
        ]
    }
}

fetch('https://receiptable.dev/api/v1/receipt', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': '<API_KEY>'
    },
    body: JSON.stringify(receiptData)
})`,
        python: `import requests
import json

receipt_data = {
    'template': 'default',
    'output': 'html',
    'data': {
        'storeName': 'COFFEE & BAKERY CO.',
        'storeAddress': '123 Main Street, Anytown, CA 94105',
        'storePhone': '(555) 123-4567',
        'storeWebsite': 'www.coffeebakery.com',
        'orderNumber': 'ORD-2025-04567',
        'date': 'April 24, 2025',
        'time': '10:35 AM',
        'cashier': 'Emma S.',
        'customer': {
            'name': 'John Doe',
            'email': 'john@example.com'
        },
        'items': [
            {
                'name': 'Cappuccino (Large)',
                'quantity': 2,
                'price': 4.95
            },
            {
                'name': 'Avocado Toast',
                'quantity': 1,
                'price': 8.75,
                'discount': 1.50
            }
        ],
        'tax': {
            'rate': 8.5
        },
        'tip': 4.00,
        'paymentMethod': 'Credit Card',
        'paymentDetails': {
            'cardType': 'Visa',
            'lastFour': '4321'
        },
        'thankYou': 'Thank you for your purchase!',
        'footer': [
            'Rewards Points Earned: 25',
            'Visit our website for monthly specials!',
            'Receipt ID: TXN-25698-042425'
        ]
    }
}

response = requests.post(
    'https://receiptable.dev/api/v1/receipt',
    headers={ 
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': '<API_KEY>'
    },
    json=receipt_data
)`,
        csharp: `using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program
{
    static async Task Main()
    {
        var receiptData = new
        {
            template = "default",
            output = "html",
            data = new
            {
                storeName = "COFFEE & BAKERY CO.",
                storeAddress = "123 Main Street, Anytown, CA 94105",
                storePhone = "(555) 123-4567",
                storeWebsite = "www.coffeebakery.com",
                orderNumber = "ORD-2025-04567",
                date = "April 24, 2025",
                time = "10:35 AM",
                cashier = "Emma S.",
                customer = new
                {
                    name = "John Doe",
                    email = "john@example.com"
                },
                items = new[]
                {
                    new
                    { 
                        name = "Cappuccino (Large)", 
                        quantity = 2, 
                        price = 4.95
                    },
                    new 
                    { 
                        name = "Avocado Toast",
                        quantity = 1,
                        price = 8.75,
                        discount = 1.50
                    }
                },
                tax = new { rate = 8.5 },
                tip = 4.00,
                paymentMethod = "Credit Card",
                paymentDetails = new
                {
                    cardType = "Visa",
                    lastFour = "4321"
                },
                thankYou = "Thank you for your purchase!",
                footer = new[]
                {
                    "Rewards Points Earned: 25",
                    "Visit our website for monthly specials!",
                    "Receipt ID: TXN-25698-042425"
                }
            }
        };

        var json = JsonSerializer.Serialize(receiptData);

        using var client = new HttpClient();
        client.DefaultRequestHeaders.Add("X-AUTH-TOKEN", "<API_KEY>");

        var content = new StringContent(
            json, 
            Encoding.UTF8, 
            "application/json"
        );
        var response = await client.PostAsync(
            "https://receiptable.dev/api/v1/receipt", 
            content
        );

        string responseString = await response.Content.ReadAsStringAsync();
        Console.WriteLine(responseString);
    }
}`,
        curl: `curl -X POST \\
    https://receiptable.dev/api/v1/receipt \\
    -H 'Content-Type: application/json' \\
    -H 'X-AUTH-TOKEN: <API_KEY>' \\
    --output receipt.png \\
    -d '{
        "template": "default",
        "output": "html",
        "data": {
            "storeName": "COFFEE & BAKERY CO.",
            "storeAddress": "123 Main Street, Anytown, CA 94105",
            "storePhone": "(555) 123-4567",
            "storeWebsite": "www.coffeebakery.com",
            "orderNumber": "ORD-2025-04567",
            "date": "April 24, 2025",
            "time": "10:35 AM",
            "cashier": "Emma S.",
            "customer": {
                "name": "John Doe",
                "email": "john@example.com"
            },
            "items": [
                {
                    "name": "Cappuccino (Large)",
                    "quantity": 2,
                    "price": 4.95
                },
                {
                    "name": "Avocado Toast",
                    "quantity": 1,
                    "price": 8.75,
                    "discount": 1.50
                }
            ],
            "tax": {
                "rate": 8.5
            },
            "tip": 4.00,
            "paymentMethod": "Credit Card",
            "paymentDetails": {
                "cardType": "Visa",
                "lastFour": "4321"
            },
            "thankYou": "Thank you for your purchase!",
            "footer": [
                "Rewards Points Earned: 25",
                "Visit our website for monthly specials!",
                "Receipt ID: TXN-25698-042425"
            ]
        }
    }'`
    };

    // Map our internal language names to Prism's language classes
    const prismLanguageMap = {
        nodejs: 'javascript',
        python: 'python',
        curl: 'bash'
    };

    // Handle language change with complete DOM refresh
    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
    };

    // For Deno Fresh, we need to dynamically load Prism on the client-side
    useEffect(() => {
        // Mark component as mounted
        setMounted(true);

        // Import Prism dynamically since it's a browser API
        const loadPrism = async () => {
            if (typeof window === 'undefined') return;

            try {
                // For Fresh we use dynamic imports
                const Prism = await import('prismjs');
                // Import the theme and languages
                await import('prismjs/components/prism-javascript');
                await import('prismjs/components/prism-python');
                await import('prismjs/components/prism-csharp');
                await import('prismjs/components/prism-bash');

                // Highlight all code blocks
                Prism.default.highlightAll();
            } catch (error) {
                console.error('Failed to load Prism:', error);
            }
        };

        loadPrism();
    }, []);

    // Update code content and apply highlighting when language changes
    useEffect(() => {
        if (!mounted || typeof window === 'undefined' || !codeElementRef.current) return;

        // Set the content directly to avoid append issues
        if (codeElementRef.current) {
            codeElementRef.current.textContent = languageExamples[language];
        }

        const Prism = (window).Prism;
        if (Prism && Prism.highlightElement) {
            Prism.highlightElement(codeElementRef.current);
        }
    }, [language, mounted]); // Re-run highlighting when language changes

    const handleRun = () => {
        setShowImage(true);
    };

    const LanguageButton = ({ name, langKey, active }) => (
        <button
            onClick={() => handleLanguageChange(langKey)}
            class={`px-3 py-1 text-sm rounded ${active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
            {name}
        </button>
    );

    // Get the correct language class for Prism
    const prismClass = prismLanguageMap[language] || 'javascript';

    return (
        <div>
            <div class="playground-content flex flex-col mx-[20%] pt-16">
                <div class="text-[16px] text-center pb-4">
                    It's as simple as...
                </div>
                <div class="my-3 mb-8">
                    <div class="playground-flex flex h-[788px]">
                        <div class="code-example flex-grow bg-white rounded mr-8 relative">
                            {/* Language buttons in top right */}
                            <div class="absolute top-5 right-7 flex space-x-2">
                                <LanguageButton name="Node.js" langKey="nodejs" active={language === 'nodejs'} />
                                <LanguageButton name="Python" langKey="python" active={language === 'python'} />
                                <LanguageButton name="C#" langKey="csharp" active={language === 'csharp'} />
                                <LanguageButton name="Curl" langKey="curl" active={language === 'curl'} />
                            </div>

                            {/* Code with syntax highlighting - Empty code element that will be filled by useEffect */}
                            <div class="w-full h-full text-[14px] max-sm:text-[12px] overflow-auto">
                                <pre class="h-full rounded !m-0 bg-transparent">
                                    <code ref={codeElementRef} class={`language-${prismClass}`}></code>
                                </pre>
                            </div>

                            {/* Run button in bottom right */}
                            <button
                                onClick={handleRun}
                                title="Run"
                                class="absolute bottom-4 right-7 bg-green-500 text-white rounded-full p-3 flex items-center justify-center shadow-md hover:bg-green-600 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                            </button>
                        </div>

                        {/* Receipt Image Component */}
                        <div className="receipt-placeholder w-[360px] h-[788px] self-center grid place-items-center rounded overflow-hidden bg-[#f5f5f5]">
                            {showImage ? (
                                <img
                                    src="/example.png"
                                    alt="Receipt"
                                    className="w-full rounded object-contain fade-in"
                                />
                            ) : (
                                <div className="text-gray-400 flex flex-col items-center p-8 w-[360px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                    <p className="mt-2">Click "Run" to generate receipt</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}