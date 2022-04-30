import { Component, OnInit } from '@angular/core';
import { HttpClientService} from '../../../../../shareds/_service/http-client.service'
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { FormControl, FormGroup} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

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
  constructor(private http: HttpClientService, private _router:Router, private toastService :HotToastService) { }

  ngOnInit(): void {
    this.getWorks();
    this.onLoading();
    // this.toastService.show('รักนะ', {
    //   duration: 10000,      
    //   style: {
    //     border: '2px solid blue',
    //     margin: '300px',
    //     height: '60px',
    //     position: 'top-center',
    //     padding: '50px',
    //     color: 'black',
    //     width: '250px',
    //     background: 'yellow'
        
    //   },
    //   iconTheme: {
    //     primary: 'yellow',
    //     secondary: '#FFFAEE',
    //   },
    // });
  }

  onChangePhoto(e: any) {
    const file: File = e.target.files[0];
    if (file) {
      this.worksForm.patchValue({
        goal_img: file,
      });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.file = reader.result;
      };
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
    this.toastService.warning('ใส่ชื่อผลงานไม่ถูกต้อง กรุณากรอกใหม่')
  }
  else if(!RegExp('^[0-9]+$').test(this.worksForm.get('service_id')?.value)) {
    this.toastService.warning('กรุณาใส่ประเภทผลงาน')
  }
  else if(!RegExp('^[ก-๙a-zA-Z0-9\\s]+$').test(this.worksForm.get('goal_detail')?.value)){
    this.toastService.warning('กรุณากรอกรายละเอียดผลงาน')
  }
  else if(!RegExp('^.*\.(jpg|JPG|png|PNG)$').test(this.worksForm.get('goal_img')?.value.name)){
    this.toastService.warning('กรุณาใส่รูปภาพ')
  }
  else if(this.worksForm.status == "INVALID"){
    alert('กรุณากรอกข้อมูลให้ครบ')
    this.toastService.warning('กรุณาใส่รูปภาพ')
  }
  else {
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
    const formData = new FormData();
      formData.append(
        'goal_img',
        this.worksForm.get('goal_img')?.value
      );
      formData.append(
        'goal_title',
        this.worksForm.get('goal_title')?.value
      );
      formData.append(
        'goal_detail',
        this.worksForm.get('goal_detail')?.value
      );
      formData.append(
        'service_id',
        this.worksForm.get('service_id')?.value
      );
    this.http.createData('/goals',formData).pipe(first()).subscribe()
    setTimeout("location.reload(true);", 2000);
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

  getnameDel(id: number) {
    console.log(id);
    this.http
      .getData('/goals/' + id)
      .pipe(first())
      .subscribe((response: any) => {
        this.infoWork = response.data;
        console.log(this.infoWork, +6666);
        console.log(this.infoWork.goal_title);
      });
  }

  deleteWorks(id : any){
    this.http.removeData('/goals/'+id).pipe(first()).subscribe((response:any) => {
      console.log(response) 
      if(response.status ==true ){
        console.log(this.infoWork)
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
