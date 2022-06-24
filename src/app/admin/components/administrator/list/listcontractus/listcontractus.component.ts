import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { first } from 'rxjs';
import {
  FormControl, FormGroup, FormBuilder,
  Validators
} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

import { Loader } from '@googlemaps/js-api-loader';
import { LoginService } from '../../../../../login/service/login.service';
import { LocalStorageService } from 'angular-web-storage'


@Component({
  selector: 'app-listcontractus',
  templateUrl: './listcontractus.component.html',
  styleUrls: ['./listcontractus.component.css']
})
export class ListcontractusComponent implements OnInit {
  DataConTact: any;
  p = 1;
  locatlat: any;
  locatlng: any;
  KeyAPI: any;
  infoContractus: any;

  infoContracts: any;
  submit = false;
  contractForm: FormGroup;
  constructor(private local: LocalStorageService,private http: HttpClientService,
    private toastService: HotToastService,
    private builder: FormBuilder,
    private loginService: LoginService) {
    this.contractForm = this.builder.group({
      enterprise_address: ['', Validators.required],
      enterprise_servicetime: ['', Validators.required],
      enterprise_phone1: ['', Validators.required],
      enterprise_phone2: ['', Validators.required],
      enterprise_PhoneName1: ['', Validators.required],
      enterprise_PhoneName2: ['', Validators.required],
      enterprise_email: ['', Validators.required],
      enterprise_facebook: ['', Validators.required],
      enterprise_latitude: ['', Validators.required],
      enterprise_longtitude: ['', Validators.required],
      enterprise_GG_key_api: ['', Validators.required]
    });
  }
  // UserID:any = this.loginService.UserIDValue;
  UserID: any = this.loginService.UserIDValue;
  locationlat(e: any) {
    this.locatlat = this.contractForm.get('enterprise_latitude')?.value
    this.GoogleAPI(e)
  }

  locationlng(e: any) {
    this.locatlng = this.contractForm.get('enterprise_longtitude')?.value
    this.GoogleAPI(e)
  }

