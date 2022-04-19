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
    return this.http.post<any>('http://localhost:8000/services', info)
    .pipe(map(data => {
      return data;
    }));
  }
  addTeams(info : any){
    return this.http.post<any>('http://localhost:8000/', info)
    .pipe(map(data => {
      return data;
    }));
  }
  addWorks(info : any){
    return this.http.post<any>('http://localhost:8000/goals', info)
    .pipe(map(data => {
      console.log(this.info);
      return data;
    }));
  }


  getServices(info: any){
    return this.http.get<any>('http://localhost:8000/services',info)
    .pipe(map(data => {
      if (data) {
        this.info = data;
        console.log(this.info);
        console.log(this.info.data);
      }
      return this.info;
    }));
  }

  getWorks(info: any){
    return this.http.get<any>('http://localhost:8000/goals',info)
    .pipe(map(data => {
      if (data) {
        this.info = data;
        console.log(this.info.data);
      }
      return this.info;
    }));
  }

  delServices(token: any,id :any){
    console.log(id)
    return this.http.delete<any>('http://localhost:8000/services/'+id)
  }

  delWorks(token: any,goal_id :any){
    console.log(goal_id)
    return this.http.delete<any>('http://localhost:8000/goals/'+goal_id)
  }

}
