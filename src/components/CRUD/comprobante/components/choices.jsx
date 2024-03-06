const receiptTypes = {
    cliente: [
        {value: 'Factura C', tipo: "deuda" },
        {value: "Nota de Debito C", tipo: "deuda" },
        {value: 'Factura X', tipo: "deuda" },
        {value: "Nota de Debito X", tipo: "deuda" },
        {value: '---'},
        {value: 'Nota de Credito C', tipo: "nota-credito" },
        {value: 'Nota de Credito X', tipo: "nota-credito" },
        {value: '---'},
        {value: 'Recibo C', tipo: "pago" },
        {value: 'Recibo X', tipo: "pago" },
    ],
    proveedor: [
        {value: "Factura A", tipo: "deuda"},
        {value: "Nota de Debito A", tipo: "deuda"},
        {value: "Factura B", tipo: "deuda"},
        {value: "Nota de Debito B", tipo: "deuda"},
        {value: "Factura C", tipo: "deuda"},
        {value: "Nota de Debito C", tipo: "deuda"},
        {value: "Factura X", tipo: "deuda"},
        {value: "Nota de Debito X", tipo: "deuda"},
        {value: "Liquidacion A", tipo: "deuda"},
        {value: "Liquidacion B", tipo: "deuda"},
        {value: '---'},
        {value: "Nota de Credito A", tipo: "nota-credito" },
        {value: "Nota de Credito B", tipo: "nota-credito" },
        {value: "Nota de Credito C", tipo: "nota-credito" },
        {value: "Nota de Credito X", tipo: "nota-credito" },
        {value: '---'},
        {value: "Orden de Pago X", tipo: "pago"},
        {value: "Recibo C", tipo: "pago"},
        {value: "Recibo X", tipo: "pago"},
    ],
    caja: [
        {value: "Transferencia X", tipo: "pago"},
    ],  
    titulo: [
        {value: "Asiento X", tipo: "pago"},
    ],        
}


export default {
    receiptTypes,
}