  // ngOnInit(): void {
  //   this.http.getData('/contractus').pipe(first()).subscribe((response: any) => {
  //     if (response.status == true) {
  //       console.log(response.data[0]);
  //       this.infoContractus = response.data[0];
  //       console.log(this.infoContractus.enterprise_address);
  //       this.contractForm = this.builder.group({          
  //         enterprise_address: [this.infoContractus.enterprise_address, Validators.required],
  //         enterprise_servicetime: [this.infoContractus.enterprise_servicetime, Validators.required],
  //         enterprise_phone1: [this.infoContractus.enterprise_phone1, Validators.required],
  //         enterprise_phone2: [this.infoContractus.enterprise_phone2, , Validators.required],
  //         enterprise_PhoneName1: [this.infoContractus.enterprise_PhoneName1, , Validators.required],
  //         enterprise_PhoneName2: [this.infoContractus.enterprise_PhoneName2, , Validators.required],
  //         enterprise_email: [this.infoContractus.enterprise_email, Validators.required],
  //         enterprise_facebook: [this.infoContractus.enterprise_facebook, Validators.required],
  //         enterprise_latitude: ['', Validators.required],
  //         enterprise_longtitude: ['', Validators.required],
  //         enterprise_GG_key_api: ['', Validators.required]
  //       });
  //     }
  //   });
  // }
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
    this.http.getData('/contractus').pipe(first()).subscribe((response: any) => {
      
      if (response.status == true) {
        this.infoContractus = response;
        this.contractForm = this.builder.group({
          enterprise_address: [this.infoContractus.data[0].enterprise_address, Validators.required],
          enterprise_servicetime: [this.infoContractus.data[0].enterprise_servicetime, Validators.required],
          enterprise_phone1: [this.infoContractus.data[0].enterprise_phone1, Validators.required],
          enterprise_phone2: [this.infoContractus.data[0].enterprise_phone2, Validators.required],
          enterprise_PhoneName1: [this.infoContractus.data[0].enterprise_PhoneName1, Validators.required],
          enterprise_PhoneName2: [this.infoContractus.data[0].enterprise_PhoneName2, Validators.required],
          enterprise_email: [this.infoContractus.data[0].enterprise_email, Validators.required],
          enterprise_facebook: [this.infoContractus.data[0].enterprise_facebook, Validators.required],
          enterprise_latitude: ['', Validators.required],
          enterprise_longtitude: ['', Validators.required],
          enterprise_GG_key_api: ['', Validators.required]
        });
      }
    });
  }
  // ngOnInit(): void {
  //   this.getImgAboutus();

  //   this.http.getData('/enterprises').pipe(first()).subscribe((response: any) => {
  //     if (response.status == true) {
  //       this.infoAboutUs = response;
  //       this.aboutUsForm = this.builder.group({
  //         enterprise_name: [this.infoAboutUs.data.enterprise_name, Validators.required],
  //         enterprise_surname: [this.infoAboutUs.data.enterprise_surname, Validators.required],
  //         enterprise_detail: [this.infoAboutUs.data.enterprise_detail, Validators.required]
  //       });
  //     }
  //   });

  // }

  GoogleAPI(event: any) {
    this.KeyAPI = this.contractForm.get('enterprise_GG_key_api')?.value
    if (!this.locatlng || !this.locatlat || !this.KeyAPI) {
      return
    }
    this.submit = true

    let loader = new Loader({
      apiKey: this.KeyAPI
    })
    loader.load().then((google) => {
      console.log(google)
      const myLatLng = { lat: this.locatlat, lng: this.locatlng };
      const map = new google.maps.Map(document.getElementById("map")!, {
        zoom: 14,
        center: myLatLng
      })
      new google.maps.Marker({
        position: myLatLng,
        map,
      });
    })
  }
  onChangePhoto(e: any) {
    const file: File = e.target.files[0];
    if (file) {
      this.contractForm.patchValue({
        service_img: file,
      });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // this.previewLoaded = true;
        // this.file = reader.result;
      };
    }
  }


  get a() {
    return this.contractForm.controls;
  }

  resetFrom() {
    this.ngOnInit();
    this.infoContracts.reset();
    this.submit = false
  }

  createContract() {
    console.log(this.UserID);

    this.submit = true;
    // if (this.contractForm.invalid) {
    //   this.toastService.error('กรอกข้อมูลผิดพลาด');
    //   return;
    // }
    const formData = new FormData();
    formData.append('enterprise_address', this.contractForm.get('enterprise_address')?.value);
    formData.append('enterprise_servicetime', this.contractForm.get('enterprise_servicetime')?.value);
    formData.append('enterprise_phone1', this.contractForm.get('enterprise_phone1')?.value);
    formData.append('enterprise_phone2', this.contractForm.get('enterprise_phone2')?.value);
    formData.append('enterprise_PhoneName1', this.contractForm.get('enterprise_PhoneName1')?.value);
    formData.append('enterprise_PhoneName2', this.contractForm.get('enterprise_PhoneName2')?.value);
    // formData.append('UserID', this.loginService.UserIDValue);
    formData.append('enterprise_email', this.contractForm.get('enterprise_email')?.value);
    formData.append('enterprise_facebook', this.contractForm.get('enterprise_facebook')?.value);
    formData.append('enterprise_latitude', this.contractForm.get('enterprise_latitude')?.value);
    formData.append('enterprise_longtitude', this.contractForm.get('enterprise_longtitude')?.value);
    formData.append('enterprise_GG_key_api', this.contractForm.get('enterprise_GG_key_api')?.value);
    this.http.getData('/contractus').pipe(first()).subscribe((response: any) => {
      this.DataConTact = response.data[0];
      if (!this.DataConTact) {
        this.http.createData('/contractUs', formData).pipe(first()).subscribe((response: any) => {
          if (response.statusCode == 201) {
            console.log(response);
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
      else {
        this.http.updateData('/contractUs/' + ['1'], formData).pipe(first()).subscribe((response: any) => {
          console.log(response);
          if (response.statusCode == 201) {
            this.ngOnInit();
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
        );
      }
    });

  }


}