import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-location',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,TranslatePipe,InputTextModule,FloatLabelModule,NgFor],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  private apiService =inject(ApiService)
  private router =inject(Router)
  locations:any[]=[]
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

onAction(value:string,location:any){
   console.log("LocationComponent  onAction  location:", location)
   if(value=='edit')
     this.router.navigateByUrl('location/'+location.id)
    else
    this.deleteLocation(location.id)
}

deleteLocation(id:string){
  const userId =localStorage.getItem('userId')
    this.apiService.delete('Loction/Delete?requestId=',id).subscribe()
}
getLocation(){
  const userId =localStorage.getItem('userId')
  this.apiService.get('Location/GetByUserId/'+userId).subscribe((res:any)=>{
    if(res){
      console.log("ProfileComponent  this.apiService.get  res:", res)
      res.data.map((item:any) => {
        console.log("LocationComponent  res.data.map  item:", item)
        this.locations.push({
          countryName:item.countryName,
          cityName:item.cityName,
          districtName:item.districtName,
          blockNo:item.blockNo,
          id:item.locationId
        })
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
