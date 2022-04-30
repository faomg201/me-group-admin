import { Component, OnInit } from '@angular/core';

import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editworks',
  templateUrl: './editworks.component.html',
  styleUrls: ['./editworks.component.css'],
})
export class EditworksComponent implements OnInit {
  previewLoaded: boolean = false;
  info: any;
  infoServ: any;
  token: any;
  file: any;
  worksForm = new FormGroup({
    goal_title: new FormControl(''),
    service_id: new FormControl(),
    goal_detail: new FormControl(''),
    goal_img: new FormControl(''),
  });
  constructor(
    private http: HttpClientService,
    private _route: ActivatedRoute,
    private toastService: HotToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.previewLoaded = false;
    this.onLoading();
    const id = +this._route.snapshot.params['id'];
    console.log(id);
    this.http
      .getData('/goals/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        if (response.status == true) {
          this.info = response;
          this.worksForm = new FormGroup({
            goal_title: new FormControl(this.info.data.goal_title),
            service_id: new FormControl(this.info.data.service_id),
            goal_detail: new FormControl(this.info.data.goal_detail),
            goal_img: new FormControl(this.info.data.goal_img),
          });
        }
      });
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
      };
    }
  }
  updateWorks() {
    const formData = new FormData();
    formData.append('service_id', this.worksForm.get('service_id')?.value);
    formData.append('goal_detail', this.worksForm.get('goal_detail')?.value);
    formData.append('goal_title', this.worksForm.get('goal_title')?.value);
    this.http
      .updateData('/goals/' + this._route.snapshot.params['id'], formData)
      .pipe(first())
      .subscribe();
    this.router.navigate(['/admin/administrator/listworks']);
    setTimeout('location.reload(true);', 0);
  }

  editWorks() {
    this.http
      .updateData(
        '/goals/' + this._route.snapshot.params['id'],
        this.worksForm.value
      )
      .pipe(first())
      .subscribe();
    window.location.reload();
  }

  getnameDel(id: number) {
    console.log(id);
    this.http
      .getData('/goals/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.info = response.data;
        console.log(this.info, +6666);
        console.log(this.info.goal_title);
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
