import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, pdf, PDFViewer, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        padding: 20,
        border: 'none',
        borderRadius: '10'
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    image: {
        width: 100,  // Adjust width as needed
        height: 40,  // Adjust height as needed
    },
    text: {
        fontSize: 14,
        lineHeight: 1.1, // Adjust line height for better readability
        width: '100%',  // or specify a fixed width like '80%'
        wordWrap: 'break-word', // Ensures long words are broken to fit within the width
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'none',
        borderWidth: 0,
        borderColor: 'transparent',
        marginBottom: 10,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
        borderBottom: '2px solid #ccc'
    },
    tableCol: {
        width: '25%', // Adjust the width of the columns
        borderStyle: 'none',
        borderWidth: 0,
        borderColor: 'transparent',
        padding: 5,
    },
    tableCellHeader: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    tableCell: {
        fontSize: 10,
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
        justifyContent: 'center'
    },
});

const ImgUrl = 'https://res.cloudinary.com/drtguvwir/image/upload/v1723893055/WON-Platform-Images/dljjqoyqqerf9axcn3od.png'

// Create Document Component
const MyDocument = ({ tableData }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            {/* Header */}
            <View style={[styles.section, { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent' }]}>
                <View style={[styles.section, { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0', backgroundColor: 'transparent' }]}>
                    <Image style={styles.image} src={ImgUrl} />
                </View>

                <Text style={{ fontSize: 34, fontWeight: 'bold' }}>INVOICE</Text>
            </View>

            {/* Address */}
            <View style={[styles.section, { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent' }]}>
                <View style={[styles.section, { display: 'flex', marginBottom: '0', backgroundColor: 'transparent', width: '35%' }]}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Invoice to:</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Daniel Gallego</Text>
                    <Text style={styles.text}>NowIt Services, Umashankar nagar, kanuru Vijayawada, 52007 </Text>
                </View>

                <View style={[styles.section, { display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent', width: '40%' }]}>
                    <View style={[styles.section, { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '0', backgroundColor: 'transparent', width: '100%' }]}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Invoice #</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>52131</Text>
                    </View>

                    <View style={[styles.section, { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '0', backgroundColor: 'transparent', width: '100%' }]}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Date </Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>01/02/2023</Text>
                    </View>

                </View>
            </View>

            {/* Table */}
            <View style={styles.table}>
                {/* Table Header */}
                <View style={[styles.tableRow, { borderTop: '2px solid #ccc' }]}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCellHeader}>Item</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCellHeader}>Description</Text>
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

            {/* Payment and total details remain the same */}

            <View style={[styles.section, { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                <Text>Thank you for your business!</Text>
                <Text style={{ borderTop: '2px solid yellow', paddingTop: '10px', width: '40%', textAlign: 'center' }}>Authorized Signed</Text>
            </View>

            <View style={styles.footer}>
                <Text>Footer text goes here</Text>
            </View>
        </Page>
    </Document>
);

// Main component
const PDFTemplate2 = () => {
    const [pdfUrl, setPdfUrl] = useState(null);

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
        { itemNumber: 4, description: 'Accessory', quantity: 3, price: '$5.99' }
    ];

    useEffect(() => {
        const generatePdf = async () => {
            const blob = await pdf(<MyDocument tableData={tableData} />).toBlob();
            const url = URL.createObjectURL(blob);
            console.log(url);
            setPdfUrl(url);
        };
        generatePdf();
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
                    <MyDocument tableData={tableData} />
                </PDFViewer>
            </div>

            <button onClick={handleDownload} style={{ marginBottom: 20 }}>
                Download PDF
            </button>
        </div>
    );
};

export default PDFTemplate2;
