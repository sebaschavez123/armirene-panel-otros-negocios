import { Client } from "./models/client.class";

export const CLIENT_TABLE = {
    columns: [
        // {
        //     title: 'Nombre cliente',
        //     compare: (a: Client, b: Client) => a.name.localeCompare(b.name),
        //     priority: false
        // },
        // {
        //     title: 'Documento',
        //     compare: (a: Client, b: Client) => a.document.localeCompare(b.document),
        //     priority: false
        // },
        // {
        //     title: 'Correo electrónico',
        //     compare: (a: Client, b: Client) => a.email.localeCompare(b.email),
        //     priority: false
        // },
        // {
        //     title: 'Dirección',
        //     compare: (a: Client, b: Client) => a.address.localeCompare(b.address),
        //     priority: false
        // },
        // {
        //     title: 'Teléfono',
        //     compare: (a: Client, b: Client) => a.phone.localeCompare(b.phone),
        //     priority: false
        // },
        // {
        //     title: '# Pedidos',
        //     compare: (a: Client, b: Client) => a.orders - b.orders,
        //     priority: false
        // }
    ]
}


export const ORDER_TABLE = {
    columns: [
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