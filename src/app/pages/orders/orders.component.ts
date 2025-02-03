import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { LanguageService } from '../../services/language.service';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgClass,FormsModule,TranslatePipe,SelectButtonModule,InputTextModule,FloatLabelModule,NgFor],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  private apiService =inject(ApiService)
  private router =inject(Router)
  private lang =inject(LanguageService)
  currentLang=this.lang.translationService.currentLang
  selectedStatus:number=0
  stateOptions=[
    { label: 'Pending', id: 0,value: 0,color: '#c1cd6a' },
    { label: 'Canceled', id: 8,value: 8, color: '#e94949' },
    { label: 'Completed', id: 7, value: 7, color: '#49e97c' }
  ]
  defaultStatus = this.stateOptions[0].value; 
  orders:any={}
 

ngOnInit() {
    this.onselectStatus(this.selectedStatus)
    this.lang.translationService.onLangChange.subscribe(() => {
      this.currentLang = this.lang.translationService.currentLang;
      this.onselectStatus(this.selectedStatus)
    }); 
}

onselectStatus(value:number){
  this.selectedStatus=value
  this.getOrders(value)

}

// deleteLocation(id:string){
//     this.apiService.delete('Location/Delete?requestId',id).subscribe(
//       res=>{
//         if(res)
//           this.getLocation()
//       }
//     )
// }
getOrders(orderStatus:number){
  const userId =localStorage.getItem('userId')
  this.apiService.get(`Order/GetByClientId/${userId}`,{OrderStatus:orderStatus}).subscribe((res:any)=>{
    if(res.data){
      this.orders={}
      this.orders=res.data
    }
  })
}
 
convertDate(date:string ,convertTo:string){
  const toWorkTimeDate = new Date(date)
  if(convertTo=='date'){
    const formattedDate = toWorkTimeDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate
  }

  
  else{
    const formattedTime = toWorkTimeDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return  formattedTime
  }

  
}
}
