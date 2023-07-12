import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BranchOfficeFormComponent } from 'src/app/shared/components/branch-office-form/branch-office-form.component';
import { DrawerEvent } from '../../event-listeners/drawer.event';
import { BranchOffice } from 'src/app/core/models/branch-office.class';

@Component({
  selector: 'app-branch-office-card',
  templateUrl: './branch-office-card.component.html',
  styleUrls: ['./branch-office-card.component.scss'],
  // changeDetection : ChangeDetectionStrategy.OnPush
})
export class BranchOfficeCardComponent implements OnInit {
  @Input() branchOffice: BranchOffice;
  color = '';

  constructor(private drawerEvent: DrawerEvent) { }

  ngOnInit(): void {
    this.getRandomColor();
  }

  getRandomColor() {
    this.color = '#' + ('000000' + Math.floor(0x1000000 * Math.random()).toString(16)).slice(-6);
  }

  editBranchOffice(branchOffice: BranchOffice) {
    this.drawerEvent.changeOpenComponent({ component: BranchOfficeFormComponent, data: branchOffice })
  }

}
