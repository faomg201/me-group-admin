import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../shareds/_service/http-client.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { empty, first, NEVER, never } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-listaboutus',
  templateUrl: './listaboutus.component.html',
  styleUrls: ['./listaboutus.component.css'],
})
export class ListaboutusComponent implements OnInit {
  images: string[] = [];

  /*------------------------------------------
  --------------------------------------------
  Declare Form
  --------------------------------------------
  --------------------------------------------*/
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    image_name: new FormControl('', [Validators.required, Validators.maxLength(7)]),
  });

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/

  // const MAX_LENGTH = 10;
  // const photoUpload = (e) => {
  //   if (Array.from(e.target.files).length > MAX_LENGTH) {
  //     e.preventDefault();
  //     alert(` กรุณาเลือกไฟล์ครั้งละไม่เกิน ${MAX_LENGTH} ภาพต่อครั้ง`);
  //     return;
  //   }
  // }
  // previewLoaded = false;
  // file: any;
  // serviceForm = new FormGroup({
  //   service_name: new FormControl(''),
  //   service_detail: new FormControl(''),
  //   service_img: new FormControl(''),
  // });
  constructor(private toastService: HotToastService, private http: HttpClientService) { }

  ngOnInit(): void {

  }

  // onChangePhoto(e: any) {
  //   const file: File = e.target.files[0];
  //   if (file) {
  //     this.serviceForm.patchValue({
  //       service_img: file,
  //     });
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       // this.previewLoaded = true;
  //       this.file = reader.result;
  //     };
  //   }
  // }

  get f() {
    return this.myForm.controls;
  }
  submit() {
    const data = this.myForm.get('image_name')?.value;
    // const dataRm: string[] = [];
    // const sender = {
    //   current: data, remove: dataRm
    // }
    // console.log(data[1].name);
    

    // const formValues = new FormData();
    // for (let i = 0; i < data.length; i++) {
    //   formValues.append("name", data[i].name, data[i].size); 
    // }

    const formData = new FormData();
    
    for (let i = 0; i < data.length; i++) {
      formData.append('image_name', this.myForm.get('image_name')?.value[i]);
      }


    this.http.createData('/aboutUs/image', formData).pipe(first()).subscribe((response: any) => {
      console.log(response);

      if (response.statusCode == 201) {
        console.log(response);
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
    // if(data.length<8){
    //   for (let i = data.length; i < 8; i++) {
    //     dataRm.push(data,'ว่าง')
    //   }
    //    console.log(dataRm);

    // }
    // const rmt = []


    // data.splice(1, 1);
    // rmt.push(2)
    // console.log(data);
    // console.log(rmt);

  }
  onFileChange(event: any) {
    //   const MAX_LENGTH = 8;
    //   const photoUpload = (e:any) => {
    //   if (Array.from(e.targeventt.files).length > MAX_LENGTH) {
    //     e.preventDefault();
    //     alert(` กรุณาเลือกไฟล์ครั้งละไม่เกิน ${MAX_LENGTH} ภาพต่อครั้ง`);
    //     return;
    //   }
    // }

    if (event.target.files.length < 8) {
      // if (event.target.files.length < 8 && !event.target.files) {
      //   // const file: File = event.target.files;
      //   const file: File = event.target.files['']
      //   console.log(file);
      // }else{
      // const file: File = event[]
      const file: File = event.target.files;
      if (file) {
        this.myForm.patchValue({
          image_name: file,
        });
      }
      console.log(this.myForm.get('image_name')?.value);

      // }



      for (let i = 0; i < 7; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          // this.images.push(event.target.result);
          // this.myForm.patchValue({
          //   image_name: this.images
          // });
        };
        // reader.readAsDataURL(event.target.files[i]);
      }

    }
  }
}
