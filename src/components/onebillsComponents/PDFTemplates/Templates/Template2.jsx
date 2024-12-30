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

// Stylesheet
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        padding: 0,
        fontFamily: 'Roboto Mono',
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
        marginBottom: 10,
    },
    table: {
        display: 'table',
        width: 'auto',
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        width: '20%',
        borderBottomWidth: 1,
        borderBottomColor: '#000', // Bottom border only
        padding: 5,
        fontSize: 12,
    },
    tableCell: {
        fontSize: 8,
    },
    tableCellHeader: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Roboto Mono',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '38px',
        textAlign: 'center',
        fontSize: 10,
        color: '#FFF',
        backgroundColor: '#c6e2f7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Roboto Mono',
        padding: 5
    },
});


const Template2 = ({ Data, subtotal, tax, total, clientDetails, invoiceDetails, logoUrl, currencyPreferency }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header Section */}
            <View style={{ backgroundColor: '#c6e2f7', padding: 10, borderRadius: 5 }} >
                <View style={[styles.section, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                    {/* Company Logo */}
                    <View style={{ width: '30%' }}>
                        <Image style={{ width: 55, height: 50 }} src={ImgUrl} />
                    </View>

                    {/* Title */}
                    <View style={{ width: '40%', textAlign: 'right' }}>
                        <Text style={[styles.title, { fontSize: 24 }]}>INVOICE</Text>
                    </View>
                </View>

                {/* Client and Invoice Details */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                    {/* Client Information */}
                    <View style={{ width: '45%' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Invoice to:</Text>
                        <Text style={{ fontSize: 14 }}>{clientDetails?.client_name || ''}</Text>
                        <Text style={{ fontSize: 14, color: '#6c757d' }}>{clientDetails?.billing_address?.city}</Text>.
                        <Text style={{ fontSize: 14, color: '#6c757d' }}>{clientDetails?.billing_address?.province}</Text>.
                        <Text style={{ fontSize: 14, color: '#6c757d' }}>{clientDetails?.billing_address?.country},{clientDetails?.billing_address?.zip_code}</Text>.
                    </View>

                    {/* Invoice Information */}
                    <View style={{ width: '45%', textAlign: 'right' }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Invoice #: {invoiceDetails?.id || ''}</Text>
                        <Text style={{ fontSize: 14 }}>Date: {invoiceDetails?.date || ''}</Text>
                        <Text style={{ fontSize: 14 }}>Due Date: {invoiceDetails?.dueDate || ''}</Text>
                    </View>
                </View>
            </View>

            {/* Table Section */}
            <View style={{ padding: 10 }}>
                <View style={[styles.table, { marginBottom: 20 }]}>
                    {/* Table Header */}
                    <View style={[styles.tableRow, { borderBottom: '2px solid #ccc' }]}>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>S.No</Text>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>ID</Text>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Name</Text>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Quantity</Text>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Unit price</Text>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Total</Text>
                    </View>

                    {/* Table Rows */}
                    {Data?.map((item, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={styles.tableCol}>{index + 1}</Text>
                            <Text style={styles.tableCol}>{item.item_id}</Text>
                            <Text style={styles.tableCol}>
                                {item.item_name.length > 18
                                    ? item.item_name.slice(0, 18) + "..."
                                    : item.item_name}
                            </Text>
                            <Text style={styles.tableCol}>{item.quantity}</Text>
                            <Text style={styles.tableCol}>{currencyPreferency}{item.price}</Text>
                            <Text style={styles.tableCol}>{currencyPreferency}{item.quantity * item.price}</Text>
                        </View>
                    ))}
                </View>


                {/* Totals Section */}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 10 }}>
                    <View style={{ width: '40%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTop: '2px solid #000', marginTop: 5, paddingTop: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Total:</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{currencyPreferency}{total.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Footer Section */}
            <View style={[styles.footer, { marginTop: 20, textAlign: 'center' }]}>
                <Text style={{ fontSize: 10, color: '#000' }}>WONbills</Text>
                <Text style={{ fontSize: 10, color: '#000' }}>Thank you for your business!</Text>
                <Text style={{ fontSize: 10, color: '#000', marginTop: 2 }}>
                    This is a system-generated invoice. No signature required.
                </Text>
            </View>
        </Page>
    </Document>
);

export default Template2