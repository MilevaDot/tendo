import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { CartItem } from '../../declarations/Cart'

const styles = StyleSheet.create({
    header: {
        margin: '12px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLogo: {
        width: '140px',
        borderRadius: '10px',
        overflow: 'hidden',
    },
    table: {
        width: 'auto',
        margin: '12px'
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1 px solid #000'
    },
    tableHeader: {
        backgroundColor: '#eee',
        fontWeight: 'bold',
        fontSize: '10px',
    },
    cell: {
        fontSize: '10px',
        padding: '5px',
        borderRight: '1px solid #000',
        textAlign: 'center',
    },
    colItem: {
        width: '10%'
    },
    colName: {
        width: '40%',
    },
    colQuantity: {
        width: '15%',
    },
    colUnitPrice: {
        width: '15%',
    },
    colSubtotal: {
        width: '20%'
    },
    colTotal: {
        width: '80%',
    }
})

const Voucher = ({productCart}: {
    productCart: CartItem[]
}) => {
    return (
        <>
            <Document>
                <Page size='A4'>
                    <View style={styles.header}>
                        <View style={styles.headerLogo}>
                            <Image src='src\assets\logo_tendo.png' />
                        </View>
                        <View>
                            <Text>Boleta de Venta</Text>
                            <Text># B001-00000001</Text>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={[styles.cell, styles.colItem]}>Item</Text>
                            <Text style={[styles.cell, styles.colName]}>Nombre</Text>
                            <Text style={[styles.cell, styles.colQuantity]}>Cantidad</Text>
                            <Text style={[styles.cell, styles.colUnitPrice]}>P. Unitario</Text>
                            <Text style={[styles.cell, styles.colSubtotal]}>Subtotal</Text>
                        </View>
                        {
                            productCart.map((item, index) => (
                                <View key={item.product.$id} style={styles.tableRow} >
                                    <Text style={[styles.cell, styles.colItem]}>
                                        {index + 1}
                                    </Text>
                                    <Text style={[styles.cell, styles.colName]}>
                                        {item.product.name}
                                    </Text>
                                    <Text style={[styles.cell, styles.colQuantity]}>
                                        {item.quantity}
                                    </Text>
                                    <Text style={[styles.cell, styles.colUnitPrice]}>
                                        {item.product.price}
                                    </Text>
                                    <Text style={[styles.cell, styles.colSubtotal]}>
                                        {(item.product.price * item.quantity).toFixed(2)}
                                    </Text>
                                </View>
                            ))
                        }
                        <View style={styles.tableRow}>
                            <Text style={[styles.cell, styles.colTotal]}>Total</Text>
                            <Text style={[styles.cell, styles.colSubtotal]}>
                                {
                                    productCart?.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2)
                                }
                            </Text>
                        </View>
                    </View>
                </Page>
            </Document>
        </>
    )
}

export default Voucher