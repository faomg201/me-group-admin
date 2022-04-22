import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { HttpClientService} from '../../../../../shareds/_service/http-client.service'
import { first } from 'rxjs';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.css']
})
export class AddserviceComponent implements OnInit {
  file: any;
  serviceForm = new FormGroup({
    service_name: new FormControl(''),
    service_detail: new FormControl(''),
    service_img: new FormControl('')
  });

  previewLoaded: boolean = false;

  constructor(private http: HttpClientService) { }

  ngOnInit(): void {
  }

  onChangePhoto(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.serviceForm.patchValue({
          service_img:file
        })
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.file= reader.result
        
      }
    }
  }  

  resetFrom() {
    this.serviceForm.reset();
    this.previewLoaded = false;
  }


  createService(){
    console.log(this.serviceForm.get('service_name')?.value);
    console.log(this.serviceForm.get('service_detail')?.value);
    console.log(this.serviceForm.get('service_img')?.value);

    if(!RegExp('^[ก-๙a-zA-Z]+$').test(this.serviceForm.get('service_name')?.value)) {
      alert('ใส่ชื่อบริการไม่ถูกต้อง กรุณากรอกใหม่')
    }
    else if(!RegExp('^[ก-๙a-zA-Z0-9\\s]+$').test(this.serviceForm.get('service_detail')?.value)){
      alert('กรุณากรอกรายละเอียดบริการ')
    }
    // else if(!RegExp('^[ก-๙a-zA-Z0-9\\s]+$').test(this.serviceForm.get('service_img')?.value)){
    //   alert('กรุณาใส่รูปภาพ')
    // }
    else if(this.serviceForm.status == "INVALID"){
      alert('กรุณากรอกข้อมูลให้ครบ')
    }
    else {
      alert('เพิ่มข้อมูลสำเร็จ')
      this.http.createData('/services',this.serviceForm.value).pipe(first()).subscribe()
    }
  }

}
