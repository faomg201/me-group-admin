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
  public get SetupTimeValue(): any {
    return localStorage.getItem('setupTime')
  }


  Login(loginData: any, path: any) {
    return this.http.post(this.serveURl + loginData, path).pipe(map((response: any) => {
      console.log(response.data);
      var timeout = setTimeout(function(){
        alert('this is executed after 5 seconds');
      }, 5000);

      this.local.set('timeout_event', timeout);
      if (response.statusCode == 200) {
        localStorage.setItem('currentUser', JSON.stringify(response.token));
        localStorage.setItem('Username', (response.data.Uadmin_username));
        this.local.set('setupTime', response, 1, 'h');
        return response
      }
      return response
    }))


  }


}
