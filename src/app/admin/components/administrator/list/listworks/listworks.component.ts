import { Component, OnInit } from '@angular/core';
import { HttpClientService} from '../../../../../shareds/_service/http-client.service'

@Component({
  selector: 'app-listworks',
  templateUrl: './listworks.component.html',
  styleUrls: ['./listworks.component.css']
})
export class ListworksComponent implements OnInit {
  info:any;
  constructor(private addServ: HttpClientService) { }

  ngOnInit(): void {
    this.Loadworks();
  }

  Loadworks() {
    try {
      this.addServ.getWorks(this.info).subscribe(
        (data) => {
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

  delWorks(goal_id : any){
    // console.log(goal_id)
    // console.log(this.infoForm.get('goal_id')?.value);
    try {
      this.addServ.delWorks(this,goal_id).subscribe(
        data => {
          this.info = data;
          this.Loadworks()
          console.log(this.info)
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }    
  }

}
