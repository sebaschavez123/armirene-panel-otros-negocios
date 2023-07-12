import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Business } from 'src/app/core/models/business.class';
import { SharedModule } from '../../shared.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BusinessCardVm } from 'src/app/core/view-model/business-card.vm';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { BUSINESS_DATA, Storage } from 'src/app/core/storage';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, NzIconModule],
  providers: [NzModalService],
})
export class BusinessCardComponent {
  @Input() business: Business;

  constructor(
    public _vm: BusinessCardVm,
    private _modal: NzModalService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  deleteBusinessModal() {
    this._modal.confirm({
      nzTitle: '¿Estás seguro de eliminar este negocio?',
      nzContent: 'Si eliminas este negocio no podrás recuperarlo',
      nzOkText: 'Aceptar',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteBusiness(this.business.id),
      nzCancelText: 'Cancelar'
      // nzOnCancel: () => console.log("cancelar")
    });
  }

  deleteBusiness(businessId: number) {
    this._vm.deleteBusiness(businessId).subscribe()
  }

  updateBusiness(business: Business) {
    this._router.navigateByUrl(`/dashboard/business/business-form/${business.id}`)
  }

  selectBusiness(business: Business) {
    Storage.setAll(BUSINESS_DATA, business)
    this._vm.selectBusiness(business);
    this._router.navigateByUrl(`/dashboard/start-view`)
    this._vm.getBranchOfficeByBusiness(business.id);
    this._vm.getOrdersByBusiness(business.id)
  }
}
