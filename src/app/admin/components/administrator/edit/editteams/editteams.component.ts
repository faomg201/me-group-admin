import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editteams',
  templateUrl: './editteams.component.html',
  styleUrls: ['./editteams.component.css']
})
export class EditteamsComponent implements OnInit {

  previewLoaded=false;
  file:any;

  constructor() { }

  ngOnInit(): void {
  }

}
