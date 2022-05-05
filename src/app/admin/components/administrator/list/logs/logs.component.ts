import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  p=1;
  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    $('#REMOVE_ALL').modal('show');
  }

}
