import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { first } from 'rxjs';
import { HttpClientService} from '../../../../../shareds/_service/http-client.service'

@Component({
  selector: 'app-addwork',
  templateUrl: './addwork.component.html',
  styleUrls: ['./addwork.component.css']
})
export class AddworkComponent implements OnInit {
  info: any
  file: any;  
  worksForm = new FormGroup({
    goal_title: new FormControl(''),
    service_id: new FormControl(),
    goal_detail: new FormControl(''),
    goal_img: new FormControl('')
  });

  previewLoaded: boolean = false;

  constructor(private http: HttpClientService) { 
    this.onLoading();
  }

  ngOnInit(): void {
  }

  onChangePhoto(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.worksForm.patchValue({
        goal_img:file
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
    this.worksForm.reset();
    this.previewLoaded = false;
  }

  onLoading(){    
    try {
       this.http.getData('/services').pipe(first()).subscribe((response:any) => {
      console.log(response)
      if (response.status == true){
        this.info = response.data
      }
    });
    }catch (error){
      console.log(error)
    }  
}

  addWorks(){
    console.log(this.worksForm.get('goal_title')?.value);
    console.log(this.worksForm.get('service_id')?.value);
    console.log(this.worksForm.get('goal_detail')?.value);
    console.log(this.worksForm.get('goal_img')?.value);

    if(!RegExp('^[ก-๙a-zA-Z]+$').test(this.worksForm.get('goal_title')?.value)) {
      alert('ใส่ชื่อผลงานไม่ถูกต้อง กรุณากรอกใหม่')
    }
    else if(!RegExp('^[ก-๙a-zA-Z0-9\\s]+$').test(this.worksForm.get('service_id')?.value)) {
      alert('กรุณาใส่ตำแหน่ง')
    }
    else if(!RegExp('^[ก-๙a-zA-Z0-9\\s]+$').test(this.worksForm.get('goal_detail')?.value)){
      alert('กรุณากรอกรายละเอียดผลงาน')
    }
    // else if(!RegExp('^[ก-๙a-zA-Z0-9\\s]+$').test(this.worksForm.get('goal_img')?.value)){
    //   alert('กรุณาใส่รูปภาพ')
    // }
    else if(this.worksForm.status == "INVALID"){
      alert('กรุณากรอกข้อมูลให้ครบ')
    }
    else {
      alert('เพิ่มข้อมูลสำเร็จ')
      console.log(this.worksForm.value)
      this.http.createData('/goals',this.worksForm.value).pipe(first()).subscribe()
      
    }
  }

}
