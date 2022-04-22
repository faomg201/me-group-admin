import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-listservice',
  templateUrl: './listservice.component.html',
  styleUrls: ['./listservice.component.css'],
})
export class ListserviceComponent implements OnInit {
  info: any
  data: Array<any>
  totalRecord: number|any
  page: number=1 
  p : number = 1

  constructor(private http: HttpClientService, private _router: Router) {
    this.data = new Array<any>()
    
  }

  ngOnInit(): void {
    this.getService();
    
  }

  onClick(ServID: number){
    this._router.navigate(['admin/administrator/editservice', ServID]);
  }

  getService(){
    this.http.getData('/services').pipe(first()).subscribe((response:any) => {
      console.log(response)
      if (response.status == true){
        this.info = response.data
      }
    },
    (error) =>{
      const response = error.error
      if(response.status == 500){
        alert('Failed cant Get Data');
      }
    })
  }
  deleteService(id : any){
    this.http.removeData('/services/'+id).pipe(first()).subscribe((response:any) => {
      console.log(response) 
      if(response.status ==true ){
        console.log(this.info)
        this.info = response.data
        this.getService()
      }     
    },
    (error) => {
      const response = error.error
      if(response.status == 500){
        alert('can not Delete Data');
      }
    })
  }
}
