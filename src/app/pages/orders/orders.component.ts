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
  imports: [ReactiveFormsModule, NgIf, NgClass, FormsModule, TranslatePipe, SelectButtonModule, InputTextModule, FloatLabelModule, NgFor],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  private apiService = inject(ApiService)
  private router = inject(Router)
  private lang = inject(LanguageService)
  currentLang = this.lang.translationService.currentLang
  selectedStatus: number = 0
  stateOptions: any[] = []
  selectedLang = this.lang.translationService.currentLang;

  defaultStatus: any;
  orders: any = {}


  ngOnInit() {
    this.stateOptions = [
      { label: this.currentLang == 'en' ? 'Pending' : 'تحت الطلب', id: 0, value: 0, color: '#c1cd6a' },
      { label: this.currentLang == 'en' ? 'Canceled' : 'ملغي', id: 8, value: 8, color: '#e94949' },
      { label: this.currentLang == 'en' ? 'Completed' : 'مكتمل', id: 7, value: 7, color: '#49e97c' }
    ]
    this.defaultStatus = this.stateOptions[0].value;
    this.onselectStatus(this.selectedStatus)
    this.lang.translationService.onLangChange.subscribe(() => {
      this.currentLang = this.lang.translationService.currentLang;
      this.stateOptions = [
        { label: this.currentLang == 'en' ? 'Pending' : 'تحت الطلب', id: 0, value: 0, color: '#c1cd6a' },
        { label: this.currentLang == 'en' ? 'Canceled' : 'ملغي', id: 8, value: 8, color: '#e94949' },
        { label: this.currentLang == 'en' ? 'Completed' : 'مكتمل', id: 7, value: 7, color: '#49e97c' }
      ]
      this.onselectStatus(this.selectedStatus)
    });
  }

  onselectStatus(value: number) {
    this.selectedStatus = value
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
  getOrders(orderStatus: number) {
    const userId = localStorage.getItem('userId')
    this.apiService.get(`Order/GetByClientId/${userId}`, { OrderStatus: orderStatus }).subscribe((res: any) => {
      if (res.data) {
        this.orders = {}
        this.orders = res.data
      }
    })
  }

  getOrderDetails(order: any) {
    this.router.navigateByUrl('/orders/' + order.orderId)

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
}
