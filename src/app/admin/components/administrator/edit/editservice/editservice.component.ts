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
  selector: 'app-editservice',
  templateUrl: './editservice.component.html',
  styleUrls: ['./editservice.component.css']
})
export class EditserviceComponent implements OnInit {
  private serveURl= environment.apiUrl;
  SerURL:string = this.serveURl+'/static/services/'

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
    this.blobToFile(f, this.info.service_name);
    return f;
  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    this.imageChangedEvent;
    var Fname: any | File = this.imageChangedEvent.target.files[0];
    var fffff: any = Fname.name;
    b.name = fileName;
    const file = new File([theBlob], fffff, {
      lastModified: new Date().getTime(),
      type: theBlob.type,
    });
    if (file) {
      this.serviceForm.patchValue({
        service_img: file,
      });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.file = reader.result;
        const formData = new FormData();
        formData.append('service_img', this.serviceForm.get('service_img')?.value);

        this.http
          .updateData(
            '/services/image/' + this._route.snapshot.params['id'],
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
  info: any;
  file: any;
  serviceForm: FormGroup;
  submit = false;
  constructor(private http: HttpClientService, private _route: ActivatedRoute, private toastService: HotToastService, private router: Router,
    private builder: FormBuilder) {
    this.serviceForm = this.builder.group({
      service_name: ['', Validators.required],
      service_detail: ['', Validators.required],
      service_img: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.previewLoaded = false;
    const id = +this._route.snapshot.params['id'];
    this.http.getData('/services/' + id).pipe(first()).subscribe((response: any) => {
      if (response.status == true) {
        this.info = response;
        this.serviceForm = this.builder.group({
          service_name: [this.info.data.service_name, Validators.required],
          service_detail: [this.info.data.service_detail, Validators.required],
          service_img: [this.info.data.service_img, Validators.required]
        });
      }
    });
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
      const formData = new FormData();
      formData.append(
        'service_img',
        this.serviceForm.get('service_img')?.value
      );
      this.http.updateData('/services/image/' + this._route.snapshot.params['id'], formData).pipe(first()).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toastService.success('แก้ไขรูปภาพเสร็จสิ้น');
        }
      }, (error) => {
        const response = error.error;
        if (response.status == 500) {
          this.toastService.error('เกิดข้อผิดพลาด');
        }
      })

    }
  }
  updateService() {
    this.submit = true;
    if (this.serviceForm.invalid) {
      this.toastService.error('กรอกข้อมูลผิดพลาด');
      return;
    }
    const formData = new FormData();
    formData.append('service_detail', this.serviceForm.get('service_detail')?.value);
    formData.append('service_name', this.serviceForm.get('service_name')?.value);
    this.http.updateData('/services/' + this._route.snapshot.params['id'], formData).pipe(first()).subscribe((response: any) => {
      if (response.statusCode == 200) {
        this.ngOnInit();
        this.router.navigate(['/admin/administrator/listservices'])
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
    )
  }

  getnameDel(id: number) {
    this.http
      .getData('/services/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.info = response.data;
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
            this.router.navigate(['/admin/administrator/listservices'])
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
