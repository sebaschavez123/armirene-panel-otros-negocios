import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Observable, Subscription, of } from 'rxjs';
import { Business } from 'src/app/core/models/business.class';
import { BUSINESS_DATA, Storage } from 'src/app/core/storage';
import { DashboardLayoutVm } from 'src/app/core/view-model/dashboard-layout.vm';
import { LoadingService } from 'src/app/services/loading.service';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';
@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  drawerRef;
  showDrawerRef = true;
  business$: Observable<Business>
  menuOptions = [
    { label: 'Inicio', icon: 'home', route: ['start-view'] },
    { label: 'Pedidos', icon: 'file-done', route: ['orders'] },
    { label: 'Clientes', icon: 'user', route: ['clients'] },
  ]
  closeDrawerSubscription: Subscription;
  openDrawerSubscription: Subscription;
  widthDrawerSubscription: Subscription;

  constructor(private drawerService: NzDrawerService,
    private drawerEvent: DrawerEvent,
    private vm: DashboardLayoutVm,
    private router: Router,
    public _loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.vm.selectBusiness(Storage.getAll(BUSINESS_DATA));
    this.business$ = this.vm.returnBusinessSelected();
    this.changeRoute();
    this.drawerEvents();
  }

  drawerEvents() {
    let { closeComponent, getComponent, getWidthDrawer } = this.drawerEvent;
    this.closeDrawerSubscription = closeComponent.subscribe(() => {
      this.drawerRef.close()
    })
    this.openDrawerSubscription = getComponent.subscribe(res => {
      this.openComponent(res)
    })
    this.widthDrawerSubscription = getWidthDrawer.subscribe(res => {
      this.drawerRef.nzWidth = res.width
    })
  }

  changeRoute() {
    this.router.events.subscribe((event: Event) => {
      if ((event instanceof NavigationStart && event.url.includes('business')) || this.router.url.includes('business')) {
        this.showDrawerRef = false;
      }
      if ((event instanceof NavigationStart && !event.url.includes('business')) || !this.router.url.includes('business')) {
        this.showDrawerRef = true;
      }
    });
  }

  openComponent({ component, data }: any): void {
    this.drawerRef = this.drawerService.create({
      nzTitle: '',
      nzWidth: '40%',
      nzContent: component,
      nzContentParams: {
        dataForm: data
      }
    });

    this.drawerRef.afterOpen.subscribe(() => {
    });

    this.drawerRef.afterClose.subscribe(data => {
    });
  }

  logout() {
    this.vm.logout();
  }

  onActivate(event) {
    window.scroll(0, 0);
  }

  ngOnDestroy() {
    this.openDrawerSubscription.unsubscribe();
    this.closeDrawerSubscription.unsubscribe();
    this.widthDrawerSubscription.unsubscribe();
  }
}
