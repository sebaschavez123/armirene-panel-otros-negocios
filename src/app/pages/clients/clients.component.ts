import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/core/models/client.class';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';
import { ClientFormComponent } from './client-form/client-form.component';
import { CLIENT_TABLE } from 'src/app/core/tables-info';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [NzModalService]
})
export class ClientsComponent implements OnInit {
  listOfColumn = CLIENT_TABLE.columns;
  clientModelList: Client = new Client;
  listOfData: Client[] = [
    //   { "id": "1", "name": "Aubrette MacKilroe", "document": "DU119BZ", "email": "amackilroe0@github.com", "address": "Apt 1225", "phone": "917-291-7177", "orders": 75 },
    //   { "id": "2", "name": "Clarette Driffill", "document": "0X9G3ZZ", "email": "cdriffill1@lycos.com", "address": "Room 1944", "phone": "923-935-5396", "orders": 4 },
    //   { "id": "3", "name": "Lizzie Zebedee", "document": "B51", "email": "lzebedee2@oaic.gov.au", "address": "Apt 419", "phone": "819-458-3365", "orders": 45 },
    //   { "id": "4", "name": "Lurlene McIlwrath", "document": "0NBS3ZX", "email": "lmcilwrath3@deliciousdays.com", "address": "Room 446", "phone": "437-876-3159", "orders": 16 },
    //   { "id": "5", "name": "Linc Springtorp", "document": "09UN07Z", "email": "lspringtorp4@weibo.com", "address": "PO Box 4053", "phone": "604-216-4378", "orders": 93 },
    //   { "id": "6", "name": "Dulcine Gonnely", "document": "HZ81ZZZ", "email": "dgonnely5@ox.ac.uk", "address": "PO Box 23364", "phone": "555-949-4158", "orders": 76 },
    //   { "id": "7", "name": "Karlotte Filler", "document": "10Y04ZG", "email": "kfiller6@java.com", "address": "Suite 40", "phone": "416-404-3139", "orders": 33 },
    //   { "id": "8", "name": "Shelia Carlone", "document": "0UTF4ZZ", "email": "scarlone7@ft.com", "address": "Room 1249", "phone": "126-736-5284", "orders": 37 },
    //   { "id": "9", "name": "Tiena Lehr", "document": "3E0J329", "email": "tlehr8@trellian.com", "address": "PO Box 837", "phone": "167-449-7358", "orders": 10 },
    //   { "id": "10", "name": "Ross Kirdsch", "document": "02NN3ZZ", "email": "rkirdsch9@ow.ly", "address": "Apt 1310", "phone": "272-851-6868", "orders": 29 },
    //   { "id": "11", "name": "Carina Plinck", "document": "0SW533Z", "email": "cplincka@1688.com", "address": "Apt 1558", "phone": "941-831-4875", "orders": 13 },
    //   { "id": "12", "name": "Jannel Prosch", "document": "0KU74KZ", "email": "jproschb@usda.gov", "address": "7th Floor", "phone": "910-269-9845", "orders": 8 },
    //   { "id": "13", "name": "Farly Collelton", "document": "04U03JZ", "email": "fcolleltonc@printfriendly.com", "address": "Apt 1780", "phone": "902-105-2334", "orders": 89 },
    //   { "id": "14", "name": "Cathryn Munford", "document": "0W3N3ZZ", "email": "cmunfordd@cdbaby.com", "address": "PO Box 94197", "phone": "771-498-8412", "orders": 40 },
    //   { "id": "15", "name": "Greg Lundy", "document": "0S9M4ZZ", "email": "glundye@bbb.org", "address": "Suite 33", "phone": "117-539-1877", "orders": 95 },
    //   { "id": "16", "name": "Anatole Lansbury", "document": "03B13ZX", "email": "alansburyf@wikispaces.com", "address": "8th Floor", "phone": "878-376-4595", "orders": 40 },
    //   { "id": "17", "name": "Rafa Hounihan", "document": "0UWHX3Z", "email": "rhounihang@hostgator.com", "address": "Suite 55", "phone": "350-845-3942", "orders": 53 },
    //   { "id": "18", "name": "Perrine Zellmer", "document": "021X49D", "email": "pzellmerh@elpais.com", "address": "Room 1805", "phone": "910-359-0042", "orders": 42 },
    //   { "id": "19", "name": "Lorilee Bantham", "document": "0XJD0ZZ", "email": "lbanthami@icq.com", "address": "Room 580", "phone": "766-153-8627", "orders": 54 },
    //   { "id": "20", "name": "Tedda Vidgeon", "document": "9WB1XLZ", "email": "tvidgeonj@feedburner.com", "address": "PO Box 91955", "phone": "665-936-1027", "orders": 4 }
  ]
  constructor(
    private modal: NzModalService,
    private drawerEvent: DrawerEvent) { }

  ngOnInit(): void {
  }

  setNewDataList(list: Client[]) {
    this.listOfData = list;
  }

  getTableActions(item): void {
    let { type, data } = item;
    if (type == 'edit') {
      this.editClient(data);
    }
    if (type == 'delete') {
      this.deleteClient(data);
    }
  }

  editClient(data) {
    this.drawerEvent.changeOpenComponent({ component: ClientFormComponent, data: data })
  }


  deleteClient(data) {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de eliminar este cliente?',
      nzContent: 'Si eliminas este cliente no podrás recuperarlo',
      nzOkText: 'Aceptar',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK', data),
      nzCancelText: 'Cancelar',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
