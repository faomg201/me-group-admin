import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../service/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private loginService: LoginService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.loginService.currentUserValue;
      
      // const Username = this.loginService.UsernameValue;
      // console.log(Username); 
      console.log(currentUser);
      if(currentUser){
        // this.router.navigate(['/admin/dashboard'])
        return true;
      }
      this.router.navigate(['/login'])
      return false;
  }
  
}
