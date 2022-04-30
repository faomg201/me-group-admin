import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup} from '@angular/forms';
import { first } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editservice',
  templateUrl: './editservice.component.html',
  styleUrls: ['./editservice.component.css']
})
export class EditserviceComponent implements OnInit {

  previewLoaded: boolean = false;
  info: any;
  token: any;
  file: any;
  serviceForm = new FormGroup({    
    service_name: new FormControl(),
    service_detail: new FormControl(),
    service_img: new FormControl(''),
  });
  constructor(private http: HttpClientService, private _route: ActivatedRoute,private toastService: HotToastService, private router: Router ) { }

  ngOnInit(): void {
    // this.http.getData('/services').pipe(first()).subscribe((response:any) => {
    //   console.log(response)
    //   if (response.status == true){
    //     this.info = response.data
    //   }
    // }
    // this.Loadservice();
    this.previewLoaded = false;
    const id = +this._route.snapshot.params['id'];
    console.log(id)
    this.http.getData('/services/'+id).pipe(first()).subscribe((response:any) => {
      if (response.status == true){
        this.info = response;
        this.serviceForm = new FormGroup({    
          service_name: new FormControl(this.info.data.service_name),
          service_detail: new FormControl(this.info.data.service_detail),
          service_img: new FormControl(this.info.data.service_img),
        });
      }
    });
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

      this.http.updateData('/services/image/'+this._route.snapshot.params['id'],formData).pipe(first()).subscribe()

    }
  }
  updateService(){
    const formData = new FormData();
      // formData.append(
      //   'service_img',
      //   this.serviceForm.get('service_img')?.value
      // );
      formData.append(
        'service_detail',
        this.serviceForm.get('service_detail')?.value
      );
      formData.append(
        'service_name',
        this.serviceForm.get('service_name')?.value
      );
    this.http.updateData('/services/'+this._route.snapshot.params['id'],formData).pipe(first()).subscribe()
    this.router.navigate(['/admin/administrator/listservices'])
    setTimeout('location.reload(true);', 0);
  }

  getnameDel(id: number) {
    console.log(id);
    this.http
      .getData('/services/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.info = response.data;
        console.log(this.info, +6666);
        console.log(this.info.service_name);
      });
  }

  deleteService(id: any) {
    this.http
      .removeData('/services/' + id)
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
