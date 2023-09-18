import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AUTH_DATA, Storage } from './storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private _router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (Storage.getOne(AUTH_DATA).token) {
      return true;
    } else {
      this._router.navigateByUrl("/authentication/login")
      return false
    }
  }
}
