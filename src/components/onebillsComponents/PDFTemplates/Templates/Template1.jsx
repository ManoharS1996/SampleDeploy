// MyDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
const ImgUrl = 'https://res.cloudinary.com/dca9sij3n/image/upload/v1733218612/vdzpaijkr6k0fhvzsl8e.png'

// Register fonts
Font.register({
    family: 'Roboto',
    src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf',
});
Font.register({
    family: 'Noto Sans',
    src: 'https://fonts.gstatic.com/s/notosans/v26/o-0h3z5qPFs6ZVpqgOkFno1sqhrkAf_6bF92ZKw1n5k.ttf',
});

//Create styles
const styles = StyleSheet.create({
    page: {
        fontFamily: 'Roboto',
        padding: 10,
        fontSize: 12,
        color: '#333',
    },
    section: {
        fontFamily: 'Roboto',
        marginBottom: 20,
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 20,
        textAlign: 'right',
        marginRight: 0,
    },
    image: {
        fontFamily: 'Roboto',
        width: 55,
        height: 50,
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#333',
    },
    table: {
        fontFamily: 'Roboto',
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        fontFamily: 'Roboto',
        margin: 'auto',
        flexDirection: 'row',
    },
    tableCol: {
        fontFamily: 'Roboto',
        width: '16.6%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 8,
    },
    tableCellHeader: {
        fontFamily: 'Roboto',
        fontWeight: '600',
        backgroundColor: 'transparent'
    },
    tableCell: {
        fontFamily: 'Roboto',
        padding: 0,
        textAlign: 'left',
        backgroundColor: 'transparent'
    },
    footer: {
        fontFamily: 'Roboto',
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 10,
        color: '#555',
    },
});


// Document Component
const Template1 = ({ Data, subtotal, tax, total, clientDetails, invoiceDetails, logoUrl, currencyPreferency }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View>
                <View style={[styles.section, { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={styles.image} src={ImgUrl} />
                    </View>
                    <Text style={styles.title}>INVOICE</Text>
                </View>

                {/* Address and Invoice Details */}
                <View style={[styles.section, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <View style={{ width: '40%' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Invoice to:</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#6c757d' }}>{clientDetails?.client_name || 'John Doe'}</Text>
                        <Text style={styles.text}>{clientDetails?.billing_address?.city || 'New York'}, {clientDetails?.billing_address?.province || 'NY'}</Text>
                        <Text style={styles.text}>{clientDetails?.billing_address?.country || 'USA'}, {clientDetails?.billing_address?.zip_code || '10001'}</Text>
                    </View>

                    <View style={{ width: '40%', textAlign: 'right' }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Invoice: #{invoiceDetails?.id || '12345'}</Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Due Date: {invoiceDetails?.dueDate || '2024-11-27'}</Text>
                    </View>
                </View>
            </View>

            {/* Table */}

            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}><Text style={styles.tableCellHeader}>S.No</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCellHeader}>ID</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCellHeader}>Name</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCellHeader}>Quantity</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCellHeader}>Unit price</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCellHeader}>Total</Text></View>
                </View>
                {Data?.map((item, index) => (
                    <View style={styles.tableRow} key={index}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{index + 1}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{item.item_id}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{item.item_name.length > 18
                            ? item.item_name.slice(0, 18) + "..."
                            : item.item_name}</Text>
                        </View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{item.quantity}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{currencyPreferency} {item.price}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{currencyPreferency} {item.quantity * item.price}</Text></View>
                    </View>
                ))}
            </View>

            {/* Total Section */}
            <View style={[styles.section, { display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', padding: 10 }]}>
                <View style={{ width: '40%', textAlign: 'right' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 2, paddingTop: 4 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Grand Total</Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{currencyPreferency} {total.toFixed(2)}</Text>
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

export default Template1;
