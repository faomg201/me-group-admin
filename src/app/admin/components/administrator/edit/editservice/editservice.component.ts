import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup} from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-editservice',
  templateUrl: './editservice.component.html',
  styleUrls: ['./editservice.component.css']
})
export class EditserviceComponent implements OnInit {

  info: any;
  token: any;
  serviceForm = new FormGroup({    
    service_name: new FormControl(),
    service_detail: new FormControl(),
  });
  constructor(private http: HttpClientService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.http.getData('/services').pipe(first()).subscribe((response:any) => {
    //   console.log(response)
    //   if (response.status == true){
    //     this.info = response.data
    //   }
    // }
    // this.Loadservice();
    const id = +this._route.snapshot.params['id'];
    console.log(id)
    this.http.getData('/services/'+id).pipe(first()).subscribe((response:any) => {
      if (response.status == true){
        this.info = response;
        this.serviceForm = new FormGroup({    
          service_name: new FormControl(this.info.data.service_name),
          service_detail: new FormControl(this.info.data.service_detail),
        });
      }
    });
  }
  updateService(){
    this.http.updateData('/services/'+this._route.snapshot.params['id'],this.serviceForm.value).pipe(first()).subscribe()
    window.location.reload();
  }

}
