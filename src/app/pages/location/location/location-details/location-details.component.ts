import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-location-details',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,TranslatePipe,InputTextModule,FloatLabelModule,NgFor],
  templateUrl: './location-details.component.html',
  styleUrl: './location-details.component.scss'
})
export class LocationDetailsComponent {
 private apiService =inject(ApiService)
  private route =inject(ActivatedRoute)
  private router =inject(Router)
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
    }),
    latitude:  new FormControl(''),
    longitude: new FormControl(''),
    name:  new FormControl(''),
    locationId: new FormControl(''),
    cityId: new FormControl(''),
    countryId:new FormControl(''),
    districtId:new FormControl('')

  })

ngOnInit() {
  const id =this.route.snapshot.params['id']
    this.getLocationById(id)
    
}




getLocationById(locationId:string){
  this.apiService.get('Location/GetById/'+locationId).subscribe((res:any)=>{
    if(res){
      console.log("ProfileComponent  this.apiService.get  res:", res)
      this.form.patchValue({
        ...res.data
      })
     
      
    }
  })
}
 
  onSubmit(){   
    console.log('ggkkkk---',this.form.value)

    this.apiService.put('Location/Update',this.form.value).subscribe(res=>{
      if(res)
        this.router.navigateByUrl('/location')
    })
  }
}
