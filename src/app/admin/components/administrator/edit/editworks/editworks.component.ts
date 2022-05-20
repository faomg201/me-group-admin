import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { first } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editworks',
  templateUrl: './editworks.component.html',
  styleUrls: ['./editworks.component.css'],
})
export class EditworksComponent implements OnInit {
  private serveURl= environment.apiUrl;
  WorkURL:string = this.serveURl+'/static/goals/'

  previewLoaded: boolean = false;
  info: any;
  infoServ: any;
  file: any;
  worksForm: FormGroup;
  submit = false;

  constructor(
    private http: HttpClientService,
    private _route: ActivatedRoute,
    private toastService: HotToastService,
    private router: Router,
    private builder: FormBuilder
  ) {
    this.worksForm = this.builder.group({
      goal_title: ['', Validators.required],
      service_id: ['', Validators.required],
      goal_detail: ['', Validators.required],
      goal_img: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.previewLoaded = false;
    this.onLoading();
    const id = +this._route.snapshot.params['id'];
    this.http
      .getData('/goals/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        if (response.status == true) {
          this.info = response;
          this.worksForm = this.builder.group({
            goal_title: [this.info.data.goal_title, Validators.required],
            service_id: [this.info.data.service_id, Validators.required],
            goal_detail: [this.info.data.goal_detail, Validators.required],
            goal_img: [this.info.data.goal_img, Validators.required],
          });
        }
      });
  }

  get a() {
    return this.worksForm.controls;
  }


  onLoading() {
    try {
      this.http
        .getData('/services')
        .pipe(first())
        .subscribe((response: any) => {
          console.log(response);
          if (response.status == true) {
            this.infoServ = response.data;
          }
        });
    } catch (error) {
      console.log(error);
    }
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
        const formData = new FormData();
        formData.append('goal_img', this.worksForm.get('goal_img')?.value);
        this.http
          .updateData(
            '/goals/image/' + this._route.snapshot.params['id'],
            formData
          )
          .pipe(first())
          .subscribe();
        this.toastService.success('แก้ไขรูปภาพเสร็จสิ้น');
      };
    }
  }
  updateWorks() {
    this.submit = true;
    if (this.worksForm.invalid) {
      this.toastService.error('กรอกข้อมูลผิดพลาด');
      return;
    }
    const formData = new FormData();
    formData.append('service_id', this.worksForm.get('service_id')?.value);
    formData.append('goal_detail', this.worksForm.get('goal_detail')?.value);
    formData.append('goal_title', this.worksForm.get('goal_title')?.value);
    this.http
      .updateData('/goals/' + this._route.snapshot.params['id'], formData)
      .pipe(first())
      .subscribe((response: any) => {
        console.log(response);
        if (response.statusCode == 200) {
          this.ngOnInit();
          this.router.navigate(['/admin/administrator/listworks']);
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

  getnameDel(id: number) {
    this.http
      .getData('/goals/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.info = response.data;
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
            this.router.navigate(['/admin/administrator/listworks']);
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
