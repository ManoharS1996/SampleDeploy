import React, { useEffect } from 'react';

const RazorpayComponent = () => {
    useEffect(() => {
        // Dynamically load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;

        script.onload = () => {
            console.log('Razorpay script loaded');

            // Ensure Razorpay is available
            if (typeof window.Razorpay === 'undefined') {
                console.error('Razorpay SDK failed to load.');
                return;
            }

            const options = {
                key: 'rzp_test_AjmIsMHSqxjNUs', // Replace with your Razorpay Key ID
                amount: '50000', // Amount in paise (50000 paise = INR 500)
                currency: 'INR',
                name: 'Acme Corp',
                description: 'Test Transaction',
                image: 'https://example.com/your_logo',
                order_id: 'order_PCODEcpYqD7CWZ', // Replace with your actual order ID
                handler: function (response) {
                    alert(`Payment ID: ${response.razorpay_payment_id}`);
                    alert(`Order ID: ${response.razorpay_order_id}`);
                    alert(`Signature: ${response.razorpay_signature}`);
                },
                prefill: {
                    name: 'Gaurav Kumar',
                    email: 'gaurav.kumar@example.com',
                    contact: '9000090000',
                },
                notes: {
                    address: 'Razorpay Corporate Office',
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const rzp1 = new window.Razorpay(options);

            rzp1.on('payment.failed', function (response) {
                alert(`Error Code: ${response.error.code}`);
                alert(`Error Description: ${response.error.description}`);
                alert(`Error Source: ${response.error.source}`);
                alert(`Error Step: ${response.error.step}`);
                alert(`Error Reason: ${response.error.reason}`);
                alert(`Order ID: ${response.error.metadata.order_id}`);
                alert(`Payment ID: ${response.error.metadata.payment_id}`);
            });

            document.getElementById('rzp-button1').onclick = function (e) {
                e.preventDefault();
                rzp1.open();
            };
        };

        script.onerror = () => {
            console.error('Failed to load the Razorpay script');
        };

        document.body.appendChild(script);

        // Cleanup the script when component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <button id="rzp-button1" style={{ padding: '10px', background: '#3399cc', color: '#fff' }}>
            Pay Now
        </button>
    );
};

export default RazorpayComponent;
