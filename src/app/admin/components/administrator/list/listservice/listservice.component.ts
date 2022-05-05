import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import {
  FormControl, FormGroup, FormBuilder,
  Validators
} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
declare var $: any;
@Component({
  selector: 'app-listservice',
  templateUrl: './listservice.component.html',
  styleUrls: ['./listservice.component.css'],
})
export class ListserviceComponent implements OnInit {
  info: any;
  infoDel: any;
  p: number = 1;
  file: any;
  serviceForm: FormGroup;
  previewLoaded: boolean = false;
  submit = false;

  constructor(
    private http: HttpClientService,
    private _router: Router,
    private toastService: HotToastService,
    private builder: FormBuilder
  ) {
    this.serviceForm = this.builder.group({
      service_name: ['', Validators.required],
      service_detail: ['', Validators.required],
      service_img: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getService();
  }

  get a() {
    return this.serviceForm.controls;
  }


  onChangePhoto(e: any) {
    const file: File = e.target.files[0];
    if (file) {
      this.serviceForm.patchValue({
        service_img: file,
      });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.file = reader.result;
      };
    }
  }

  onClick(ServID: number) {
    this._router.navigate(['admin/administrator/editservice', ServID]);
  }

  getService() {
    this.http
      .getData('/services')
      .pipe(first())
      .subscribe(
        (response: any) => {
          if (response.status == true) {
            this.info = response.data;
          }
        },
        (error) => {
          const response = error.error;
          if (response.status == 500) {
            alert('Failed cant Get Data');
          }
        }
      );
  }
  getnameDel(id: number) {
    this.http
      .getData('/services/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.infoDel = response.data;
      });
  }
  deleteService(id: any) {
    this.http
      .removeData('/services/' + id)
      .pipe(first())
      .subscribe(
        (response: any) => {
          if (response.status == true) {
            console.log(this.info);
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
            this.info = response.data;
            this.getService();
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

  openModal() {
    $('#CREATE_SERVICE').modal('show');
  }

  resetFrom() {
    $('#CREATE_SERVICE').modal('hide');
    this.serviceForm.reset();
    this.previewLoaded = false;
  }

  createService() {
    this.submit = true;
    if (this.serviceForm.invalid) {
      this.toastService.error('กรอกข้อมูลผิดพลาด');
      return;
    }
    const formData = new FormData();
    formData.append('service_img', this.serviceForm.get('service_img')?.value);
    formData.append('service_detail', this.serviceForm.get('service_detail')?.value);
    formData.append('service_name', this.serviceForm.get('service_name')?.value);
    this.http.createData('/services', formData).pipe(first()).subscribe((response:any) => {
      if (response.statusCode == 201){
        $('#CREATE_SERVICE').modal('hide');
            this.resetFrom();
            this.getService();
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
      }
    },
    (error) => {
      const response = error.error;
      if (response.status == 500) {
        this.toastService.error('เกิดข้อผิดพลาด');
      }
    }
    );
  }
}
