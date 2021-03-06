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
import { LocalStorageService } from 'angular-web-storage'


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
  private TeststroCloud = environment.stroCloud;
  WorkURL:string = this.serveURl+'/static/goals/'
  TeamURL:string = this.serveURl+'/static/employees/'
  testUrl:string = this.TeststroCloud+'/test-upload-image-megroup/image/sevices/'
  

  infoEMP: any;
  infoMyBlog: any;
  file: any;
  p: number = 1;
  blockForm: FormGroup;
  submit = false;

  previewLoaded: boolean = false;
  constructor(private local: LocalStorageService,
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
    this.http.getData('/check-login').pipe(first()).subscribe((response: any) => {
    },(error) => {
        const response = error.error;
        if (response.status == false) {
          this.local.clear();
          location.reload();
        }
      }
    );
    this.getMyBlog();
    console.log(this.testUrl);
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
      this.toastService.error('???????????????????????????????????????????????????');
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
            this.getMyBlog();
            this.submit = false;
            this.toastService.success('???????????????????????????????????????????????????', {
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
            this.toastService.error('??????????????????????????????????????????');
          }
        }
      );
  }
  getMyBlog() {
    this.http
      .getData('/MyBlog')
      .pipe(first())
      .subscribe(
        (response: any) => {
          if (response.status == true) {
            this.infoMyBlog = response.data;
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
      .getData('/MyBlog/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.infoMyBlog = response.data;
        console.log(this.infoMyBlog, +6666);
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
            console.log(this.infoMyBlog);
            this.toastService.error('??????????????????????????????????????????', {
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
            this.infoMyBlog = response.data;
            this.getMyBlog();
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

