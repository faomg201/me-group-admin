import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../service/login.service';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(private router:Router, private loginService: LoginService,public local:LocalStorageService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.loginService.currentUserValue;
      const setupTime = this.loginService.SetupTimeValue
      const mytime = this.loginService.SetupTimeValue
      console.log(setupTime);
      console.log(currentUser);
      console.log(mytime);
      
      if(!setupTime){
        this.local.clear();
      }
      if(currentUser){
        this.router.navigate(['/admin/dashboard'])
        
      }
      return true
  }
  
}
