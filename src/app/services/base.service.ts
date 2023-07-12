import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AUTH_DATA, Storage } from '../core/storage';
// import Swal from 'sweetalert2';
// import { User } from '../core/interfaces';
import { countryConfig } from 'src/country-config/country-config';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// import { permissionsCol, permissionsVen } from '../core/permission';
// import { AngularFireDatabase } from '@angular/fire/compat/database';
// import { OrderDetail } from '../core/models/orderDetail.class';

@Injectable({
  providedIn: 'root',
})

export class BaseService {

  private hds: HttpHeaders;

  gateway: string = countryConfig.backend;



  constructor(protected http: HttpClient) {
  }

  protected httpOptions(): { headers: HttpHeaders } {
    const data = {
      // 'rol': this.getLocalUser().rolUser,
      // 'correoUsuario': this.getLocalUser().email,
      // 'employeeNumber':  this.getLocalUser().employeeNumber,
      'Accept': 'application/json',
      'Authorization': `Bearer ${Storage.getAll(AUTH_DATA).token}`,
      'Content-Type': 'application/json',
      'COUNTRY': environment.indicator
    };
    // if(this.orderActive != null) data['orderId'] = this.orderActive?.orderId?.toString();
    return { headers: new HttpHeaders(data) };
  }

  get(url: string): Observable<any> {
    return this.http.get(url, this.httpOptions());
  }

  getWithJson(url: string, body: any) {
    body._method = 'get';
    return this.http.post(url, body, this.httpOptions());
  }

  // tslint:disable-next-line: ban-types
  getParams(url: string, param: Object) {
    let index = 0;
    Object.keys(param).forEach((b) => {
      index === 0 ? url += '?' : url += '&';
      url += b + '=' + param[b];
      index++;
    });
    return this.http.get(url, this.httpOptions());
  }

  post(url: string, body: any) {
    return this.http.post(url, body, this.httpOptions());
  }

  patch(url: string, body: any) {
    return this.http.patch(url, body, this.httpOptions());
  }

  put(url: string, body: any) {
    return this.http.put(url, body, this.httpOptions());
  }

  delete(url: string, body?: any) {
    let options = this.httpOptions();
    options['body'] = body
    return this.http.delete(url, options);
  }

  formatMoney(numberx, places, thousand, decimal) {
    numberx = numberx || 0;
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    const symbol = countryConfig.isColombia ? '$ ' : 'Bs. ';
    thousand = thousand || ',';
    decimal = decimal || '.';
    const negative = numberx < 0 ? '-' : '';
    const i = parseInt(numberx = Math.abs(+numberx || 0).toFixed(places), 10) + '';
    // tslint:disable-next-line: no-var-keyword
    var j =
      // tslint:disable-next-line: no-conditional-assignment
      (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
      (places ? decimal + Math.abs(numberx - +i).toFixed(places).slice(2) : '');

  }

  formattedDate(date: string) {
    const d = date.split('-');
    const formattedDate = `${d[1]}/${d[0]}/${d[2]}`
    return formattedDate;
  }

  // // tslint:disable-next-line: ban-types
  // basicLoadPromise(promise:Promise<any>, title:string, successMjs:string, errorMjs:string, aditional?:Function, nativeMessage:boolean = false){
  //   Swal.fire({
  //     title,
  //     text: 'Estamos realizando su petición, por favor espere.',
  //     showCancelButton: false,
  //     showConfirmButton:false,
  //     onBeforeOpen: ()=>{
  //       Swal.showLoading();
  //       return promise.then((rta:any)=>{
  //         Swal.hideLoading();
  //         Swal.close();
  //         if(successMjs) Swal.fire('', successMjs, 'success');
  //         if(aditional) aditional(true, rta);
  //       }, error=>{
  //         Swal.close();
  //         if(!nativeMessage) Swal.fire('', errorMjs, 'error');
  //         else Swal.fire('', error.error.message, 'error');
  //         if(aditional) aditional(false, error);
  //       })
  //     },
  //     allowOutsideClick: () => !Swal.isLoading()
  //   }).then((res:any)=>{});
  // }

  // get modules() {
  //   if (this.getLocalUser()) {
  //     const permissions = countryConfig.isColombia ? permissionsCol : permissionsVen;
  //     //console.log('permissions',this.getLocalUser().rolUser, permissions);
  //     return permissions[this.getLocalUser().rolUser];
  //   } else return null;
  // }

  // getPermissions (moduleName?: string){
  //   return this.modules[Object.keys(this.modules).filter(name => name.split('/')[0] === moduleName)[0]];
  // }

  getLocalUser(): any {
    return Storage.getAll('dataCount');
  }

  // set orderActive(order: OrderDetail | null) {
  //   if(order == null) Storage.remove('orderActive');
  //   else Storage.setAll('orderActive', order)
  // }

  // get orderActive() : OrderDetail | null {
  //   if(!Storage.check('orderActive')) return null;
  //   return Storage.getAll('orderActive');
  // }

  get dbTrackingUrl(): string {
    return countryConfig.isColombia ? 'https://stunning-base-delivery-tracking.firebaseio.com/' : 'https://oracle-services-vzla-delivery-tracking.firebaseio.com/';
  }

  get dbMessengerUrl(): string {
    return countryConfig.isColombia ? 'https://stunning-base-messengers.firebaseio.com/' : 'https://oracle-services-vzla-messengers.firebaseio.com/';
  }

  get dbMonitorUrl(): string {
    return countryConfig.isColombia ? 'https://stunning-base-monitor.firebaseio.com/' : 'https://oracle-services-vzla-monitor.firebaseio.com/';
  }

}
