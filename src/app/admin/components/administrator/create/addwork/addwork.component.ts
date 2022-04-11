import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { HttpClientService} from '../../../../../shareds/_service/http-client.service'

@Component({
  selector: 'app-addwork',
  templateUrl: './addwork.component.html',
  styleUrls: ['./addwork.component.css']
})
export class AddworkComponent implements OnInit {

  file: any;
  worksForm = new FormGroup({
    works_name: new FormControl(''),
    works_type: new FormControl(''),
    works_detail: new FormControl(''),
    works_img: new FormControl('')
  });

  previewLoaded: boolean = false;

  constructor(private addServ: HttpClientService) { }

  ngOnInit(): void {
  }

  onChangePhoto(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.worksForm.patchValue({
        works_img:file
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

  addWorks(){
    console.log(this.worksForm.get('works_name')?.value);
    console.log(this.worksForm.get('works_type')?.value);
    console.log(this.worksForm.get('works_detail')?.value);
    console.log(this.worksForm.get('works_img')?.value);

    if(!RegExp('^[ก-๙a-zA-Z]+$').test(this.worksForm.get('works_name')?.value)) {
      alert('ใส่ชื่อผลงานไม่ถูกต้อง กรุณากรอกใหม่')
    }
    // if(!RegExp('^[\\]s+$').test(this.teamsForm.get('works_type')?.value)) {
    //   alert('กรุณาใส่ตำแหน่ง')
    // }
    else if(!RegExp('^[ก-๙a-zA-Z0-9\\s]+$').test(this.worksForm.get('works_detail')?.value)){
      alert('กรุณากรอกรายละเอียดผลงาน')
    }
    // else if(!RegExp('^[ก-๙a-zA-Z0-9\\s]+$').test(this.worksForm.get('works_img')?.value)){
    //   alert('กรุณาใส่รูปภาพ')
    // }
    else if(this.worksForm.status == "INVALID"){
      alert('กรุณากรอกข้อมูลให้ครบ')
    }
    else {
      alert('เพิ่มข้อมูลสำเร็จ')
      this.addServ.addWorks(this.worksForm.value).subscribe()
    }
  }

}
