import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { first, } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'angular-web-storage'


@Component({
  selector: 'app-listaboutus',
  templateUrl: './listaboutus.component.html',
  styleUrls: ['./listaboutus.component.css'],
})
export class ListaboutusComponent implements OnInit {
  private serveURl= environment.apiUrl;
  AboutUsURL:string = this.serveURl+'/static/aboutUs/'

  images: string[] = [];

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    image_name: new FormControl('', [Validators.required, Validators.maxLength(7)]),
  });

  submit = false;
  infoAboutUs: any;
  infoImgAbout:any;
  aboutUsForm: FormGroup;
  fileS:any

  previewLoaded: boolean = false;
  constructor(private local: LocalStorageService,
    private toastService: HotToastService, private http: HttpClientService, private builder: FormBuilder) {
    this.aboutUsForm = this.builder.group({
      enterprise_name: ['', Validators.required],
      enterprise_surname: ['', Validators.required],
      enterprise_detail: ['', Validators.required]
    })
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
    this.getImgAboutus();
    
    this.http.getData('/enterprises').pipe(first()).subscribe((response: any) => {
      if (response.status == true) {
        this.infoAboutUs = response;
        this.aboutUsForm = this.builder.group({
          enterprise_name: [this.infoAboutUs.data.enterprise_name, Validators.required],
          enterprise_surname: [this.infoAboutUs.data.enterprise_surname, Validators.required],
          enterprise_detail: [this.infoAboutUs.data.enterprise_detail, Validators.required]
        });
      }
    });

  }
  onChangePhoto(e: any) {
    const file: File = e.target.files[0];
    if (file) {
      this.myForm.patchValue({
        image_name: file,
      });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.fileS = reader.result;
      };
    }
  }
  getImgAboutus() {
    this.http
      .getData('/aboutUs/image')
      .pipe(first())
      .subscribe(
        (response: any) => {

          if (response.status == true) {
            this.infoImgAbout = response.data;
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

  get a() {
    return this.aboutUsForm.controls;
  }
  resetFrom() {
    this.ngOnInit();
    this.infoAboutUs.reset();
    this.submit = false
  }
  createAboutUs() {
    // this.submit = true;
    // if (this.aboutUsForm.invalid) {
    //   this.toastService.error('???????????????????????????????????????????????????');
    //   return;
    // }
    if (!this.infoAboutUs) {
      const formData = new FormData();
      formData.append('enterprise_name', this.aboutUsForm.get('enterprise_name')?.value);
      formData.append('enterprise_surname', this.aboutUsForm.get('enterprise_surname')?.value);
      formData.append('enterprise_detail', this.aboutUsForm.get('enterprise_detail')?.value);

      this.http.createData('/enterprises', formData).pipe(first()).subscribe((response: any) => {
        if (response.statusCode == 201) {
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
        })
    }
    else {
      this.submit = true;
      if (this.aboutUsForm.invalid) {
        this.toastService.error('???????????????????????????????????????????????????');
        return;
      }
      const formData = new FormData();
      formData.append('enterprise_name', this.aboutUsForm.get('enterprise_name')?.value);
      formData.append('enterprise_surname', this.aboutUsForm.get('enterprise_surname')?.value);
      formData.append('enterprise_detail', this.aboutUsForm.get('enterprise_detail')?.value);
      this.http.updateData('/enterprises/1', formData).pipe(first()).subscribe((response: any) => {
        if (response.statusCode == 200) {
          this.ngOnInit();
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
      }, (error) => {
        const response = error.error;
        if (response.status == 500) {
          this.toastService.error('??????????????????????????????????????????');
        }
      }
      )


    }
  }

  get f() {
    return this.myForm.controls;
  }
  submitt() {
    const data = this.myForm.get('image_name')?.value;

    const formData = new FormData();

    for (let i = 0; i < data.length; i++) {
      formData.append('image_name', this.myForm.get('image_name')?.value[i]);
    }


    this.http.createData('/aboutUs/image', formData).pipe(first()).subscribe((response: any) => {
  
      if (response.statusCode == 201) {
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
    // if(data.length<8){
    //   for (let i = data.length; i < 8; i++) {
    //     dataRm.push(data,'????????????')
    //   }
    //    console.log(dataRm);

    // }
    // const rmt = []


    // data.splice(1, 1);
    // rmt.push(2)
    // console.log(data);
    // console.log(rmt);

  }
  onFileChange(event: any) {
    //   const MAX_LENGTH = 8;
    //   const photoUpload = (e:any) => {
    //   if (Array.from(e.targeventt.files).length > MAX_LENGTH) {
    //     e.preventDefault();
    //     alert(` ???????????????????????????????????????????????????????????????????????????????????? ${MAX_LENGTH} ?????????????????????????????????`);
    //     return;
    //   }
    // }

    if (event.target.files.length < 8) {
      // if (event.target.files.length < 8 && !event.target.files) {
      //   // const file: File = event.target.files;
      //   const file: File = event.target.files['']
      //   console.log(file);
      // }else{
      // const file: File = event[]
      const file: File = event.target.files;
      if (file) {
        this.myForm.patchValue({
          image_name: file,
        });
      }

      // }



      for (let i = 0; i < 7; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          // this.images.push(event.target.result);
          // this.myForm.patchValue({
          //   image_name: this.images
          // });
        };
        // reader.readAsDataURL(event.target.files[i]);
      }

    }
  }
}
