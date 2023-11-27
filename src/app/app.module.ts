import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AppRoutingModule } from './app-routing.module';
import { LayoutsModule } from './layouts/layouts.module';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './ngrx/reducers/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxGpAutocompleteModule } from '@angular-magic/ngx-gp-autocomplete';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true,
    connectInZone: true}),
    NgxGpAutocompleteModule.forRoot({
      loaderOptions: {
        apiKey: 'AIzaSyCwUA4-K4ghYYfmxHvrIPmX75NZpJKLzYA',
        libraries: ['places']
      }
    }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: LocationStrategy, useClass: HashLocationStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
