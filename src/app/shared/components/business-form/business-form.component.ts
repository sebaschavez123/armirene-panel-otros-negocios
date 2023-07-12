import { Component } from '@angular/core';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { catchError, finalize, throwError } from 'rxjs';
import { BaseFormBusinessService } from 'src/app/core/baseForm/base-form-business.service';
import { BUSINESS_DATA, Storage, TEMPORAL_BUSINESS_QUANTITY, TEMPORAL_BUSINESS_TYPE } from 'src/app/core/storage';
import { LoadingService } from 'src/app/services/loading.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ButtonModule } from '../button/button.module';
import { MessagesComponent } from '../messages/messages.component';
import { CommonModule } from '@angular/common';
import { BranchOfficeFormComponent } from '../branch-office-form/branch-office-form.component';
import { BusinessFormVm } from 'src/app/core/view-model/business-form.vm';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
const antdModule = [
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzButtonModule,
  ButtonModule,
  FormsModule,
  ReactiveFormsModule,
  MessagesComponent,
  BranchOfficeFormComponent,
  CommonModule
]
@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.scss'],
  standalone: true,
  imports: [...antdModule],
  providers: [
    BaseFormBusinessService,
    MessagesService
  ]
})
export class BusinessFormComponent {
  public businessTypes = TEMPORAL_BUSINESS_TYPE;
  public businessQuantityList = TEMPORAL_BUSINESS_QUANTITY;
  public businessQuantity: number;
  public businessId: number;
  constructor(
    private _vm: BusinessFormVm,
    public _businessForm: BaseFormBusinessService,
    private _loadingService: LoadingService,
    private _messagesService: MessagesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    let { snapshot: { params } } = this._activatedRoute;
    this.businessId = Number(params['id']);
    if (this.businessId) {
      this.getBusinessById(this.businessId)
    }
  }

  getBusinessById(businessId) {
    this._vm.getBusinessById(businessId).subscribe(business => this._businessForm.pathFormData(business))
  }

  submitForm() {
    let { baseForm: { value } } = this._businessForm;
    if (this.businessId) {
      this.updateBusiness(value);
    } else {
      this.saveBusiness(value);
    }
  }

  updateBusiness(value) {
    this._vm.updateBusiness(value)
      .pipe(
        finalize(() => this._loadingService.loadingOff()),
      )
      .subscribe(business => {
        this._vm.selectBusiness(business)
        this._router.navigateByUrl("/dashboard/business")
      })
  }

  saveBusiness(value) {
    if (!this._businessForm.baseForm.invalid) {
      this._vm.saveBusiness(value)
        .pipe(
          finalize(() => this._loadingService.loadingOff()),
          catchError(err => {
            let { error: { message } } = err;
            this._messagesService.showErrors(message ? message : 'Error en la petición');
            return throwError(() => err);
          }),
        )
        .subscribe(business => {
          Storage.setAll(BUSINESS_DATA, business);
          this._vm.selectBusiness(business)
          this._vm.getBranchOfficeByBusiness(business.id);
          this._vm.getOrdersByBusiness(business.id)
          this._router.navigateByUrl("/dashboard/start-view")
        })
    } else {
      this.showFormError();
    }
  }

  onChangeBusinessQuantity(quantity) {
    if (this.businessQuantity) {
      const arr = <FormArray>this._businessForm.baseForm.controls['branchOfficeList'];
      arr.controls = [];
    }
    this.businessQuantity = quantity;
    for (let i = 0; i < this.businessQuantity; i++) {
      this._businessForm.addBranchOffice();
    }
  }

  showFormError() {
    Object.values(this._businessForm.baseForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  goBack() {
    this._location.back();
  }
}
