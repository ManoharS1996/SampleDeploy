import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, pdf, PDFViewer, Image, Font } from '@react-pdf/renderer';

// Register the Fira Sans font
Font.register({
    family: 'Roboto Mono',
    fonts: [
        { src: '/fonts/Roboto/Roboto-Regular.ttf' }, // Regular
        { src: '/fonts/Roboto/Roboto-Italic.ttf', fontStyle: 'italic' }, // Italic
        { src: '/fonts/Roboto/Roboto-Bold.ttf', fontWeight: 'bold' }, // Bold
    ],
});

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        padding: 20,
        border: 'none',
        borderRadius: '10',
        fontFamily: 'Roboto Mono',
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
        fontFamily: 'Roboto Mono', 
    },
    monospaceText: {
        fontFamily: 'Roboto Mono', 
        fontSize: 12,
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 10,
        padding: '10 0',
        backgroundColor: '#fff',
        borderRadius: 5,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    image: {
        width: 100,  
        height: 40,  
    },
    text: {
        fontSize: 14,
        lineHeight: 1.1, 
        width: '100%',  
        wordWrap: 'break-word', 
        fontFamily: 'Roboto Mono',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'none',
        borderWidth: 0,
        borderColor: 'transparent',
        marginBottom: 10,
        fontFamily: 'Roboto Mono',
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
        borderBottom: '2px solid #ccc',
        fontFamily: 'Roboto Mono',
    },
    tableCol: {
        width: '25%', 
        borderStyle: 'none',
        borderWidth: 0,
        borderColor: 'transparent',
        padding: 5,
        fontFamily: 'Roboto Mono',
    },
    tableCellHeader: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Roboto Mono',
    },
    tableCell: {
        fontSize: 10,
        fontFamily: 'Roboto Mono',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '110%',
        height: '30px',
        textAlign: 'center',
        fontSize: 10,
        color: '#888',
        backgroundColor: '#c7ba07',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Roboto Mono',
    },
});

const ImgUrl = 'https://res.cloudinary.com/drtguvwir/image/upload/v1723893055/WON-Platform-Images/dljjqoyqqerf9axcn3od.png'

