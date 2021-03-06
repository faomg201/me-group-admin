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
import { LocalStorageService } from 'angular-web-storage'

declare var $: any;
@Component({
  selector: 'app-listworks',
  templateUrl: './listworks.component.html',
  styleUrls: ['./listworks.component.css'],
})
export class ListworksComponent implements OnInit {
  private serveURl= environment.apiUrl;
  WorkURL:string = this.serveURl+'/static/goals/'

  infoServ: any;
  infoWork: any;
  file: any;
  p: number = 1;
  worksForm: FormGroup;
  submit = false;

  previewLoaded: boolean = false;
  constructor(private local: LocalStorageService,
    private http: HttpClientService,
    private _router: Router,
    private toastService: HotToastService,
    private builder: FormBuilder
  ) {
    this.worksForm = this.builder.group({
      goal_title: ['', Validators.required],
      service_id: ['', Validators.required],
      goal_detail: ['', Validators.required],
      goal_img: ['', Validators.required]
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
    this.getWorks();
    this.onLoading();
  }

  get a() {
    return this.worksForm.controls;
  }

  onChangePhoto(e: any) {
    const file: File = e.target.files[0];
    if (file) {
      this.worksForm.patchValue({
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
        .getData('/services')
        .pipe(first())
        .subscribe((response: any) => {
          if (response.status == true) {
            this.infoServ = response.data;
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
    this.worksForm.reset();
    this.previewLoaded = false;
    this.submit = false;
  }

  createWorks() {
    this.submit = true;
    if (this.worksForm.invalid) {
      this.toastService.error('???????????????????????????????????????????????????');
      return;
    }

    const formData = new FormData();
    formData.append('goal_img', this.worksForm.get('goal_img')?.value);
    formData.append('goal_title', this.worksForm.get('goal_title')?.value);
    formData.append('goal_detail', this.worksForm.get('goal_detail')?.value);
    formData.append('service_id', this.worksForm.get('service_id')?.value);
    this.http
      .createData('/goals', formData)
      .pipe(first())
      .subscribe(
        (response: any) => {
          if (response.statusCode == 201) {
            $('#CREATE_WORK').modal('hide');
            this.resetFrom();
            this.getWorks();
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

  getWorks() {
    this.http
      .getData('/goals')
      .pipe(first())
      .subscribe(
        (response: any) => {
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
    this.http
      .getData('/goals/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.infoWork = response.data;
      });
  }

  deleteWorks(id: any) {
    this.http
      .removeData('/goals/' + id)
      .pipe(first())
      .subscribe(
        (response: any) => {
          if (response.status == true) {
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
