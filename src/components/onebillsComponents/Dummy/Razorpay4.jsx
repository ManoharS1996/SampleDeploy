import React, { useState } from 'react';
import axios from 'axios';

const PaymentRequestForm = () => {
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}/create-payment-link`, {
                amount,
                email,
                name,
                contact,
            });

            alert(response.data.message); // Show success message
        } catch (error) {
            alert('Failed to create payment link');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Amount (INR):</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Contact:</label>
                <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Send Payment Link</button>
        </form>
    );
};

export default PaymentRequestForm;
