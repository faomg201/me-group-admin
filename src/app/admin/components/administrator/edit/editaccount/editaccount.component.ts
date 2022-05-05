import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editaccount',
  templateUrl: './editaccount.component.html',
  styleUrls: ['./editaccount.component.css']
})
export class EditaccountComponent implements OnInit {
  infoAccountByid:any;
  infoRole:any;
  submit = false;
  accountForm: FormGroup;

  constructor(private http: HttpClientService, private _route: ActivatedRoute, private toastService: HotToastService, private router: Router,
    private builder: FormBuilder) {
    this.accountForm = this.builder.group({
      Uadmin_username: ['',Validators.required],
      Uadmin_password: ['',Validators.required],
      Con_Uadmin_password: ['',Validators.required],
      Uadmin_firstname: ['',Validators.required],
      Uadmin_lastname: ['',Validators.required],
      role_id: ['',Validators.required]
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
    this.http
      .getData('/user/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.infoAccountByid = response.data;
      });
  }

  updateWorks() {
    this.submit = true;
    if (this.accountForm.invalid) {
      this.toastService.error('กรอกข้อมูลผิดพลาด');
      return;
    }
    const formData = new FormData();
    formData.append('Uadmin_username', this.accountForm.get('Uadmin_username')?.value);
    formData.append('Uadmin_password', this.accountForm.get('Uadmin_password')?.value);
    formData.append('Uadmin_firstname', this.accountForm.get('Uadmin_firstname')?.value);
    formData.append('Uadmin_lastname', this.accountForm.get('Uadmin_lastname')?.value);
    formData.append('role_id', this.accountForm.get('role_id')?.value);
    this.http
      .updateData('/user/' + this._route.snapshot.params['id'], formData)
      .pipe(first())
      .subscribe((response: any) => {
        console.log(response);
        if (response.statusCode == 200) {
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
      },(error) => {
        const response = error.error;
        if (response.status == 500) {
          this.toastService.error('เกิดข้อผิดพลาด');
        }
      }
      );
    
  }

  deleteAcount(id: any) {
    this.http
      .removeData('/user/' + id)
      .pipe(first())
      .subscribe(
        (response: any) => {
          if (response.status == true) {
            console.log(this.infoAccountByid);
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
            this.infoAccountByid = response.data;
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
  }

}
