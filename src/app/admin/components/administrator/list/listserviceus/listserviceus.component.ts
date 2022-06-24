import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import {
  FormControl, FormGroup, FormBuilder,
  Validators
} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'angular-web-storage'

declare var $: any;
@Component({
  selector: 'app-listserviceus',
  templateUrl: './listserviceus.component.html',
  styleUrls: ['./listserviceus.component.css']
})
export class ListserviceusComponent implements OnInit {
  private serveURl= environment.apiUrl;
  SerUsURL:string = this.serveURl+'/static/serviceUs/'
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
    this.blobToFile(f, this.infoServiceUs.serviceUs_name);
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
      this.serviceUsForm.patchValue({
        serviceUs_img: file,
      });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.file = reader.result;
      };
    }
    return file;
  };

  file: any;
  previewLoaded = false;
  p = 1;
  infoMBTI: any;
  infoServiceUs: any;
  infoDel: any;
  serviceUsForm: FormGroup;
  submit = false;

  constructor(private local: LocalStorageService,
    private http: HttpClientService,
    private _router: Router,
    private toastService: HotToastService,
    private builder: FormBuilder
  ) {
    this.serviceUsForm = this.builder.group({
      serviceUs_name: ['', Validators.required],
      serviceUs_img: ['', Validators.required],
      serviceUs_detail: ['', Validators.required],
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
    this.onLoadingMBTI();
    this.getServiceUs();
    this.convertDataUrlToBlob(Blob);
  }

  get a() {
    return this.serviceUsForm.controls;
  }

  openModal() {
    $('#CREATE_EMP').modal('show');
  }

  resetFrom() {
    $('#CREATE_EMP').modal('hide');
    this.serviceUsForm.reset();
    this.previewLoaded = false;
    this.imageChangedEvent = false;
    this.submit = false;
  }

  getServiceUs() {
    this.http
      .getData('/serviceUs')
      .pipe(first())
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.status == true) {
            this.infoServiceUs = response.data;
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
      .getData('/serviceUs/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.infoDel = response.data;
        console.log(this.infoDel, +6666);
        console.log(this.infoDel.serviceUs_name);
      });
  }

  onLoadingMBTI() {
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

  onClick(SerUsID: number) {
    this._router.navigate(['admin/administrator/editserviceus', SerUsID]);
  }

  deleteserviceUs(id: any) {
    this.http
      .removeData('/serviceUs/' + id)
      .pipe(first())
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.status == true) {
            console.log(this.infoServiceUs);
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
            this.infoServiceUs = response.data;
            this.getServiceUs();
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

  createServiceUs() {
    this.submit = true;
    if (this.serviceUsForm.invalid) {
      this.toastService.error('กรอกข้อมูลผิดพลาด');
      return;
    }
    const formData = new FormData();
    formData.append('serviceUs_img', this.serviceUsForm.get('serviceUs_img')?.value);
    formData.append('serviceUs_name', this.serviceUsForm.get('serviceUs_name')?.value);
    formData.append('serviceUs_detail', this.serviceUsForm.get('serviceUs_detail')?.value);
    this.http
      .createData('/serviceus', formData)
      .pipe(first())
      .subscribe(
        (response: any) => {
          console.log(response);

          if (response.statusCode == 201) {
            $('#CREATE_EMP').modal('hide');
            this.getServiceUs();
            this.resetFrom();
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

          } else {
            this.toastService.error('ไม่สามารถเพิ่มข้อมูล');
          }
        },
        (error) => {
          const response = error.error;
          if (response.statusCode == 500) {
            this.toastService.error('เกิดข้อผิดพลาด');
          }
        }
      );
  }
}
