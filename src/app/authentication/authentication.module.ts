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
import { RegisterComponent } from './register/register.component';
import { HomeAuthenticationComponent } from './home-authentication/home-authentication.component';
import { RouterModule } from '@angular/router';
import { PhoneModule } from '../shared/components/phone/phone.module';
import { DirectivesModule } from '../core/directives/directives.module';

const antdModule= [
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzButtonModule,
]
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeAuthenticationComponent,
  ],
  imports: [
    CommonModule,
    MessagesComponent,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    BusinessFormComponent,
    FormsModule,
    ButtonModule,
    PhoneModule,
    DirectivesModule,
    ...antdModule
  ]
})
export class AuthenticationModule { }
