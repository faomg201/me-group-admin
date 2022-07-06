import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'angular-web-storage';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject !: BehaviorSubject<any>;
  public currentUser!: Observable<any>;

  serveURl = environment.apiUrl;

  constructor(private http: HttpClient, public local: LocalStorageService) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): any {
    return localStorage.getItem('currentUser')
  }
  public get UsernameValue(): any {
    return localStorage.getItem('Username')
  }
  public get UserIDValue(): any {
    return localStorage.getItem('UserID')
  }
  // public get SetupTimeValue(): any {
  //   return localStorage.getItem('setupTime')
  // }
  public get userTokenValue(): any {
    return localStorage.getItem('userToken')
  }
  public get roleNameValue(): any {
    return localStorage.getItem('roleName')
  }



  Login(loginData: any, path: any) {
    return this.http.post(this.serveURl + loginData, path).pipe(map((response: any) => {
      if (response.statusCode == 201) {
        localStorage.setItem('currentUser', JSON.stringify(response.token));
        localStorage.setItem('Username', (response.data.Uadmin_username));
        localStorage.setItem('roleName', (response.data.role_name));
        localStorage.setItem('UserID', (response.data.user_id));
        // this.local.set('setupTime', response, 2, 'h');
        // this.local.set("setupTime", Date.now());
        // localStorage.setItem('setupTime', JSON.stringify({exp: Date()}));
        this.local.set('userToken', response.data, 1  , 'h');
        
        return response
      }
      return response
    }))


  }


}
