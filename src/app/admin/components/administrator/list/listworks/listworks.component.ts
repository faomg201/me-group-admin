import { Component, OnInit } from '@angular/core';
import { HttpClientService} from '../../../../../shareds/_service/http-client.service'
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-listworks',
  templateUrl: './listworks.component.html',
  styleUrls: ['./listworks.component.css']
})
export class ListworksComponent implements OnInit {
  infoServ:any;
  infoWork:any;
  file: any;  
  p : number = 1
  
  worksForm = new FormGroup({
    goal_title: new FormControl(''),
    service_id: new FormControl(),
    goal_detail: new FormControl(''),
    goal_img: new FormControl('')
  });

  previewLoaded: boolean = false;
  constructor(private http: HttpClientService, private _router:Router) { }

  ngOnInit(): void {
    this.getWorks();
    this.onLoading();
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

  reLoading(){
    this.getWorks()
  }

  // resetFrom() {
  //   this.worksForm.reset();
  //   this.previewLoaded = false;
  // }

  onLoading(){    
    try {
       this.http.getData('/services').pipe(first()).subscribe((response:any) => {
      console.log(response)
      if (response.status == true){
        this.infoServ = response.data
      }
    });
    }catch (error){
      console.log(error)
    }  
}

createWorks(){
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
    window.location.reload();
  }
}

  getWorks(){
    this.http.getData('/goals').pipe(first()).subscribe((response:any) => {
      console.log(response)
      if (response.status == true){
        this.infoWork = response.data
      }
    },
    (error) =>{
      const response = error.error
      if(response.status == 500){
        alert('Failed cant Get Data');
      }
    })
  }

  deleteWorks(id : any){
    this.http.removeData('/goals/'+id).pipe(first()).subscribe((response:any) => {
      console.log(response) 
      if(response.status ==true ){
        console.log(this.infoWork)
        this.infoWork = response.data
        this.getWorks()
      }     
    },
    (error) => {
      const response = error.error
      if(response.status == 500){
        alert('can not Delete Data');
      }
    })
  }

  onClick(ServID: number){
    this._router.navigate(['admin/administrator/editworks', ServID]);
  }

}
