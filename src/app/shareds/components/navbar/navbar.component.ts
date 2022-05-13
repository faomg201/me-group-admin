import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../login/service/login.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService,public local:LocalStorageService) { }
  UserN:any = this.loginService.UsernameValue;
  
  ngOnInit(): void {
  }
  logout(){
    this.local.clear();
    location.reload();
  }

}
