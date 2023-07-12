import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Business } from 'src/app/core/models/business.class';
import { BusinessVm } from 'src/app/core/view-model/business.vm';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class BusinessComponent {
  listOfData$: Observable<Business[]>

  constructor(
    private _vm: BusinessVm,
    private _router: Router,
  ) {

  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.getBusiness();
  }

  createBusiness() {
    this._router.navigateByUrl("/dashboard/business/business-form")
  }

  getBusiness() {
    this.listOfData$ = this._vm.returnBusiness()
  }

}
