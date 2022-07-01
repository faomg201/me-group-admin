import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/service/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  roleName = this.loginService.roleNameValue;
  constructor(private loginService: LoginService) {  }

  ngOnInit(): void {
  }

}
