import { Component, OnInit } from '@angular/core';

import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup} from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-editworks',
  templateUrl: './editworks.component.html',
  styleUrls: ['./editworks.component.css']
})
export class EditworksComponent implements OnInit {

  info: any;
  token: any;
  worksForm = new FormGroup({
    goal_title: new FormControl(''),
    service_id: new FormControl(),
    goal_detail: new FormControl(''),
    goal_img: new FormControl('')
  });
  constructor(private http: HttpClientService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this._route.snapshot.params['id'];
    console.log(id)
    this.http.getData('/goals/'+id).pipe(first()).subscribe((response:any) => {
      if (response.status == true){
        this.info = response;
        this.worksForm = new FormGroup({    
          goal_title: new FormControl(this.info.data.goal_title),
          service_id: new FormControl(this.info.data.service_id),
          goal_detail: new FormControl(this.info.data.goal_detail)
        });
      }
    });
  }
  editWorks(){
    this.http.updateData('/goals/'+this._route.snapshot.params['id'],this.worksForm.value).pipe(first()).subscribe()
    window.location.reload();
  }

}
