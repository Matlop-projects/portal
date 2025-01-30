import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePicker } from 'primeng/datepicker';
import { environment } from '../../../environments/environment';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-location',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,TranslatePipe,InputTextModule,FloatLabelModule,DatePicker],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  private apiService =inject(ApiService)
  data:any={}
  // baseImageUrl=environment.baseImageUrl
  form = new FormGroup({
    userId: new FormControl(0),
    countryName: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    cityName: new FormControl('', {
      validators: [
        Validators.required,
      ]
    }),
    districtName: new FormControl('', {
      validators: [
        Validators.required,
      ]
    }),
    blockNo: new FormControl('', {
      validators: [
        Validators.required,
      ]
    })
  })

ngOnInit() {
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
      // this.data=res.data[0]
      this.form.patchValue({
        ...res.data[0]
      })
      
    }
  })
}
 
  onSubmit(){
    console.log('ggkkkk',this.form.value)
    // const date =this.form.value.dateOfBirth
    // date.setHours(0, 0, 0, 0); 
    // console.log("ProfileComponent  onSubmit  date:", date)
    this.form.patchValue({
      // dateOfBirth:date
    })
    console.log('ggkkkk---',this.form.value)

    this.apiService.post('Client/EditProfile',this.form.value).subscribe(res=>{
      if(res)
        this.getLocation()
    })
  }
}
