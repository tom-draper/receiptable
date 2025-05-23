export function Receipt() {
    return (
        <div id="receipt" class="font-mono" style="width: 43ch; padding: 1.5rem; background: white; border-radius: 4px; color: #484848; font-size: 14px; line-height: 1.4; word-wrap: break-word; box-sizing: content-box;">
            <div style="text-align: center; margin-bottom: 10px;">
                <h1 style="margin: 0; font-size: 1.5em;">Charming Receipts</h1>
                <p style="margin: 4px 0;">For your customers</p>
                <p style="margin: 4px 0;">Tel: (555) 123-4567</p>
                <p style="margin: 4px 0;">www.receiptable.dev</p>
            </div>

            <div style="margin: 15px 0;">
                <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                    <div>Order #: 8675309</div>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                    <div>Date: 04/25/2025</div>
                    <div>Ultra-realistic</div>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                    <div>Time: 10:15 AM</div>
                    <div>Easily embeddable</div>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                    <div>Cashier: Tom</div>
                </div>
            </div>

            <div style="margin: 15px 0;">
                <p style="margin: 0; text-align: center; overflow-wrap: normal; overflow: hidden; white-space: nowrap;">-------------------------------------------</p>
                <div style="display: flex; justify-content: space-between; font-weight: bold; margin: 8px 0;">
                    <div>Item</div>
                    <div>Price</div>
                </div>
                <p style="margin: 0; text-align: center; overflow-wrap: normal; overflow: hidden; white-space: nowrap;">-------------------------------------------</p>

                <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                    <div>2 x Latte</div>
                    <div>$10.00</div>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                    <div>1 x Muffin</div>
                    <div>$3.50</div>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                    <div>1 x Charming receipt</div>
                    <div>$0.00</div>
                </div>

                <p style="margin: 0; text-align: center; overflow-wrap: normal;overflow: hidden; white-space: nowrap;">-------------------------------------------</p>
            </div>

            <div style="margin: 15px 0;">
                <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                    <div>Subtotal:</div>
                    <div>$13.50</div>
                </div>

                <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                    <div>Tax (8%):</div>
                    <div>$1.08</div>
                </div>

                <div style="display: flex; justify-content: space-between; margin: 4px 0;">
                    <div>Tip:</div>
                    <div>$2.00</div>
                </div>

                <p style="margin: 8px 0; text-align: center; overflow-wrap: normal; overflow: hidden; white-space: nowrap;">*******************************************</p>

                <div style="display: flex; justify-content: space-between; font-weight: bold; margin: 4px 0;">
                    <div>TOTAL:</div>
                    <div>$16.58</div>
                </div>
            </div>

            <div style="margin: 15px 0;">
                <p style="margin: 4px 0;">Payment Method: Credit Card</p>
                <p style="margin: 4px 0;">Visa ****1234</p>
                <p style="margin: 4px 0;">Amount Paid: $16.58</p>
                <p style="margin: 4px 0;">Change Due: $0.00</p>
            </div>

            <div style="margin-top: 20px; text-align: center;">
                <p style="margin: 8px 0; text-align: center; overflow-wrap: normal; overflow: hidden; white-space: nowrap;">*******************************************</p>
                <p style="margin: 8px 0;">Thank you for your purchase!</p>
                <p style="margin: 4px 0; text-align: center; font-size: 12px;">Bring this receipt for 10% off next time!</p>
                <p style="margin: 4px 0; text-align: center; font-size: 12px;">Follow us @receiptableapi</p>
            </div>

            {/* <!-- SVG Barcode --> */}
            <div style="margin: 15px 0; text-align: center; place-items: center;">
                <svg width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
                    {/* <!-- UPC/EAN style barcode representation --> */}
                    <rect x="10" y="5" width="2" height="40" fill="black" />
                    <rect x="14" y="5" width="1" height="40" fill="black" />
                    <rect x="17" y="5" width="3" height="40" fill="black" />
                    <rect x="22" y="5" width="2" height="40" fill="black" />
                    <rect x="26" y="5" width="1" height="40" fill="black" />
                    <rect x="30" y="5" width="3" height="40" fill="black" />
                    <rect x="35" y="5" width="1" height="40" fill="black" />
                    <rect x="38" y="5" width="2" height="40" fill="black" />
                    <rect x="42" y="5" width="3" height="40" fill="black" />
                    <rect x="47" y="5" width="1" height="40" fill="black" />
                    <rect x="50" y="5" width="2" height="40" fill="black" />
                    <rect x="54" y="5" width="3" height="40" fill="black" />
                    <rect x="60" y="5" width="1" height="40" fill="black" />
                    <rect x="63" y="5" width="3" height="40" fill="black" />
                    <rect x="68" y="5" width="2" height="40" fill="black" />
                    <rect x="72" y="5" width="1" height="40" fill="black" />
                    <rect x="75" y="5" width="3" height="40" fill="black" />
                    <rect x="80" y="5" width="2" height="40" fill="black" />
                    <rect x="84" y="5" width="1" height="40" fill="black" />
                    <rect x="87" y="5" width="3" height="40" fill="black" />
                    <rect x="92" y="5" width="2" height="40" fill="black" />
                    <rect x="96" y="5" width="3" height="40" fill="black" />
                    <rect x="101" y="5" width="1" height="40" fill="black" />
                    <rect x="105" y="5" width="2" height="40" fill="black" />
                    <rect x="110" y="5" width="1" height="40" fill="black" />
                    <rect x="114" y="5" width="3" height="40" fill="black" />
                    <rect x="119" y="5" width="2" height="40" fill="black" />
                    <rect x="123" y="5" width="1" height="40" fill="black" />
                    <rect x="126" y="5" width="2" height="40" fill="black" />
                    <rect x="130" y="5" width="3" height="40" fill="black" />
                    <rect x="135" y="5" width="1" height="40" fill="black" />
                    <rect x="138" y="5" width="2" height="40" fill="black" />
                    <rect x="142" y="5" width="3" height="40" fill="black" />
                    <rect x="148" y="5" width="1" height="40" fill="black" />
                    <rect x="151" y="5" width="1" height="40" fill="black" />
                    <rect x="154" y="5" width="2" height="40" fill="black" />
                    <rect x="158" y="5" width="3" height="40" fill="black" />
                    <rect x="163" y="5" width="1" height="40" fill="black" />
                    <rect x="166" y="5" width="2" height="40" fill="black" />
                    <rect x="170" y="5" width="3" height="40" fill="black" />
                    <rect x="175" y="5" width="2" height="40" fill="black" />
                    <rect x="180" y="5" width="1" height="40" fill="black" />
                    <rect x="183" y="5" width="3" height="40" fill="black" />
                    <rect x="188" y="5" width="2" height="40" fill="black" />
                </svg>
                <p style="margin: 4px 0; font-size: 11px;">8675309-04252025</p>
            </div>

            <div style="margin-top: 15px; border-top: 1px dashed #999; padding-top: 10px;">
                <p style="margin: 4px 0; text-align: center; font-size: 12px;">✓ Embeddable on any website or email</p>
                <p style="margin: 4px 0; text-align: center; font-size: 12px;">✓ Available in HTML, PDF & image formats</p>
                <p style="margin: 4px 0; text-align: center; font-size: 12px;">✓ Fun customization options</p>
                <p style="margin: 4px 0; text-align: center; font-size: 12px;">Sign up at www.receiptable.dev</p>
            </div>
        </div>
    );
}