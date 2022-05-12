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
    this.currentUser = this. currentUserSubject.asObservable();  
    console.log(this.currentUser);
    
   }
   public get currentUserValue():any {
     console.log(this.currentUserSubject.value);
     
     return localStorage.getItem('currentUser')
   }


  Login(loginData: any, path: any) {    
    return this.http.post(this.serveURl+ loginData, path).pipe(map((response:any) => {
      if(response.statusCode == 200){
        localStorage.setItem('currentUser',JSON.stringify(response.token));
        // localStorage.setItem('Username',JSON.stringify(response.data))
        // localStorage.setItem('currentUser',JSON.stringify(response.token))
        return response
      }
      return response
    }))

    
  }
  

}
