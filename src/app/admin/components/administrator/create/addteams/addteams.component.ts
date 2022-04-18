import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { HttpClientService} from '../../../../../shareds/_service/http-client.service'

@Component({
  selector: 'app-addteams',
  templateUrl: './addteams.component.html',
  styleUrls: ['./addteams.component.css']
})
export class AddteamsComponent implements OnInit {

  file: any;
  teamsForm = new FormGroup({
    employee_firstname: new FormControl(''),
    employee_lastname: new FormControl(''),
    employee_mbti: new FormControl(''),
    employee_position: new FormControl(''),
    employee_contact: new FormControl(''),
    employee_img: new FormControl('')
  });

  previewLoaded: boolean = false;

  constructor(private addServ: HttpClientService) { }

  ngOnInit(): void {
  }

  onChangePhoto(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.teamsForm.patchValue({
          employee_img:file
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
    this.teamsForm.reset();
    this.previewLoaded = false;
  }

  addTeams(){
    console.log(this.teamsForm.get('employee_firstname')?.value);
    console.log(this.teamsForm.get('employee_lastname')?.value);
    console.log(this.teamsForm.get('employee_mbti')?.value);
    console.log(this.teamsForm.get('employee_position')?.value);
    console.log(this.teamsForm.get('employee_contact')?.value);
    console.log(this.teamsForm.get('employee_img')?.value);

    if(!RegExp('^[ก-๙a-zA-Z]+$').test(this.teamsForm.get('employee_firstname')?.value)) {
      alert('ใส่ชื่อไม่ถูกต้อง กรุณากรอกใหม่')
    }
    else if(!RegExp('^[ก-๙a-zA-Z]+$').test(this.teamsForm.get('employee_lastname')?.value)){
      alert('ใส่นามสกุลไม่ถูกต้อง กรุณากรอกใหม่')
    }
    else if(!RegExp('^[ก-๙a-zA-Z0-9\\s]+$').test(this.teamsForm.get('employee_mbti')?.value)) {
      alert('กรุณาใส่ MBTI')
    }
    else if(!RegExp('^[ก-๙a-zA-Z0-9\\s]+$').test(this.teamsForm.get('employee_position')?.value)) {
      alert('กรุณาใส่ตำแหน่ง')
    }
    else if(!RegExp('^[ก-๙a-zA-Z0-9\\s]+$').test(this.teamsForm.get('employee_contact')?.value)){
      alert('กรุณากรอกข้อมูลการติดต่อ')
    }
    
    // else if(!RegExp("/.*\.(gif|jpe?g|bmp|png)$/igm").test(this.teamsForm.get('employee_img')?.value)){
    //   alert('กรุณาใส่รูปภาพ')
    // }
    else if(this.teamsForm.status == "INVALID"){
      alert('กรุณากรอกข้อมูลให้ครบ')
    }
    else {
      alert('เพิ่มข้อมูลสำเร็จ')
      this.addServ.addTeams(this.teamsForm.value).subscribe()
    }
  }

}
