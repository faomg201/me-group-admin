import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { first } from 'rxjs';
import {
  FormControl, FormGroup, FormBuilder,
  Validators
} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-listcontractus',
  templateUrl: './listcontractus.component.html',
  styleUrls: ['./listcontractus.component.css']
})
export class ListcontractusComponent implements OnInit {
  p=1;
  infoContracts:any;
  submit = false;
  contractForm: FormGroup;
  constructor(private http: HttpClientService,
    private toastService: HotToastService,
    private builder: FormBuilder) {
      this.contractForm = this.builder.group({
        enterprise_address: ['', Validators.required],
        enterprise_servicetime: ['', Validators.required],
        enterprise_phone: ['', Validators.required],
        enterprise_email: ['', Validators.required],
        enterprise_facebook: ['', Validators.required],
        enterprise_latitude: ['', Validators.required],
        enterprise_longtitude: ['', Validators.required],
        enterprise_GG_key_api: ['', Validators.required]
      });
     }

  ngOnInit(): void {
    this.contractForm = this.builder.group({
      enterprise_address: ['', Validators.required],
      enterprise_servicetime: ['', Validators.required],
      enterprise_phone: ['', Validators.required],
      enterprise_email: ['', Validators.required],
      enterprise_facebook: ['', Validators.required],
      enterprise_latitude: ['', Validators.required],
      enterprise_longtitude: ['', Validators.required],
      enterprise_GG_key_api: ['', Validators.required]
    });
  }

  get a() {
    return this.contractForm.controls;
  }

  // getService() {
  //   this.http
  //     .getData('/contractUs')
  //     .pipe(first())
  //     .subscribe(
  //       (response: any) => {
  //         if (response.status == true) {
  //           this.infoContracts = response.data;
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

  resetFrom() {
    this.ngOnInit();
    this.infoContracts.reset();
  }

  createService() {
    this.submit = true;
    if (this.infoContracts.invalid) {
      this.toastService.error('กรอกข้อมูลผิดพลาด');
      return;
    }
    const formData = new FormData();
    formData.append('enterprise_address', this.infoContracts.get('enterprise_address')?.value);
    formData.append('enterprise_servicetime', this.infoContracts.get('enterprise_servicetime')?.value);
    formData.append('enterprise_phone', this.infoContracts.get('enterprise_phone')?.value);
    formData.append('enterprise_email', this.infoContracts.get('enterprise_email')?.value);
    formData.append('enterprise_facebook', this.infoContracts.get('enterprise_facebook')?.value);
    formData.append('enterprise_latitude', this.infoContracts.get('enterprise_latitude')?.value);
    formData.append('enterprise_longtitude', this.infoContracts.get('enterprise_longtitude')?.value);
    formData.append('enterprise_GG_key_api', this.infoContracts.get('enterprise_GG_key_api')?.value);
    this.http.createData('/contractUs', formData).pipe(first()).subscribe((response:any) => {
      if (response.statusCode == 201){
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
