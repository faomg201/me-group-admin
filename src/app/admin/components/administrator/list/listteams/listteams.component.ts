import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listteams',
  templateUrl: './listteams.component.html',
  styleUrls: ['./listteams.component.css']
})
export class ListteamsComponent implements OnInit {
  previewLoaded = false;
  p=1;
  file:any;
  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  onClick(){
    this._router.navigate(['admin/administrator/editteams/1']);
  }

}
