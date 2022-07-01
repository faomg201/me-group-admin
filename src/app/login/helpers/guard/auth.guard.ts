import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../service/login.service';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService, private local: LocalStorageService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.loginService.currentUserValue;
    const userToken = this.loginService.userTokenValue;
    const roleName = this.loginService.roleNameValue;
      console.log(roleName);
      
    const itemStr:any = this.loginService.SetupTimeValue
    
    
    console.log(userToken, 666);
    const item = JSON.parse(itemStr)
    const now:any = new Date()
    console.log()
    const PartN = window.location.pathname;
    if(PartN == '/admin/administrator/logs' && roleName == 'Editor'){
      // this.router.navigate(['/admin/administrator/baccount'])
      return false;
    }
    if (now> item) {
      // If the item is expired, delete the item from storage
      // and return null
      this.local.clear();
    }
    if(!userToken){
      this.local.clear();
      this.router.navigate(['/login'])
    }
    // var now:any = new Date().getTime();
    // if (itemStr == null) {
    //   localStorage.setItem('setupTime', now)
    // } else {
    //   if (now - itemStr > hours * 60 * 60 * 1000) {
    //     localStorage.clear()
    //     localStorage.setItem('setupTime', now);
    //   }
    // }
    if (currentUser) {
      // this.router.navigate(['/admin/dashboard'])
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }

}
