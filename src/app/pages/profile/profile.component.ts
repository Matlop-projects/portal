import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePicker } from 'primeng/datepicker';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule,TranslatePipe,InputTextModule,FloatLabelModule,DatePicker],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private apiService =inject(ApiService)
  data:any={}
  baseImageUrl=environment.baseImageUrl
  defaultImg='https://matloop.phpv8.aait-d.com/dashboardAssets/images/backgrounds/avatar.jpg'
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
    this.form.valueChanges.subscribe(res => {
      console.log("ProfileComponent  ngOnInit  res:", res)

    })
}
  getProfileInfo(){
    this.apiService.get('Client/GetById/1').subscribe((res:any)=>{
      if(res){
        this.data.imgSrc =this.baseImageUrl+res.data.imgSrc
        console.log("ProfileComponent  this.apiService.get   this.data:",  this.data)
        this.form.patchValue({
          ...res.data,
          dateOfBirth:new Date(res.data.dateOfBirth)
        })
        console.log('gg',this.form.value)

      } 
    })
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
