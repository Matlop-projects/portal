import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePicker } from 'primeng/datepicker';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule,TranslatePipe,InputTextModule,FloatLabelModule,DatePicker],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  private apiService =inject(ApiService)
  data:any={}
  defaultImg:any=environment.baseImageUrl+localStorage.getItem('userImg')
  form = new FormGroup({
    userId: new FormControl(0),
  firstName: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    lastName: new FormControl('', {
      validators: [
        Validators.required,
      ]
    }),
    username: new FormControl('', {
      validators: [
        Validators.required,
      ]
    }),
    email: new FormControl('', {
      validators: [
        Validators.required,
      ]
    }),
    mobileNumber: new FormControl(null, {
      validators: [
        Validators.required,
      ]
    }),
    dateOfBirth: new FormControl <any>('', {
      validators: [
        Validators.required,
      ]
    }),
    imgSrc: new FormControl(null)
  })

ngOnInit() {
    this.getProfileInfo()
    this.getLocation()
    this.form.valueChanges.subscribe(res => {
      console.log("ProfileComponent  ngOnInit  res:", res)

    })
}
getLocation(){
  const userId =localStorage.getItem('userId')
  this.apiService.get('Location/GetByUserId/'+userId).subscribe((res:any)=>{
    if(res){
      console.log("ProfileComponent  this.apiService.get  res:", res)
      
    }
  })
}
  getProfileInfo(){
    const userId =localStorage.getItem('userId')
    this.apiService.get('Client/GetById/'+userId).subscribe((res:any)=>{
      if(res){
        this.data.imgSrc =environment.baseImageUrl+res.data.imgSrc
        console.log("ProfileComponent  this.apiService.get   this.data:",  this.data)
        this.form.patchValue({
          ...res.data,
          dateOfBirth:new Date(res.data.dateOfBirth)
        })
        console.log('gg',this.form.value)

      } 
    })
  }

  triggerFileUpload(): void {
    this.fileInput.nativeElement.click(); // Triggers file selection
  }
  onFileSelected(event:any){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Read file as Data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.defaultImg = e.target?.result;
        this.form.patchValue({
          imgSrc:this.defaultImg
        })
      };
      reader.readAsDataURL(file);
    }
  }
  onSubmit(){
    console.log('ggkkkk',this.form.value)
    const date =this.form.value.dateOfBirth
    // date.setHours(0, 0, 0, 0); 
    console.log("ProfileComponent  onSubmit  date:", date)
    this.form.patchValue({
      dateOfBirth:date
    })
    console.log('ggkkkk---',this.form.value)

    this.apiService.post('Client/EditProfile',this.form.value).subscribe(res=>{
      if(res)
        this.getProfileInfo()
    })
  }
}
