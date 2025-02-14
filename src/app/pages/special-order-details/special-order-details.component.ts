import { Component, inject, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LanguageService } from '../../services/language.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Dialog } from 'primeng/dialog';
import { AddSpecialOrderComponent } from '../../components/add-special-order/add-special-order.component';

@Component({
  selector: 'app-special-order-details',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgClass,Dialog,AddSpecialOrderComponent,FormsModule,TranslatePipe,SelectButtonModule,InputTextModule,FloatLabelModule,NgFor],
  templateUrl: './special-order-details.component.html',
  styleUrl: './special-order-details.component.scss'
})

export class SpecialOrderDetailsComponent {
  api = inject(ApiService);
  languageService = inject(LanguageService);
  selectedLang = this.languageService.translationService.currentLang;
  showAddSpecialOrder:boolean=false

  route = inject(ActivatedRoute);
  router = inject(Router)
  orders: any;
  clientId: any;
  SpecialOrderEnum: any;
  currentLang = this.languageService.translationService.currentLang;


  stateOptions: any[]=[]

  defaultStatus: any;




  ngOnInit(): void {
    this.SpecialOrderEnum = this.route.snapshot.params['id'];
    this.clientId = localStorage.getItem('userId');
    this.stateOptions = [
      { label: this.selectedLang == 'en' ? 'Pending' : 'تحت الطلب' , id: 1,value: 1,color: '#c1cd6a' },
      { label: this.selectedLang == 'en' ? 'Canceled' : 'ملغي' , id: 2,value: 2, color: '#e94949' },
      { label: this.selectedLang ==' en' ? 'Completed' : 'مكتمل' , id: 3, value: 3, color: '#49e97c' }
    ]
    this.defaultStatus = this.stateOptions[0].value;

    this.getAllOrders(1);
    localStorage.removeItem('contractDetails');
    this.languageService.translationService.onLangChange.subscribe(() => {
      this.selectedLang = this.languageService.translationService.currentLang;
      this.stateOptions=[
        { label:this.selectedLang =='en'?'Pending':'تحت الطلب', id: 1,value: 1,color: '#c1cd6a' },
        { label: this.selectedLang =='en'?'Canceled':'ملغي', id: 2,value: 2, color: '#e94949' },
        { label: this.selectedLang =='en'?'Completed':'مكتمل', id: 3, value: 3, color: '#49e97c' }
      ]
    })
  }

  onselectStatus(value:number){
    this.getAllOrders(value)
  }

  getAllOrders(OrderStatus: any) {
    this.orders=[]
    this.api.get(`SpecialOrder/GetByClientId/${this.clientId}?OrderStatus=${OrderStatus}&SpecialOrderEnum=${this.SpecialOrderEnum}`).subscribe((res: any) => {
      console.log('ffff',res);
      this.orders=[]
      this.orders = res.data;
    })
  }
  getOrderDetails(order: any) {
    this.router.navigateByUrl('special_order_details/information/' + order.specialOrderId)

  }

  addSpecialOrder(){
     this.showAddSpecialOrder=true
  }
  API_createSpecialOrder(payload:any){
    this.api.post('SpecialOrder/Create',payload).subscribe(res=>{
     if(res)this.showAddSpecialOrder=false
    })
  }
  convertDateTime(date: string, convertTo: string, lang: string = "en") {
    const toWorkTimeDate = new Date(date);

    if (convertTo === "date") {
      return toWorkTimeDate.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else {
      let formattedTime = toWorkTimeDate.toLocaleTimeString(lang === "ar" ? "ar-EG" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      if (lang === "ar") {
        formattedTime = formattedTime.replace("AM", "ص").replace("PM", "م");
      }

      return formattedTime;
    }
  }
  onSubmitSpecialOrder(event:any){
    this.API_createSpecialOrder(event)
  console.log("SpecialOrder____ent  onSubmitSpecialOrder  event:", event)

  }
}
