import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { AddLocationComponent } from './location/add-location/add-location.component';


@Component({
  selector: 'app-location',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,TranslatePipe,InputTextModule,FloatLabelModule,NgFor,Dialog,AddLocationComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  private apiService =inject(ApiService)
  private router =inject(Router)
  locations:any[]=[]
  showAddLocationDialog:boolean=false
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
    
}

onAction(value:string,location?:any){
   console.log("LocationComponent  onAction  location:", location)
   if(value=='edit')
     this.router.navigateByUrl('location/'+location.id)
    else if(value=='delete')
    this.deleteLocation(location.id)
  else{
    // this.router.navigateByUrl('location/add')
this.showAddLocationDialog=true
  }

}

deleteLocation(id:string){
    this.apiService.delete('Location/Delete?requestId',id).subscribe(
      res=>{
        if(res)
          this.getLocation()
      }
    )
}
getLocation(){
  const userId =localStorage.getItem('userId')
  this.apiService.get('Location/GetByUserId/'+userId).subscribe((res:any)=>{
    if(res.data){
      this.locations=[]
      res.data.map((item:any) => {
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

API_addLocation(payload:any) {
    this.apiService
      .post('Location/Create', payload)
      .subscribe((res) => {
        if (res) {
         this.getLocation()
        }
      });
  }

onAddLocation(formValue:any){
this.API_addLocation(formValue)
this.showAddLocationDialog=false
}
 
}
