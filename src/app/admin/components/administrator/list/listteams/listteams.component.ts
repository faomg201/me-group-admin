import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { first } from 'rxjs';


import { ImageCroppedEvent } from 'ngx-image-cropper';
declare var $: any;
@Component({
  selector: 'app-listteams',
  templateUrl: './listteams.component.html',
  styleUrls: ['./listteams.component.css'],
})
export class ListteamsComponent implements OnInit {
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
      };
    }
    return file;
  };

  file: any;
  previewLoaded = false;
  p = 1;
  infoMBTI: any;
  infoTeam: any;
  infoDel: any;
  teamForm: FormGroup;
  submit = false;

  constructor(
    private http: HttpClientService,
    private _router: Router,
    private toastService: HotToastService,
    private builder: FormBuilder
  ) {
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
    this.onLoadingMBTI();
    this.getTeams();
    this.convertDataUrlToBlob(Blob);
  }

  get a() {
    return this.teamForm.controls;
  }

  openModal() {
    $('#CREATE_EMP').modal('show');
  }

  resetFrom() {
    $('#CREATE_EMP').modal('hide');
    this.teamForm.reset();
    this.previewLoaded = false;
    this.imageChangedEvent = false;
  }

  getTeams() {
    this.http
      .getData('/employees')
      .pipe(first())
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.status == true) {
            this.infoTeam = response.data;
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
      .getData('/employees/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.infoDel = response.data;
        console.log(this.infoDel, +6666);
        console.log(this.infoDel.emp_fname);
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

  onClick(EMPID: number) {
    this._router.navigate(['admin/administrator/editteams', EMPID]);
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
            this.getTeams();
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

  createTeams() {
    console.log(this.teamForm.get('emp_fname')?.value);
    
    this.submit = true;
    if (this.teamForm.invalid) {
      this.toastService.error('กรอกข้อมูลผิดพลาด');
      return;
    }
    const formData = new FormData();
    formData.append('emp_img', this.teamForm.get('emp_img')?.value);
    formData.append('emp_fname', this.teamForm.get('emp_fname')?.value);
    formData.append('emp_lname', this.teamForm.get('emp_lname')?.value);
    formData.append('emp_class', this.teamForm.get('emp_class')?.value);
    formData.append('mbti_id', this.teamForm.get('mbti_id')?.value);
    formData.append('emp_quote', this.teamForm.get('emp_quote')?.value);
    formData.append('emp_contract', this.teamForm.get('emp_contract')?.value);
    console.log(55);
    this.http
      .createData('/employees', formData)
      .pipe(first())
      .subscribe(
        (response: any) => {
          console.log(response);
          
          if (response.statusCode == 201) {
            $('#CREATE_EMP').modal('hide');
            this.getTeams();
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

}
