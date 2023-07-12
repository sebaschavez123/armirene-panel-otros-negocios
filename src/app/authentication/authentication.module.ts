import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../shared/components/button/button.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MessagesComponent } from '../shared/components/messages/messages.component';
import { BusinessFormComponent } from '../shared/components/business-form/business-form.component';

const antdModule= [
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzButtonModule,
]
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MessagesComponent,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    BusinessFormComponent,
    FormsModule,
    ButtonModule,
    ...antdModule
  ]
})
export class AuthenticationModule { }
