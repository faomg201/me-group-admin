import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/service/login.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { first } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  status: boolean | any
  token: any
  loginForm: FormGroup;
  submit = false;
  constructor(private toastService: HotToastService,private builder: FormBuilder, private http: LoginService, public local: LocalStorageService, private router: Router) {
    this.loginForm = this.builder.group({
      Uadmin_username: ['', Validators.required],
      Uadmin_password: ['', Validators.required]
    })
    
  }

  ngOnInit(): void {
    this.status = false;

  }
  get a() {
    return this.loginForm.controls;
  }


  login() {
    const formData = new FormData();
    // console.log(this.loginForm.get('Uadmin_username')?.value);
    // console.log(this.loginForm.get('Uadmin_password')?.value);
    
    
    formData.append('Uadmin_username', this.loginForm.get('Uadmin_username')?.value);
    formData.append('Uadmin_password', this.loginForm.get('Uadmin_password')?.value);
    
    this.http.Login('/user/signin', formData).pipe(first()).subscribe((response: any) => {
      if(response.status == true){
        this.toastService.success('เข้าสู่ระบบสำเร็จ', {
          duration: 10000,
          style: {
            border: '2px solid green',
            padding: '16px',
            color: 'green',
          },
          iconTheme: {
            primary: 'green',
            secondary: '#FFFAEE',
          },
        });
        this.router.navigate(['/admin/administrator/baccount'])
      }else{
        // console.log(response);
        this.toastService.error('รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง', {
          duration: 10000,
          style: {
            border: '2px solid red',
            padding: '16px',
            color: 'red',
          },
          iconTheme: {
            primary: 'red',
            secondary: 'red',
          },
        });
      }
      // this.router.navigate(['/admin/dashboard'])
 
      // if (response.data.user_id == 0) {
      //   this.router.navigate(['/login'])
      // } else if (response.data.user_id == 1) {
      //   this.router.navigate(['/admin/dashboard'])
      // } else {
      //   alert('รหัสผิดครับ จำไม่ได้อ่ะดี้');
      //   this.router.navigate(['www.google.co.th'])
      // }
    },
      err => {
        const error = err.error.error
        alert('เกิดข้อผิดพลาด');
      }

    );


  }
}


