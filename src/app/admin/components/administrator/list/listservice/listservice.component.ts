import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';

@Component({
  selector: 'app-listservice',
  templateUrl: './listservice.component.html',
  styleUrls: ['./listservice.component.css'],
})
export class ListserviceComponent implements OnInit {
  info: any;
  constructor(private addServ: HttpClientService) {}

  ngOnInit(): void {
    this.Loadservice();
  }

  Loadservice() {
    try {
      this.addServ.getServices(this.info).subscribe(
        (data) => {
          console.log(666666);
          console.warn('data',data);
          this.info = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  delServ(id : any){
    // console.log(id)
    // console.log(this.infoForm.get('id')?.value);
    try {
      this.addServ.delServices(this,id).subscribe(
        data => {
          this.info = data;
          this.Loadservice()
          console.log(this.info)
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }    
  }
}
