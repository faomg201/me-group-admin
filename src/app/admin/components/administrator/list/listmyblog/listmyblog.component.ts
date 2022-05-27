import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment';

declare var $: any;
@Component({
  selector: 'app-listmyblog',
  templateUrl: './listmyblog.component.html',
  styleUrls: ['./listmyblog.component.css']
})
export class ListmyblogComponent implements OnInit {

  private serveURl= environment.apiUrl;
  WorkURL:string = this.serveURl+'/static/goals/'

  infoEMP: any;
  infoWork: any;
  file: any;
  p: number = 1;
  blockForm: FormGroup;
  submit = false;

  previewLoaded: boolean = false;
  constructor(
    private http: HttpClientService,
    private _router: Router,
    private toastService: HotToastService,
    private builder: FormBuilder
  ) {
    this.blockForm = this.builder.group({
      employee_id: ['', Validators.required],
      link_address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getWorks();
    this.onLoading();
  }

  get a() {
    return this.blockForm.controls;
  }

  onChangePhoto(e: any) {
    const file: File = e.target.files[0];
    if (file) {
      this.blockForm.patchValue({
        goal_img: file,
      });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.file = reader.result;
      };
    }
  }

  onLoading() {
    try {
      this.http
        .getData('/employees')
        .pipe(first())
        .subscribe((response: any) => {
          console.log(response);
          if (response.status == true) {
            this.infoEMP = response.data;
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  openModal() {
    $('#CREATE_WORK').modal('show');
  }

  resetFrom() {
    $('#CREATE_WORK').modal('hide');
    this.blockForm.reset();
    this.previewLoaded = false;
  }

  createWorks() {
    this.submit = true;
    if (this.blockForm.invalid) {
      this.toastService.error('กรอกข้อมูลผิดพลาด');
      return;
    }

    const formData = new FormData();
    formData.append('link_address', this.blockForm.get('link_address')?.value);
    formData.append('employee_id', this.blockForm.get('employee_id')?.value);
    this.http
      .createData('/MyBlog', formData)
      .pipe(first())
      .subscribe(
        (response: any) => {
          if (response.statusCode == 201) {
            $('#CREATE_WORK').modal('hide');
            this.resetFrom();
            this.getWorks();
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

  getWorks() {
    this.http
      .getData('/goals')
      .pipe(first())
      .subscribe(
        (response: any) => {
          console.log(response.data[0].goal_title);
          if (response.status == true) {
            this.infoWork = response.data;
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
      .getData('/goals/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.infoWork = response.data;
        console.log(this.infoWork, +6666);
        console.log(this.infoWork.goal_title);
      });
  }

  deleteWorks(id: any) {
    this.http
      .removeData('/goals/' + id)
      .pipe(first())
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.status == true) {
            console.log(this.infoWork);
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
            this.infoWork = response.data;
            this.getWorks();
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

  onClick(ServID: number) {
    this._router.navigate(['admin/administrator/editworks', ServID]);
  }
}

