import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BranchOffice } from 'src/app/core/models/branch-office.class';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { PhoneModule } from 'src/app/shared/components/phone/phone.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BaseFormBusinessService } from 'src/app/core/baseForm/base-form-business.service';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { BranchOfficeFormVM } from 'src/app/core/view-model/branch-office-form.vm';
import { DrawerEvent } from '../../event-listeners/drawer.event';
import { CitiesSelectComponent } from '../cities-select/cities-select.component';
import { AdressAutocompleteComponent } from '../adress-autocomplete/adress-autocomplete.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/reducers/app.reducer';
import { saveLatLng } from 'src/app/ngrx/actions/map.actions';

const MODULES = [
  ButtonModule,
  ReactiveFormsModule,
  NzFormModule,
  PhoneModule,
  NzInputModule,
  NzSelectModule,
  CommonModule,
  MapComponent,
  CitiesSelectComponent,
  AdressAutocompleteComponent
]
@Component({
  selector: 'app-branch-office-form',
  templateUrl: './branch-office-form.component.html',
  styleUrls: ['./branch-office-form.component.scss'],
  standalone: true,
  providers: [NzModalService, BaseFormBusinessService],
  imports: [...MODULES]
})
export class BranchOfficeFormComponent implements OnInit {

  @Input() form: FormGroup
  @Input() dataForm: BranchOffice;
  public showDrawerActions: boolean;
  constructor(
    private _modal: NzModalService,
    private _branchOfficeForm: BaseFormBusinessService,
    private _vm: BranchOfficeFormVM,
    private _drawerEvent: DrawerEvent,
    private _store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.dataForm) {
      this.form = this._branchOfficeForm.getBranchOfficeFormGroup(new BranchOffice);
      this.form.patchValue({ ...this.dataForm })
      this.showDrawerActions = true;
    } else {
      this.showDrawerActions = false;
    }
  }

  deleteBranchOffice() {
    this._modal.confirm({
      nzTitle: '¿Estás seguro de eliminar esta sucursal?',
      nzContent: 'Si eliminas esta sucursal no podrás recuperarla',
      nzOkText: 'Aceptar',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteBranchOfficeByBusiness(this.dataForm),
      nzCancelText: 'Cancelar',
      nzOnCancel: () => this.closeDrawer()
    });
  }

  saveBranchOffice() {
    if (!this.form.invalid) {
      this._vm.saveBranchOffice(this.form.value).subscribe(() => {
        this.closeDrawer()
      })
    } else {
      this.showFormError();
    }
  }

  deleteBranchOfficeByBusiness(data) {
    this._vm.deleteBranchOfficeByBusiness(data).subscribe(() => this.closeDrawer())
  }

  closeDrawer() {
    this._drawerEvent.changeCloseComponent(true)
  }

  updateBranchOffice(data) {
    const body = {
      ...data,
      ...this.form.value
    }
    this._vm.updateBranchOffice(body).subscribe(() => this.closeDrawer())
  }

  getCoordinates(coordinates) {
    let { lat, lng } = coordinates
    this.form.get('lat')?.setValue(lat);
    this.form.get('lng')?.setValue(lng);
  }

  showFormError() {
    Object.values(this.form.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  ngOnDestroy() {
    let latLng = {};
    this._store.dispatch(saveLatLng({ latLng }))
  }
}