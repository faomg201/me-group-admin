import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { first } from 'rxjs';
import { LocalStorageService } from 'angular-web-storage'
import { LoginService } from '../../../../../login/service/login.service';
declare var $: any;
@Component({
  selector: 'app-baccount',
  templateUrl: './baccount.component.html',
  styleUrls: ['./baccount.component.css']
})
export class BaccountComponent implements OnInit {
  p = 1;
  infoAccount: any;
  infoRole: any;
  accountForm: FormGroup;
  ConfirmForm: FormGroup;
  submit = false;
  constructor(private loginService: LoginService,
    private _router: Router,
    private builder: FormBuilder,
    private toastService: HotToastService,
    private http: HttpClientService,
    private local: LocalStorageService) {
    this.accountForm = this.builder.group({
      Uadmin_username: ['', Validators.required],
      Uadmin_password: ['', Validators.required],
      Con_Uadmin_password: ['', Validators.required],
      Uadmin_firstname: ['', Validators.required],
      Uadmin_lastname: ['', Validators.required],
      role_id: ['', Validators.required]
    })
    this.ConfirmForm = this.builder.group({
      Confirm_password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAccount();
    this.onLoadingRole();
    this.infoAccount();
  }
  get a() {
    return this.accountForm.controls;
  }
  get b() {
    return this.ConfirmForm.controls;
  }
  Open_Cre_Acc_Modal() {
    $('#CREATE_ACCOUNT').modal('show');
  }
  Close_Cre_Acc_Modal() {
    $('#CREATE_ACCOUNT').modal('hide');
    this.accountForm.reset();
  }

  getnameDel(id: number) {
    console.log(id);
    this.http
      .getData('/user/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.infoAccount = response.data;
        console.log(this.infoAccount, +6666);
        console.log(this.infoAccount.Uadmin_username);
      });
  }
  getAccount() {
    this.http.getData('/user').pipe(first()).subscribe((response: any) => {
      if (response.status == true) {
        this.infoAccount = response.data;
        console.log(this.infoAccount);
      }
    }, (error) => {
      const response = error.error;
      if (response.status == 500) {
        alert('Failed cant Get Data');
      }
    })
  }
  onLoadingRole() {
    try {
      this.http
        .getData('/role')
        .pipe(first())
        .subscribe((response: any) => {
          if (response.status == true) {
            this.infoRole = response.data;
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  createAccount() {
    const password = this.accountForm.get('Uadmin_password')?.value;
    const conpassword = this.accountForm.get('Con_Uadmin_password')?.value;

    this.submit = true;
    if (this.accountForm.invalid) {
      this.toastService.error('กรอกข้อมูลผิดพลาด');
      return;
    }
    if (password != conpassword) {
      this.toastService.error('รหัสผ่านไม่ตรงกัน');
      return;
    }
    const formData = new FormData();
    formData.append('Uadmin_username', this.accountForm.get('Uadmin_username')?.value);
    formData.append('Uadmin_password', this.accountForm.get('Uadmin_password')?.value);
    formData.append('Uadmin_firstname', this.accountForm.get('Uadmin_firstname')?.value);
    formData.append('Uadmin_lastname', this.accountForm.get('Uadmin_lastname')?.value);
    formData.append('role_id', this.accountForm.get('role_id')?.value);

    this.http
      .createDatauser('/user', formData).pipe(first()).subscribe((response: any) => {
        console.log(response);

        if (response.statusCode == 201) {
          $('#CREATE_EMP').modal('hide');
          this.getAccount();
          this.Close_Cre_Acc_Modal();
          this.submit = false;
          this.toastService.success('เพิ่มข้อมูลสำเร็จ', {
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

        } else if (response.statusCode == 404) {
          this.toastService.error('มีชื่อผู้ใช้นี้แล้ว');
        }
      }
        ,
        (error) => {
          const response = error.error;
          if (response.status == 500) {
            this.toastService.error('เกิดข้อผิดพลาด');
          }
        }
      );
  }

  Open_DelAccount_Model() {
    $('#DelAccount').modal('show');
  }
  Close_DelAccount_Model() {
    $('#DelAccount').modal('hide');
    this.ConfirmForm.reset();
    this.submit = false;
  }
  deleteAcount(id: any) {
    this.submit = true;

    const UserName: any = this.loginService.UsernameValue;
    console.log(UserName);
    console.log(this.ConfirmForm.get('Confirm_password')?.value);
    const formData = new FormData();
    formData.append('Uadmin_username', UserName);
    formData.append('Uadmin_password', this.ConfirmForm.get('Confirm_password')?.value);

    this.loginService.Login('/user/signin', formData).pipe(first()).subscribe((response: any) => {
      console.log(response);
      if (response.status == true) {
        this.http
          .removeData('/user/' + id)
          .pipe(first())
          .subscribe(
            (response: any) => {
              if (response.status == true) {
                this.submit = false;
                this.getAccount();
                this.Close_DelAccount_Model();
                this.toastService.error('ลบข้อมูลสำเร็จ', {
                  style: {
                    border: '2px solid red',
                    padding: '16px',
                    color: 'red',
                  },
                  iconTheme: {
                    primary: 'red',
                    secondary: '#FFFAEE',
                  },
                });
                this.infoAccount = response.data;

              }
            },
            (error) => {
              const response = error.error;
              if (response.status == 500) {
                alert('can not Delete Data');
              }
            }
          );
      } else {
        this.ConfirmForm.reset();
      }
    },
      err => {
        const error = err.error.error
        console.log(error);
        alert('พบข้อผิดพลาด');
      }

    );
  }

  onClick(AccountID: number) {
    this._router.navigate(['admin/administrator/editaccount', AccountID]);
  }

}
