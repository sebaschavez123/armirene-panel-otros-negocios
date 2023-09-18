export const CLIENT_TABLE = {
    columns: [
        {
            title: 'Nombre ',
            compare: (a: any, b: any) => a.firstName.localeCompare(b.firstName),
            priority: false
        },
        {
            title: 'Apellido',
            compare: (a: any, b: any) => a.lastName.localeCompare(b.lastName),
            priority: false
        },
        {
            title: 'Documento',
            compare: (a: any, b: any) => a.dni.localeCompare(b.dni),
            priority: false
        },
        {
            title: 'Correo electrónico',
            compare: (a: any, b: any) => a.email.localeCompare(b.email),
            priority: false
        },
        {
            title: 'Dirección',
            compare: (a: any, b: any) => a.address.localeCompare(b.address),
            priority: false
        },
        {
            title: 'Teléfono',
            compare: (a: any, b: any) => a.phone.localeCompare(b.phone),
            priority: false
        },
        {
            title: '# Pedidos',
            compare: (a: any, b: any) => a.orders - b.orders,
            priority: false
        }
    ]
}


export const ORDER_TABLE = {
    columns: [
        {
            title: 'Id',
            compare: (a: any, b: any) => a.orderId.localeCompare(b.orderId),
            priority: false
        },
        {
            title: 'Nombre cliente',
            compare: (a: any, b: any) => a.clientFirstName.localeCompare(b.clientFirstName),
            priority: false
        },
        {
            title: 'Apellido cliente',
            compare: (a: any, b: any) => a.clientLastName.localeCompare(b.clientLastName),
            priority: false
        },
        {
            title: 'Telefono',
            compare: (a: any, b: any) => a.document.localeCompare(b.document),
            priority: false
        },
        {
            title: 'Dirección',
            compare: (a: any, b: any) => a.email.localeCompare(b.email),
            priority: false
        },
        {
            title: 'Estado',
            compare: (a: any, b: any) => a.address.localeCompare(b.address),
            priority: false
        },
    ]
}