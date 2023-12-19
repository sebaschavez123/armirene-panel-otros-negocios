import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DrawerEvent } from 'src/app/core/events/drawer.event';
import { ClientFormComponent } from './client-form/client-form.component';
import { CLIENT_TABLE } from 'src/app/core/tables-info';
import { Observable } from 'rxjs';
import { ClientsVm } from 'src/app/core/view-model/clients.vm';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [NzModalService]
})
export class ClientsComponent implements OnInit {
  listOfColumn = CLIENT_TABLE.columns;
  clientModelList: any = {
    firstName: '', lastName: '', dni: '', email: '', address: '', phone: '', orders: ""
  }
  listOfData$: Observable<any>;
  constructor(
    private modal: NzModalService,
    private drawerEvent: DrawerEvent,
    private _vm: ClientsVm,
    private _exportService: ExportService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.getClientsByBusiness(null);
  }

  getClientsByBusiness(values) {
    this.listOfData$ = (values && values[1].length >= 1) ? values[0] : this._vm.returnClientsByBusiness();
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

  exportExcel(listOfData$) {
    listOfData$.subscribe(clientList => {
      this._exportService.exportToExcel(clientList, 'clients_excel', 'clients');
    })
  }
}
