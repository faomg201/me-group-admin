import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../shareds/_service/http-client.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  info: any;
  constructor(private addServ: HttpClientService) { }

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

}
