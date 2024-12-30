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
        padding: 5,
        fontSize: 12,
        color: '#333',
    },
    section: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'right',
        marginRight: 30,
    },
    image: {
        width: 60,
        height: 60,
    },
    text: {
        fontSize: 12,
        color: '#333',
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableCol: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 8,
    },
    tableCellHeader: {
        fontWeight: 'bold',
        backgroundColor: '#f3f3f3',
    },
    tableCell: {
        padding: 8,
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '112%',
        height: '30px',
        textAlign: 'center',
        fontSize: 10,
        color: '#000',
        backgroundColor: '#9bc1f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Roboto Mono',
    },
});



const ImgUrl = 'https://res.cloudinary.com/drtguvwir/image/upload/v1723893055/WON-Platform-Images/dljjqoyqqerf9axcn3od.png'

// Create Document Component
const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={{ padding: 10, backgroundColor: '#9bc1f5' }}>
                <View
                    style={[
                        styles.section,
                        {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        },
                    ]}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={styles.image} src="https://via.placeholder.com/60" />
                    </View>
                    <Text style={styles.title}>INVOICE</Text>
                </View>

                {/* Address */}
                <View
                    style={[
                        styles.section,
                        { flexDirection: 'row', justifyContent: 'space-between' },
                    ]}
                >
                    {/* Client Address */}
                    <View style={{ width: '40%' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Invoice to:</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#6c757d' }}>
                            John Doe
                        </Text>
                        <Text style={[styles.text, { color: '#6c757d' }]}>
                            New York, NY
                        </Text>
                        <Text style={[styles.text, { color: '#6c757d' }]}>
                            USA, 10001
                        </Text>
                    </View>

                    {/* Invoice Details */}
                    <View style={{ width: '40%', textAlign: 'right' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Invoice:</Text>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>#12345</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Date:</Text>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>2024-11-27</Text>
                    </View>
                </View>
            </View>

            {/* Table */}
            <View style={{ padding: 10 }}>
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={[styles.tableRow, { backgroundColor: '#f3f3f3' }]}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCellHeader}>S.No</Text>
                        </View>
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

                    {/* Table Rows */}
                    {[1, 2, 3].map((item, index) => (
                        <View style={styles.tableRow} key={index}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{index + 1}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>ID-{index + 100}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Item {index + 1}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>2</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>$50.00</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Totals Section */}
                <View
                    style={[
                        styles.section,
                        {
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                            padding: 10,
                        },
                    ]}
                >
                    <View style={{ width: '40%', textAlign: 'right' }}>
                        {/* Subtotal */}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottomWidth: 1,
                                borderBottomColor: '#ccc',
                                paddingBottom: 4,
                            }}
                        >
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>Subtotal</Text>
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>$150.00</Text>
                        </View>

                        {/* Tax */}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottomWidth: 1,
                                borderBottomColor: '#ccc',
                                paddingBottom: 4,
                            }}
                        >
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>Tax (2%)</Text>
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>$3.00</Text>
                        </View>

                        {/* Total */}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderTopWidth: 2,
                                borderTopColor: '#463f3a',
                                paddingTop: 4,
                            }}
                        >
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Total</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>$153.00</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text>WONbills</Text>
                <Text>Thank you for your business!</Text>
                <Text>This is a system-generated invoice. No signature required.</Text>
            </View>

        </Page>
    </Document>
);





// Main component
const TestTemplate2 = ({ id, items, generateAndDownload }) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    console.log(items, ' this is invoice ID here')

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
            <MyDocument Data={tableData} subtotal={subtotal} tax={tax} total={total} />
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
        link.download = `INV${id}.pdf`; // Specifying the file name here
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
                    <MyDocument Data={tableData} subtotal={subtotal} tax={tax} total={total} />
                </PDFViewer>
            </div>

            <button onClick={handleDownload} style={{ marginBottom: 20 }}>
                Download PDF
            </button>
        </div>
    );
};

export default TestTemplate2;



