export const CLIENT_TABLE = {
    columns: [
        {
            title: 'Nombre ',
            compare: (a: any, b: any) => a.firstName.localeCompare(b.firstName),
            priority: false,
            name: 'firstName'
        },
        {
            title: 'Apellido',
            compare: (a: any, b: any) => a.lastName.localeCompare(b.lastName),
            priority: false,
            name: 'lastName'
        },
        {
            title: 'Documento',
            compare: (a: any, b: any) => a.dni.localeCompare(b.dni),
            priority: false,
            name: 'dni'
        },
        {
            title: 'Correo electrónico',
            compare: (a: any, b: any) => a.email.localeCompare(b.email),
            priority: false,
            name: 'email'
        },
        {
            title: 'Dirección',
            compare: (a: any, b: any) => a.address.localeCompare(b.address),
            priority: false,
            name: 'address'
        },
        {
            title: 'Teléfono',
            compare: (a: any, b: any) => a.phone.localeCompare(b.phone),
            priority: false,
            name: 'phone'
        },
        {
            title: '# Pedidos',
            compare: (a: any, b: any) => a.orders - b.orders,
            priority: false,
            name: 'orders'
        }
    ]
}


export const ORDER_TABLE = {
    columns: [
        {
            title: 'Id',
            compare: (a: any, b: any) => a.orderId.localeCompare(b.orderId),
            priority: false,
            name: 'orderId'
        },
        {
            title: 'Nombre cliente',
            compare: (a: any, b: any) => a.clientFirstName.localeCompare(b.clientFirstName),
            priority: false,
            name: 'clientFirstName'
        },
        {
            title: 'Apellido cliente',
            compare: (a: any, b: any) => a.clientLastName.localeCompare(b.clientLastName),
            priority: false,
            name: 'clientLastName'
        },
        {
            title: 'Telefono',
            compare: (a: any, b: any) => a.document.localeCompare(b.document),
            priority: false,
            name: 'clientPhone'
        },
        {
            title: 'Dirección',
            compare: (a: any, b: any) => a.email.localeCompare(b.email),
            priority: false,
            name: 'clientAddress'
        },
        {
            title: 'Estado',
            compare: (a: any, b: any) => a.address.localeCompare(b.address),
            priority: false,
            name: 'state'
        },
        // {
        //     title: 'Fecha',
        //     compare: (a: any, b: any) => a.address.localeCompare(b.date),
        //     priority: false
        // },
    ]
}