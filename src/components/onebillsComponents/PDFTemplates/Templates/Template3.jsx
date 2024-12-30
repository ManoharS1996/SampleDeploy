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
        width: 55,
        height: 50,
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
        width: '20%',
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


const Template3 = ({ Data, subtotal, tax, total, clientDetails, invoiceDetails, logoUrl, currencyPreferency }) => (
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
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Invoice to:</Text>
                    <Text style={{ fontSize: 14 }}>{clientDetails?.client_name || ''}</Text>
                    <Text style={{ fontSize: 14, color: '#6c757d' }}>{clientDetails?.billing_address?.city}</Text>.
                    <Text style={{ fontSize: 14, color: '#6c757d' }}>{clientDetails?.billing_address?.province}</Text>.
                    <Text style={{ fontSize: 14, color: '#6c757d' }}>{clientDetails?.billing_address?.country},{clientDetails?.billing_address?.zip_code}</Text>.
                </View>

                <View style={[styles.section, { display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent', width: '35%' }]}>
                    <View style={[styles.section, { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '0', backgroundColor: 'transparent', width: '100%' }]}>
                        <Text style={[styles.text, { fontSize: 15, fontWeight: '500', textAlign: 'right', width: '40%' }]}>Invoice:</Text>
                        <Text style={[styles.text, { fontSize: 14, fontWeight: '500', width: '40%', textAlign: 'right' }]}>{invoiceDetails?.id || ''}</Text>
                    </View>

                    <View style={[styles.section, { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '0', backgroundColor: 'transparent', width: '100%', alignItems: 'center' }]}>
                        <Text style={[styles.text, { fontSize: 15, fontWeight: '500', textAlign: 'right', width: '40%', }]}>Due Date:</Text>
                        <Text style={[styles.text, { fontSize: 14, fontWeight: '500', textAlign: 'right', width: '40%', }]}>{invoiceDetails?.dueDate || ''}</Text>
                    </View>

                </View>
            </View>

            {/* Table */}
            <View style={styles.table}>
                {/* Table Header */}
                <View style={[styles.tableRow]}>
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
                        <Text style={styles.tableCellHeader}>Unit price</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCellHeader}>Total</Text>
                    </View>
                </View>

                {/* Table Rows (Dynamic rendering of rows) */}
                {Data.map((item, index) => (
                    <View style={styles.tableRow} key={index}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{index + 1}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{item.item_id}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{item.item_name.length > 18
                                ? item.item_name.slice(0, 18) + "..."
                                : item.item_name}
                            </Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{item.quantity}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{currencyPreferency}{item.price}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{currencyPreferency}{item.quantity * item.price}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={[styles.section, { display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', backgroundColor: 'transparent', minWidth: '45%', padding: '0', borderRadius: '0' }]}>
                <View style={[styles.section, { display: 'flex', flexDirection: 'row', padding: '3', width: '40%', justifyContent: 'space-between', borderRadius: '0' }]}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'right', width: '35%' }}>Grand Total</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', width: '65%', textAlign: 'right' }}>{currencyPreferency}{total.toFixed(2)}</Text>
                </View>
            </View>

            <View style={[styles.section, { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                <Text>Thank you for your business!</Text>
            </View>

            <View style={styles.footer}>
                <Text style={{ color: '#000' }}>WONbills</Text>
                <Text style={{ color: '#000' }}>This is a system-generated invoice. No signature required.</Text>
            </View>
        </Page>
    </Document>
);


export default Template3