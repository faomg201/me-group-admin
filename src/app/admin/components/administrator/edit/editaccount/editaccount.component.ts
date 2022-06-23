import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { LoginService } from '../../../../../login/service/login.service';

declare var $: any;
@Component({
  selector: 'app-editaccount',
  templateUrl: './editaccount.component.html',
  styleUrls: ['./editaccount.component.css']
})
export class EditaccountComponent implements OnInit {
  infoAccountByid: any;
  infoRole: any;
  submit = false;
  accountForm: FormGroup;
  ConfirmForm: FormGroup;

  constructor(private loginService: LoginService, private http: HttpClientService, private _route: ActivatedRoute, private toastService: HotToastService, private router: Router,
    private builder: FormBuilder) {
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
    this.onLoadingRole();
    const id = +this._route.snapshot.params['id'];
    this.http.getData('/user/' + id).pipe(first()).subscribe((response: any) => {
      if (response.status == true) {
        this.infoAccountByid = response;
        this.accountForm = this.builder.group({
          Uadmin_username: [this.infoAccountByid.data.Uadmin_username, Validators.required],
          Uadmin_password: ['', Validators.required],
          Con_Uadmin_password: ['', Validators.required],
          Uadmin_firstname: [this.infoAccountByid.data.Uadmin_firstname, Validators.required],
          Uadmin_lastname: [this.infoAccountByid.data.Uadmin_lastname, Validators.required],
          role_id: [this.infoAccountByid.data.role_id, Validators.required],
        });
      }
    });
  }

  get a() {
    return this.accountForm.controls;
  }
  get b() {
    return this.ConfirmForm.controls
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

  getnameDel(id: number) {
    console.log(id);

    this.http
      .getData('/user/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.infoAccountByid = response.data;
      });
  }

  updateWorks() {
    this.submit = true;
    const UserName: any = this.loginService.UsernameValue;
    console.log(UserName);
    console.log(this.ConfirmForm.get('Confirm_password')?.value);
    const formData1 = new FormData();
    formData1.append('Uadmin_username', UserName);
    formData1.append('Uadmin_password', this.ConfirmForm.get('Confirm_password')?.value);

    const formData2 = new FormData();
    formData2.append('Uadmin_username', this.accountForm.get('Uadmin_username')?.value);
    formData2.append('Uadmin_password', this.accountForm.get('Uadmin_password')?.value);
    formData2.append('Uadmin_firstname', this.accountForm.get('Uadmin_firstname')?.value);
    formData2.append('Uadmin_lastname', this.accountForm.get('Uadmin_lastname')?.value);
    formData2.append('role_id', this.accountForm.get('role_id')?.value);
    this.loginService.Login('/user/signin', formData1).pipe(first()).subscribe((response: any) => {
      console.log(response);
      if (response.status == true) {
        this.http
      .updateData('/user/' + this._route.snapshot.params['id'], formData2)
      .pipe(first())
      .subscribe((response: any) => {
        console.log(response);
        if (response.statusCode == 201) {
          this.Close_EditAcc();
          this.ngOnInit();
          this.router.navigate(['/admin/administrator/baccount']);
          this.toastService.success('แก้ไขข้อมูลสำเร็จ', {
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
        }
      }, (error) => {
        const response = error.error;
        if (response.status == 500) {
          this.toastService.error('เกิดข้อผิดพลาด');
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
  openModal_DelAcc() {
    $('#DelAcc').modal('show');
  }
  openModal_EditAcc() {

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
    $('#EditAcc').modal('show');
    this.submit = false;
  }

  Close_DelAcc() {
    $('#DelAcc').modal('hide');
    this.ConfirmForm.reset();
    this.submit = false;
  }
  Close_EditAcc() {
    $('#EditAcc').modal('hide');
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
                this.Close_DelAcc();
                this.router.navigate(['/admin/administrator/baccount'])
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

}
