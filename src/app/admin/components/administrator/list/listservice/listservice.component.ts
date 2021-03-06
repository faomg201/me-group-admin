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
  selector: 'app-listservice',
  templateUrl: './listservice.component.html',
  styleUrls: ['./listservice.component.css'],
})
export class ListserviceComponent implements OnInit {
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
      };
    }
    return file;
  };
  info: any;
  infouser: any;
  infoDel: any;
  p: number = 1;
  file: any;
  serviceForm: FormGroup;
  previewLoaded: boolean = false;
  submit = false;

  constructor(private local: LocalStorageService,
    private http: HttpClientService,
    private _router: Router,
    private toastService: HotToastService,
    private builder: FormBuilder
  ) {
    this.serviceForm = this.builder.group({
      service_name: ['', Validators.required],
      service_detail: ['', Validators.required],
      service_img: ['', Validators.required]
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
    this.getService();
    // this.getUser();
  }

  get a() {
    return this.serviceForm.controls;
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
  // getUser() {
  //   this.http
  //     .getData('/user')
  //     .pipe(first())
  //     .subscribe(
  //       (response: any) => {
  //         console.log(response.data[0].Uadmin_username);
  //         if (response.status == true) {
  //           this.infouser = response.data;
  //         }
  //       },
  //       (error) => {
  //         const response = error.error;
  //         if (response.status == 500) {
  //           alert('Failed cant Get Data');
  //         }
  //       }
  //     );
  // }
  getnameDel(id: number) {
    this.http
      .getData('/services/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.infoDel = response.data;
      });
  }
  deleteService(id: any) {
    this.http
      .removeData('/services/' + id)
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

  openModal() {
    $('#CREATE_SERVICE').modal('show');
  }

  resetFrom() {
    $('#CREATE_SERVICE').modal('hide');
    this.serviceForm.reset();
    this.previewLoaded = false;
    this.imageChangedEvent = false;
  }

  createService() {
    this.submit = true;
    if (this.serviceForm.invalid) {
      this.toastService.error('???????????????????????????????????????????????????');
      return;
    }
    const formData = new FormData();
    formData.append('service_img', this.serviceForm.get('service_img')?.value);
    formData.append('service_detail', this.serviceForm.get('service_detail')?.value);
    formData.append('service_name', this.serviceForm.get('service_name')?.value);
    this.http.createData('/services', formData).pipe(first()).subscribe((response: any) => {      
      if (response.statusCode == 201) {
        $('#CREATE_SERVICE').modal('hide');
        this.submit = false;
        this.resetFrom();
        this.getService();
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
}
