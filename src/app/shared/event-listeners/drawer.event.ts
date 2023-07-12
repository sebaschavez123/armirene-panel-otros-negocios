import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class DrawerEvent {

  private closeDrawer = new Subject<any>();
  closeComponent = this.closeDrawer.asObservable();


  private openDrawer = new Subject<any>();
  getComponent = this.openDrawer.asObservable();

  private changeWidthDrawer = new Subject<any>();
  getWidthDrawer = this.changeWidthDrawer.asObservable();

  changeOpenComponent(attributes: any) {
    this.openDrawer.next(attributes);
  }

  changeWidthComponent(attributes: any) {
    this.changeWidthDrawer.next(attributes);
  }

  changeCloseComponent(attributes: any) {
    this.closeDrawer.next(attributes);
  }

}
