import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from '../icons-provider.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { ButtonModule } from '../shared/components/button/button.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { LoadingModule } from '../shared/components/loading/loading.module';
import { MessagesComponent } from '../shared/components/messages/messages.component';
import { LoadingService } from '../services/loading.service';
import { MessagesService } from '../services/messages.service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzProgressModule } from 'ng-zorro-antd/progress';

const COMPONENTS = [AuthenticationLayoutComponent, DashboardLayoutComponent]


@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    NzButtonModule,
    NzDropDownModule,
    NzPageHeaderModule,
    NzProgressModule,
    ButtonModule,
    RouterModule,
    NzDrawerModule,
    NzAvatarModule,
    LoadingModule,
    NzToolTipModule
  ],
  providers: [
    LoadingService,
    MessagesService
  ],
})
export class LayoutsModule { }
