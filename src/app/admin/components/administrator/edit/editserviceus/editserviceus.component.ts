import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'angular-web-storage'


@Component({
  selector: 'app-editserviceus',
  templateUrl: './editserviceus.component.html',
  styleUrls: ['./editserviceus.component.css']
})
export class EditserviceusComponent implements OnInit {
  private serveURl = environment.apiUrl;
  SerURL: string = this.serveURl + '/static/serviceUs/'

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
    this.blobToFile(f, this.info.serviceUs_name);
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
        serviceUs_img: file,
      });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.file = reader.result;
        const formData = new FormData();
        formData.append('serviceUs_img', this.serviceForm.get('serviceUs_img')?.value);

        this.http.updateData('/serviceUs/image/' + this._route.snapshot.params['id'],
          formData).pipe(first()).subscribe((response: any) => {
            if (response.status == true) {
              this.toastService.success('แก้ไขรูปภาพเสร็จสิ้น');
            }
          });

      };

    }
    return file;
  };

  previewLoaded: boolean = false;
  info: any;
  file: any;
  serviceForm: FormGroup;
  submit = false;
  constructor(private local: LocalStorageService,private http: HttpClientService, private _route: ActivatedRoute, private toastService: HotToastService, private router: Router,
    private builder: FormBuilder) {
    this.serviceForm = this.builder.group({
      serviceUs_name: ['', Validators.required],
      serviceUs_detail: ['', Validators.required],
      serviceUs_img: ['', Validators.required]
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
    this.previewLoaded = false;
    const id = +this._route.snapshot.params['id'];
    this.http.getData('/serviceUs/' + id).pipe(first()).subscribe((response: any) => {
      if (response.status == true) {
        this.info = response;
        this.serviceForm = this.builder.group({
          serviceUs_name: [this.info.data.serviceUs_name, Validators.required],
          serviceUs_detail: [this.info.data.serviceUs_detail, Validators.required],
          serviceUs_img: [this.info.data.serviceUs_img, Validators.required]
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
        serviceUs_img: file,
      });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.file = reader.result;
      };
      const formData = new FormData();
      formData.append(
        'serviceUs_img',
        this.serviceForm.get('serviceUs_img')?.value
      );
      this.http.updateData('/serviceUs/image/' + this._route.snapshot.params['id'], formData).pipe(first()).subscribe((res: any) => {
        if (res.statusCode == 201) {
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
    formData.append('serviceUs_detail', this.serviceForm.get('serviceUs_detail')?.value);
    formData.append('serviceUs_name', this.serviceForm.get('serviceUs_name')?.value);
    this.http.updateData('/serviceUs/' + this._route.snapshot.params['id'], formData).pipe(first()).subscribe((response: any) => {
      if (response.statusCode == 201) {
        this.ngOnInit();
        this.router.navigate(['/admin/administrator/listservicesus'])
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
      .getData('/serviceUs/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.info = response.data;
      });
  }

  deleteService(id: any) {
    this.http
      .removeData('/serviceUs/' + id)
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
            this.router.navigate(['/admin/administrator/listservicesus'])
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
