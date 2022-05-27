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
    const setupTime = this.loginService.SetupTimeValue
    console.log(setupTime, 666);
    console.log(currentUser);

    var hours = 1; // Reset when storage is more than 1hours
    var now:any = new Date().getTime();
    if (setupTime == null) {
      localStorage.setItem('setupTime', now)
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        localStorage.clear()
        localStorage.setItem('setupTime', now);
      }
    }
    if (currentUser) {
      // this.router.navigate(['/admin/dashboard'])
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }

}
