import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-listservice',
  templateUrl: './listservice.component.html',
  styleUrls: ['./listservice.component.css'],
})
export class ListserviceComponent implements OnInit {
  info: any
  data: Array<any>
  totalRecord: number|any
  page: number=1 
  p : number = 1

  file: any;
  serviceForm = new FormGroup({
    service_name: new FormControl(''),
    service_detail: new FormControl(''),
    service_img: new FormControl('')
  });

  previewLoaded: boolean = false;

  constructor(private http: HttpClientService, private _router: Router) {
    this.data = new Array<any>()
    
  }

  ngOnInit(): void {
    this.getService();
    
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

  onClick(ServID: number){
    this._router.navigate(['admin/administrator/editservice', ServID]);
  }

  getService(){
    this.http.getData('/services').pipe(first()).subscribe((response:any) => {
      console.log(response)
      if (response.status == true){
        this.info = response.data
      }
    },
    (error) =>{
      const response = error.error
      if(response.status == 500){
        alert('Failed cant Get Data');
      }
    })
  }
  deleteService(id : any){
    this.http.removeData('/services/'+id).pipe(first()).subscribe((response:any) => {
      console.log(response) 
      if(response.status ==true ){
        console.log(this.info)
        this.info = response.data
        this.getService()
      }     
    },
    (error) => {
      const response = error.error
      if(response.status == 500){
        alert('can not Delete Data');
      }
    })
  }

  // resetFrom() {
  //   console.log(this.serviceForm.get('service_img')?.value.name);
  //   this.serviceForm.reset();        
  //   this.previewLoaded = false;
  // }

  createService(){
    console.log(this.serviceForm.get('service_name')?.value);
    console.log(this.serviceForm.get('service_detail')?.value);
    console.log(this.serviceForm.get('service_img')?.value.name);
    console.log(this.file.value);
    

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
      window.location.reload();
    }
  }
}
