import React, { useState } from 'react';
import axios from 'axios';

const PaymentRequest = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [amount, setAmount] = useState('');
    const [invoiceId, setInvoiceId] = useState('');
    const [clientId, setClientId] = useState('');
    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [email, setEmail] = useState('');

    const sendPaymentRequest = async () => {
        try {
            const response = await axios.post(`${apiUrl}/create-order`, {
                amount,
                invoiceId,
                clientId,
                name,
                dueDate,
                email
            });

            alert('Payment request sent! Check your email.');
        } catch (error) {
            console.error('Error sending payment request:', error);
        }
    };

    return (
        <div>
            <h2>Send Payment Request</h2>
            <input type="text" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
            <input type="text" placeholder="Invoice ID" value={invoiceId} onChange={e => setInvoiceId(e.target.value)} />
            <input type="text" placeholder="Client ID" value={clientId} onChange={e => setClientId(e.target.value)} />
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="text" placeholder="Due Date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={sendPaymentRequest}>Send Payment Request</button>
        </div>
    );
};

export default PaymentRequest;
