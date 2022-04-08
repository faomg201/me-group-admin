import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.css']
})
export class AddserviceComponent implements OnInit {

  serviceForm = new FormGroup({
    name_service: new FormControl(''),
    detail_service: new FormControl(''),
    img_servie: new FormControl('')
  });

  previewLoaded: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onChangePhoto(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.serviceForm.patchValue({
          img_servie: reader.result
        })
      }
    }
  }  

  resetFrom() {
    this.serviceForm.reset();
    this.previewLoaded = false;
  }

  addService(){
    if(!RegExp('^[ก-๙a-zA-Z]+$').test(this.serviceForm.get('name_service')?.value)) {
      alert('ใส่ชื่อบริการไม่ถูกต้อง กรุณากรอกใหม่')
    }
    else if(!RegExp('^[ก-๙a-zA-Z0-9\\s]+$').test(this.serviceForm.get('detail_service')?.value)){
      alert('กรุณากรอกรายละเอียดบริการ')
    }
    else if(!RegExp('INVALID').test(this.serviceForm.get('img_servie')?.value)){
      alert('กรุณาใส่รูปภาพ')
    }
    else if(this.serviceForm.status == "INVALID"){
      alert('กรุณากรอกข้อมูลให้ครบ')
    }
    else {
      alert('เพิ่มข้อมูลสำเร็จ')
      // this.add.addinfo(this.serviceForm.value).subscribe()
    }
    // this.add.addinfo(this.serviceForm.value).subscribe(
    //   data => {
    //     if(data.status == true){
    //       alert('Can not signup!');
    //     }else{
    //       alert('Can signup!!Xd');

    //     }
    //   },
    //   err =>{
    //     console.log(err);
    //     alert('Can not signup!!');
    //   }
    // );
  }

}
