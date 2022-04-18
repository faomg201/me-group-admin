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