// Create Document Component
const MyDocument = ({ tableData, subtotal, tax, total }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            {/* Header */}
            <View style={[styles.section, { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent' }]}>
                <View style={[styles.section, { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0', backgroundColor: 'transparent' }]}>
                    <Image style={styles.image} src={ImgUrl} />
                </View>

                <Text style={styles.title}>
                    INVOICE
                </Text>

            </View>

            {/* Address */}
            <View style={[styles.section, { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent' }]}>
                <View style={[styles.section, { display: 'flex', marginBottom: '0', backgroundColor: 'transparent', width: '35%' }]}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Invoice to:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#6c757d' }}>Daniel Gallego</Text>
                    <Text style={[styles.text, { color: '#6c757d' }]}>NowIt Services, Umashankar nagar, kanuru Vijayawada, 52007 </Text>
                </View>

                <View style={[styles.section, { display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent', width: '35%' }]}>
                    <View style={[styles.section, { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '0', backgroundColor: 'transparent', width: '100%' }]}>
                        <Text style={[styles.text, { fontSize: 18, fontWeight: 'bold', textAlign: 'right', width: '35%' }]}>Invoice:</Text>
                        <Text style={[styles.text, { fontSize: 17, fontWeight: 'bold', width: '60%', textAlign: 'right' }]}>52131</Text>
                    </View>

                    <View style={[styles.section, { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '0', backgroundColor: 'transparent', width: '100%', alignItems: 'center' }]}>
                        <Text style={[styles.text, { fontSize: 18, fontWeight: 'bold', textAlign: 'right', width: '35%', }]}>Date:</Text>
                        <Text style={[styles.text, { fontSize: 17, fontWeight: 'bold', textAlign: 'right', width: '60%', }]}>01/02/2023</Text>
                    </View>

                </View>
            </View>

            {/* Table */}
            <View style={styles.table}>
                {/* Table Header */}
                <View style={[styles.tableRow, { borderTop: '2px solid #ccc' }]}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCellHeader}>ID</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCellHeader}>Name</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCellHeader}>Quantity</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCellHeader}>Price</Text>
                    </View>
                </View>

                {/* Table Rows (Dynamic rendering of rows) */}
                {tableData.map((item, index) => (
                    <View style={styles.tableRow} key={index}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{item.itemNumber}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{item.description}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{item.quantity}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{item.price}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={[styles.section, { display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', backgroundColor: 'transparent', minWidth: '45%', padding: '0', borderRadius: '0' }]}>
                <View style={[styles.section, { display: 'flex', flexDirection: 'row', padding: '3', width: '40%', justifyContent: 'space-between' }]}>
                    <Text style={{ fontSize: 13, fontWeight: 'bold',textAlign:'right',width:'35%' }}>Subtotal</Text>
                    <Text style={{ fontSize: 13, fontWeight: 'bold',width:'65%',textAlign:'right' }}>${subtotal.toFixed(2)}</Text>
                </View>
                <View style={[styles.section, { display: 'flex', flexDirection: 'row', padding: '3', width: '40%', justifyContent: 'space-between' }]}>
                    <Text style={{ fontSize: 13, fontWeight: 'bold',textAlign:'right',width:'35%' }}>Tax(2%)</Text>
                    <Text style={{ fontSize: 13, fontWeight: 'bold',width:'65%',textAlign:'right' }}>${tax.toFixed(2)}</Text>
                </View>
                <View style={[styles.section, { display: 'flex', flexDirection: 'row', padding: '3', width: '40%', justifyContent: 'space-between', borderTop: '2px solid #463f3a', borderRadius: '0' }]}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold',textAlign:'right',width:'35%' }}>Total</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', width:'65%',textAlign:'right' }}>${total.toFixed(2)}</Text>
                </View>
            </View>

            <View style={[styles.section, { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                <Text>Thank you for your business!</Text>
                <Text style={{ borderTop: '2px solid yellow', paddingTop: '10px', width: '30%', textAlign: 'center' }}>Authorized Signed</Text>
            </View>

            <View style={styles.footer}>
                <Text>Footer text goes here</Text>
            </View>
        </Page>
    </Document>
);

// Main component
const TestTemplate1 = ({ID,generateAndDownload}) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    console.log(ID, ' this is invoice ID here')

    // Sample table data
    const tableData = [
        { itemNumber: 1, description: 'Widget', quantity: 10, price: '$9.99' },
        { itemNumber: 2, description: 'Gadget', quantity: 5, price: '$19.99' },
        { itemNumber: 3, description: 'Tool', quantity: 7, price: '$15.00' },
        { itemNumber: 4, description: 'Accessory', quantity: 3, price: '$5.99' },
        { itemNumber: 1, description: 'Widget', quantity: 10, price: '$9.99' },
        { itemNumber: 2, description: 'Gadget', quantity: 5, price: '$19.99' },
        { itemNumber: 3, description: 'Tool', quantity: 7, price: '$15.00' },
        { itemNumber: 4, description: 'Accessory', quantity: 3, price: '$5.99' },
        { itemNumber: 1, description: 'Widget', quantity: 10, price: '$9.99' },
        { itemNumber: 2, description: 'Gadget', quantity: 5, price: '$19.99' },
        { itemNumber: 3, description: 'Tool', quantity: 7, price: '$15.00' },
        { itemNumber: 4, description: 'Accessory', quantity: 3, price: '$5.99' },
        { itemNumber: 1, description: 'Widget', quantity: 10, price: '$9.99' },
        { itemNumber: 2, description: 'Gadget', quantity: 5, price: '$19.99' },
        { itemNumber: 3, description: 'Tool', quantity: 7, price: '$15.00' },
        { itemNumber: 4, description: 'Accessory', quantity: 3, price: '$5.99' },
        { itemNumber: 1, description: 'Widget', quantity: 10, price: '$9.99' },
        { itemNumber: 2, description: 'Gadget', quantity: 5, price: '$19.99' },
        { itemNumber: 3, description: 'Tool', quantity: 7, price: '$15.00' },
        { itemNumber: 4, description: 'Accessory', quantity: 3, price: '$5.99' },
        { itemNumber: 1, description: 'Widget', quantity: 10, price: '$9.99' },
        { itemNumber: 2, description: 'Gadget', quantity: 5, price: '$19.99' },
        { itemNumber: 3, description: 'Tool', quantity: 7, price: '$15.00' },
        { itemNumber: 4, description: 'Accessory', quantity: 3, price: '$5.99' },
        { itemNumber: 1, description: 'Widget', quantity: 10, price: '$9.99' },
        { itemNumber: 2, description: 'Gadget', quantity: 5, price: '$19.99' },
        { itemNumber: 3, description: 'Tool', quantity: 7, price: '$15.00' },
        { itemNumber: 4, description: 'Accessory', quantity: 3, price: '$5.99' },
        { itemNumber: 1, description: 'Widget', quantity: 10, price: '$9.99' },
        { itemNumber: 2, description: 'Gadget', quantity: 5, price: '$19.99' },
        { itemNumber: 3, description: 'Tool', quantity: 7, price: '$15.00' },
        { itemNumber: 4, description: 'Accessory', quantity: 3, price: '$5.99' },
        { itemNumber: 1, description: 'Widget', quantity: 10, price: '$9.99' },
        { itemNumber: 2, description: 'Gadget', quantity: 5, price: '$19.99' },
        { itemNumber: 3, description: 'Tool', quantity: 7, price: '$15.00' },
        { itemNumber: 4, description: 'Accessory', quantity: 3, price: '$5.99' },
        { itemNumber: 1, description: 'Widget', quantity: 10, price: '$9.99' },
        { itemNumber: 2, description: 'Gadget', quantity: 5, price: '$19.99' },
        { itemNumber: 3, description: 'Tool', quantity: 7, price: '$15.00' },
        { itemNumber: 4, description: 'Accessory', quantity: 3, price: '$5.99' },

    ];

    // Function to calculate total details
    const calculateTotals = () => {
        const subtotal = tableData.reduce((acc, item) => {
            const itemPrice = parseFloat(item.price.replace('$', ''));
            return acc + (itemPrice * item.quantity);
        }, 0);

        const taxRate = 0.02; // 2% tax
        const tax = subtotal * taxRate;
        const total = subtotal + tax;

        return { subtotal, tax, total };
    };

    const { subtotal, tax, total } = calculateTotals();

    const generatePdf = async () => {
        const blob = await pdf(
            <MyDocument tableData={tableData} subtotal={subtotal} tax={tax} total={total} />
        ).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);

        // If the component is supposed to download the PDF immediately
        if (generateAndDownload) {
            downloadPdf(url);
        }
    };

    const downloadPdf = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `INV${ID}.pdf`; // Specifying the file name here
        link.click();
    };

    useEffect(() => {
        generatePdf()
    }, []);

    

    const handleDownload = () => {
        if (pdfUrl) {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'document.pdf'; // You can specify the file name here
            link.click();
        }
    };

    return (
        <div style={{ width: '100%', height: '700px', overflow: 'auto', border: '2px solid red' }}>
            <div style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                <PDFViewer showToolbar={false} style={{ width: '341.4px', height: '481px' }}>
                    <MyDocument tableData={tableData} subtotal={subtotal} tax={tax} total={total} />
                </PDFViewer>
            </div>

            <button onClick={handleDownload} style={{ marginBottom: 20 }}>
                Download PDF
            </button>
        </div>
    );
};

export default TestTemplate1;