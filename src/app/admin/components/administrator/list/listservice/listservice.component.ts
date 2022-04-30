import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

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
  serviceForm = new FormGroup({
    service_name: new FormControl(''),
    service_detail: new FormControl(''),
    service_img: new FormControl(''),
  });

  previewLoaded: boolean = false;

  constructor(
    private http: HttpClientService,
    private _router: Router,
    private toastService: HotToastService
  ) {}

  ngOnInit(): void {
    this.getService();
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
          console.log(response);
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
    console.log(id);
    this.http
      .getData('/services/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.infoDel = response.data;
        console.log(this.infoDel, +6666);
        console.log(this.infoDel.service_name);
      });
  }
  deleteService(id: any) {
    this.http
      .removeData('/services/' + id)
      .pipe(first())
      .subscribe(
        (response: any) => {
          console.log(response);
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

  // resetFrom() {
  //   console.log(this.serviceForm.get('service_img')?.value.name);
  //   this.serviceForm.reset();
  //   this.previewLoaded = false;
  // }
  createService() {
    console.log(this.serviceForm.get('service_name')?.value);
    console.log(this.serviceForm.get('service_detail')?.value);
    console.log(this.serviceForm.get('service_img')?.value.name);
    console.log(this.serviceForm.value, +6666);

    if (
      !RegExp('[ก-๙a-zA-Z]+$').test(this.serviceForm.get('service_name')?.value)
    ) {
      this.toastService.warning('ใส่ชื่อบริการไม่ถูกต้อง กรุณากรอกใหม่');
    } else if (
      !RegExp('[ก-๙a-zA-Z0-9\\s]+$').test(
        this.serviceForm.get('service_detail')?.value
      )
    ) {
      this.toastService.warning('กรุณากรอกรายละเอียดบริการ');
    } else if (
      !RegExp('^.*.(jpg|JPG|png|PNG)$').test(
        this.serviceForm.get('service_img')?.value.name
      )
    ) {
      this.toastService.warning('กรุณาใส่รูปภาพ');
    } else if (this.serviceForm.status == 'INVALID') {
      this.toastService.warning('กรุณากรอกข้อมูลให้ครบ');
    } else {
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
      const formData = new FormData();
      formData.append(
        'service_img',
        this.serviceForm.get('service_img')?.value
      );
      formData.append(
        'service_detail',
        this.serviceForm.get('service_detail')?.value
      );
      formData.append(
        'service_name',
        this.serviceForm.get('service_name')?.value
      );
      console.log(this.serviceForm.value);
      this.http.createData('/services', formData).pipe(first()).subscribe();
      setTimeout('location.reload(true);', 2000);
    }
  }

  // timedRefresh(timeoutPeriod :any) {
  //   setTimeout("location.reload(true);",timeoutPeriod);
  //   window.onload = timedRefresh(5000);
  // }
}
