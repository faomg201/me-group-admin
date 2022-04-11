import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  serveURl = environment.apiUrl;
  info: any;
  constructor(private http: HttpClient) { }

  addService(info : any){
    return this.http.post<any>('http://0de8-183-88-7-39.ngrok.io/services', info)
    .pipe(map(data => {
      return data;
    }));
  }
  addTeams(info : any){
    return this.http.post<any>('http://192.168.1.93:8000/teams', info)
    .pipe(map(data => {
      return data;
    }));
  }
  addWorks(info : any){
    return this.http.post<any>('http://192.168.1.93:8000/works', info)
    .pipe(map(data => {
      return data;
    }));
  }

}
