import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-listaboutus',
  templateUrl: './listaboutus.component.html',
  styleUrls: ['./listaboutus.component.css']
})
export class ListaboutusComponent implements OnInit {

  images : string[] = [];
  
  /*------------------------------------------
  --------------------------------------------
  Declare Form
  --------------------------------------------
  --------------------------------------------*/
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  p=1;
  // const MAX_LENGTH = 10;
  // const photoUpload = (e) => {
  //   if (Array.from(e.target.files).length > MAX_LENGTH) {
  //     e.preventDefault();
  //     alert(` กรุณาเลือกไฟล์ครั้งละไม่เกิน ${MAX_LENGTH} ภาพต่อครั้ง`);
  //     return;
  //   }
  // }
  previewLoaded=false;
  file: any;
  serviceForm = new FormGroup({
    service_name: new FormControl(''),
    service_detail: new FormControl(''),
    service_img: new FormControl(''),
  });
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
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
        // this.previewLoaded = true;
        this.file = reader.result;
      };
    }
  }

    
  /**
   * Write code on Method
   *
   * @return response()
   */
   get f(){
    return this.myForm.controls;
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = 5
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
     
                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.images.push(event.target.result); 
   
                   this.myForm.patchValue({
                      fileSource: this.images
                   });
                }
    
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.myForm.value);
    this.http.post('http://localhost:8001/upload.php', this.myForm.value)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }

}
