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
          console.log(777);
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

}
