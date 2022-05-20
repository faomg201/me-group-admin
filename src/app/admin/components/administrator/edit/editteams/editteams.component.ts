import { Component, OnInit } from '@angular/core';

import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-editteams',
  templateUrl: './editteams.component.html',
  styleUrls: ['./editteams.component.css']
})
export class EditteamsComponent implements OnInit {
  serveURl = environment.apiUrl;
  TeamURL:string = this.serveURl+'/static/employees/'

  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
    const blo: Blob = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.convertDataUrlToBlob(this.croppedImage);
  }

  convertDataUrlToBlob(dataUrl: any): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const f = new Blob([u8arr], { type: mime });
    this.blobToFile(f, this.infoTeam.emp_fname);
    return f;
  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    this.imageChangedEvent;
    var Fname: any | File = this.imageChangedEvent.target.files[0];
    var fffff: any = Fname.name;
    b.lastModifiedDate = new Date();
    b.name = fileName;

    const file = new File([theBlob], fffff, {
      lastModified: new Date().getTime(),
      type: theBlob.type,
    });
    if (file) {
      this.teamForm.patchValue({
        emp_img: file,
      });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.file = reader.result;
        const formData = new FormData();
        formData.append('emp_img', this.teamForm.get('emp_img')?.value);

        this.http
          .updateData(
            '/employees/image/' + this._route.snapshot.params['id'],
            formData
          )
          .pipe(first())
          .subscribe();
        this.toastService.success('แก้ไขรูปภาพเสร็จสิ้น');
      };
    }
    return file;
  };
  previewLoaded: boolean = false;
  file: any
  infoMBTI: any
  infoTeam: any
  teamForm: FormGroup;
  submit = false;

  constructor(private http: HttpClientService,
    private _route: ActivatedRoute,
    private toastService: HotToastService,
    private router: Router,
    private builder: FormBuilder) {
    this.teamForm = this.builder.group({
      emp_fname: ['', Validators.required],
      emp_lname: ['', Validators.required],
      emp_class: ['', Validators.required],
      mbti_id: ['', Validators.required],
      emp_quote: ['', Validators.required],
      emp_contract: ['', Validators.required],
      emp_img: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.previewLoaded = false;
    this.onLoading();
    const id = +this._route.snapshot.params['id'];
    console.log(id);
    this.http
      .getData('/employees/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        if (response.status == true) {
          this.infoTeam = response;
          this.teamForm = this.builder.group({
            emp_fname: [this.infoTeam.data.emp_fname, Validators.required],
            emp_lname: [this.infoTeam.data.emp_lname, Validators.required],
            emp_class: [this.infoTeam.data.emp_class, Validators.required],
            mbti_id: [this.infoTeam.data.mbti_id, Validators.required],
            emp_quote: [this.infoTeam.data.emp_quote, Validators.required],
            emp_contract: [this.infoTeam.data.emp_contract, Validators.required],
            emp_img: [this.infoTeam.data.emp_img, Validators.required]
          });
        }
      });
  }

  get a() {
    return this.teamForm.controls;
  }

  onLoading() {
    try {
      this.http
        .getData('/mbti')
        .pipe(first())
        .subscribe((response: any) => {
          console.log(response);
          if (response.status == true) {
            this.infoMBTI = response.data;
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  updateEmployee() {
    this.submit = true;
    if (this.teamForm.invalid) {
      this.toastService.error('กรอกข้อมูลผิดพลาด');
      return;
    }
    const formData = new FormData();
    formData.append('emp_fname', this.teamForm.get('emp_fname')?.value);
    formData.append('emp_lname', this.teamForm.get('emp_lname')?.value);
    formData.append('emp_class', this.teamForm.get('emp_class')?.value);
    formData.append('mbti_id', this.teamForm.get('mbti_id')?.value);
    formData.append('emp_quote', this.teamForm.get('emp_quote')?.value);
    formData.append('emp_contract', this.teamForm.get('emp_contract')?.value);
    this.http.updateData('/employees/' + this._route.snapshot.params['id'], formData)
      .pipe(first())
      .subscribe((response:any) =>{
        if(response.statusCode == 200 ){
          this.ngOnInit();
          this.router.navigate(['/admin/administrator/listteams']);
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
    console.log(id);
    this.http
      .getData('/employees/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.infoTeam = response.data;
        console.log(this.infoTeam, +6666);
        console.log(this.infoTeam.emp_fname);
      });
  }

  deleteEmployee(id: any) {
    this.http
      .removeData('/employees/' + id)
      .pipe(first())
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.status == true) {
            console.log(this.infoTeam);
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
            this.infoTeam = response.data;
            this.router.navigate(['/admin/administrator/listteams']);
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
