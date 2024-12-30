// PDF2.js
import React, { useEffect, useState } from 'react';
import { pdf, PDFViewer } from '@react-pdf/renderer';

// Import constants and utility functions
import { currencySymbols } from '../DefaultData/DefaultData';
// import { calculateTotals } from './utils';
import Template1 from './Templates/Template1'; // Import the MyDocument component

const PDF1 = ({ id, items, generateAndDownload, clientVendorDetails, currency, dueDate }) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const formattedDate = new Date(dueDate).toLocaleDateString('en-GB');

    // Use the imported calculateTotals function
    const calculateTotals = () => {
        const subtotal = items.reduce((acc, item) => acc + item.quantity * parseFloat(item.price), 0);
        const tax = subtotal * 0; // 2% tax
        const total = subtotal + tax;
        return { subtotal, tax, total };
    };

    const { subtotal, tax, total } = calculateTotals();

    // Use the imported currencySymbols
    const currencySymbol = currencySymbols[currency];

    // Generate PDF Blob
    const generatePdf = async () => {
        const blob = await pdf(
            <Template1
                Data={items}
                subtotal={subtotal}
                tax={tax}
                total={total}
                clientDetails={{
                    client_name: clientVendorDetails?.client_name,
                    billing_address: clientVendorDetails?.billing_address,
                }}
                invoiceDetails={{
                    id,
                    date: new Date().toLocaleDateString(),
                    dueDate: formattedDate,
                }}
                logoUrl={clientVendorDetails?.company_logo}
                currencyPreferency={currencySymbol}
            />
        ).toBlob();

        const url = URL.createObjectURL(blob);
        setPdfUrl(url);

        if (generateAndDownload) {
            downloadPdf(url);
        }
    };

    // Trigger download
    const downloadPdf = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `Invoice_${id}.pdf`;
        link.click();
    };

    useEffect(() => {
        generatePdf();
    }, []); // Only runs once

    // return (
    //     <div>
    //         <div style={{ width: '100%', height: '700px', overflow: 'auto' }}>
    //             <PDFViewer width="100%" height="600px">
    //                 <Template1 Data={items} subtotal={subtotal} tax={tax} total={total} />
    //             </PDFViewer>
    //         </div>
    //         {pdfUrl && (
    //             <button onClick={() => downloadPdf(pdfUrl)} style={{ marginTop: 20 }}>
    //                 Download PDF
    //             </button>
    //         )}
    //     </div>
    // );
};

export default PDF1;
