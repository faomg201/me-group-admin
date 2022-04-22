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
  apiService = 'http://localhost:8000/services';
  apiWorks = 'http://localhost:8000/goals';
  

  constructor(private http: HttpClient) { }

  getData(path:any){
    console.log(path);
    console.log(this.serveURl+path);
    
    return this.http.get(this.serveURl+path)
  }
  createData(path:any, data:any){
    return this.http.post(this.serveURl+path, data)
  }

  updateData(path:any, data:any){
    return this.http.put(this.serveURl+path, data)
  }

  removeData(path:any){
    return this.http.delete(this.serveURl+path
    //   ,{
    //   headers:{
    //     'Content-Type': 'application/json'
    //   },
    //   withCredentials:true,
    // }
    );
  }

  // http://localhost:8000/static/turtle.jpeg

}
