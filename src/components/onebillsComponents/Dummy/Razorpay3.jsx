import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentPage3 = () => {
    const { orderId } = useParams(); // Extract orderId from URL params
    const navigate = useNavigate();  // To redirect user after payment success

    useEffect(() => {
        console.log("Order ID:", orderId); // Debugging log

        const loadRazorpay = async () => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onerror = () => alert("Razorpay SDK failed to load. Are you online?");
            script.onload = async () => {
                try {
                    const result = await axios.post('http://localhost:3001/verify-order', { orderId });
                    const { amount, id: order_id, currency } = result.data;

                    const options = {
                        key: 'rzp_test_AjmIsMHSqxjNUs', // Your Razorpay Key ID
                        amount: amount.toString(),
                        currency: currency,
                        name: 'NowIt Services',
                        description: 'Test Transaction',
                        order_id: order_id, // Razorpay Order ID
                        handler: async function (response) {
                            alert("Payment successful. Verifying...");

                            // Send payment details to the backend for verification
                            try {
                                await axios.post('http://localhost:5000/verify-payment', {
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                });

                                alert("Payment verified successfully!");
                                navigate('/payment-success'); // Optional redirect to success page
                            } catch (error) {
                                alert("Payment verification failed.");
                                console.error("Verification Error: ", error);
                            }
                        },
                        prefill: {
                            name: "Your Customer Name",
                            email: "customer_email@example.com",
                        },
                        theme: {
                            color: "#3399cc",
                        },
                    };

                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open();
                } catch (error) {
                    alert("Unable to initiate payment");
                    console.error(error);
                }
            };
            document.body.appendChild(script);
        };

        loadRazorpay();
    }, [orderId, navigate]);

    return (
        <div>
            <h2>Processing your payment...</h2>
        </div>
    );
};

export default PaymentPage3;
