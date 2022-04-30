import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-baccount',
  templateUrl: './baccount.component.html',
  styleUrls: ['./baccount.component.css']
})
export class BaccountComponent implements OnInit {
  p=1;
  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  onClick(){
    this._router.navigate(['admin/administrator/editaccount/1']);
  }

}
