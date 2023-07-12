import { Component, OnInit } from '@angular/core';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';
import { BranchOfficeFormComponent } from '../../shared/components/branch-office-form/branch-office-form.component';
import { BranchOffice } from 'src/app/core/models/branch-office.class';
import { StartViewVm } from 'src/app/core/view-model/start-view.vm';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.scss']
})
export class StartViewComponent implements OnInit {
  listOfData$: Observable<BranchOffice[]>

  constructor(
    private _drawerEvent: DrawerEvent,
    private _vm: StartViewVm
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.getBranchOfficeByBusiness();
  }

  createBranchOffice() {
    this._drawerEvent.changeOpenComponent({ component: BranchOfficeFormComponent, data: new BranchOffice })
  }

  getBranchOfficeByBusiness() {
    this.listOfData$ = this._vm.returnBranchOfficeByBusiness()
  }
}
