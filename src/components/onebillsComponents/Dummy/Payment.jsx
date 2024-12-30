import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payment = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false);
    const amount = 500;
    const currency = "INR";
    const receiptId = 'qwsaq1';

    const handlePaymentRequest = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/create-order`, {
                amount: 5000,
                clientEmail: 'sivakumar.erugu.7@gmail.com',
                clientId: '12345',
                clientName: 'John Doe',
                dueDate: '2024-10-30',
                invoiceId: 'INV123'
            });

            if (response.data.success) {
                alert('Payment request sent successfully!');
            }
        } catch (error) {
            console.error('Error sending payment request:', error);
            alert('Error sending payment request');
        } finally {
            setLoading(false);
        }
    };

    const paymentGateWay = async (e) => {
        if (!window.Razorpay) {
            alert("Razorpay SDK not loaded. Please check your internet connection.");
            return;
        }

        const response = await fetch('http://localhost:3001/order', {
            method: "POST",
            body: JSON.stringify({
                amount,
                currency,
                receipt: receiptId
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const order = await response.json();
        console.log(order);

        var options = {
            key: "rzp_test_AjmIsMHSqxjNUs",
            amount,
            currency,
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,

            method: ['upi', 'card', 'netbanking', 'wallet'],

            handler: async function (response) {
                const body = {
                    ...response
                }

                const validateRes = await fetch("http://localhost:3001/order/validate", {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": 'application/json',
                    }
                })
                const jsonRes = await validateRes.json()
                console.log(jsonRes)
            },
            prefill: {
                name: "Siva Kumar",
                email: "sivakumar.erugu.7@example.com",
                contact: "9000090000"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });

        rzp1.open();
        e.preventDefault();
    }

    return (
        <div>
            <button onClick={handlePaymentRequest} disabled={loading}>
                {loading ? 'Sending Payment Request...' : 'Send Payment Request'}
            </button>

            <button type='button' onClick={paymentGateWay}>Payyy</button>
        </div>
    );
}

export default Payment;
