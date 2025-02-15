import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../../../services/api.service';
import { LanguageService } from '../../../../services/language.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { StepsModule } from 'primeng/steps';
import { TextareaModule } from 'primeng/textarea';
import { DialogModule } from 'primeng/dialog';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-special-order-data-information',
  standalone: true,
  imports: [TranslatePipe, NgIf, StepsModule, TextareaModule , DialogModule,NgFor,RadioButton,FormsModule],
  templateUrl: './special-order-data-information.component.html',
  styleUrl: './special-order-data-information.component.scss'
})
export class SpecialOrderDataInformationComponent {

  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  private lang = inject(LanguageService);
  currentLang = this.lang.translationService.currentLang;
  steps: any = [];
  activeIndex = -1
  order: any = {};
  imgBaseUrl = environment.baseImageUrl;
  defaultImg = 'assets/images/empty-state.png';
  displayDialog: boolean = false;
  orderType: any
  offerList: any[] = []
 offerSelectedValue:any={
  price: -1,
  specialOrderId: '',
  technicalId:''
 }
  get orderId() {
    const id = this.route.snapshot.params['id'];
    return id;
  }

  ngOnInit() {
    this.getOrderDetails();
    this.lang.translationService.onLangChange.subscribe(() => {
      this.currentLang = this.lang.translationService.currentLang;
      this.getOrderDetails();
    });
  }

  getSteps() {
    this.steps = [
      {
        label: this.currentLang == 'en' ? 'Pending' : 'تحت الطلب'
      },
      {
        label: this.currentLang == 'en' ? 'Canceled' : 'ملغي'
      },
      {
        label: this.currentLang == 'en' ? 'Completed' : 'مكتمل',
      }
    ]
  }

  getOrderDetails() {
    this.getSteps()
    this.apiService.get(`SpecialOrder/get/${this.orderId}`).subscribe((res: any) => {
      if (res.data) {
        this.order = res.data;
        this.activeIndex = res.data.specialOrderStatus - 1;
        this.orderType = res.data.specialOrderEnum
      }
    });
  }
  onSelectOffer(value:any){
    console.log("SpecialOrderDataInformationComponent  onSelectOffer  value:", value)
    this.offerSelectedValue=value
    
  }
  convertDateTime(date: string, convertTo: string, lang: string = 'en') {
    const toWorkTimeDate = new Date(date);

    if (convertTo === 'date') {
      return toWorkTimeDate.toLocaleDateString(
        lang === 'ar' ? 'ar-EG' : 'en-US',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      );
    } else {
      let formattedTime = toWorkTimeDate.toLocaleTimeString(
        lang === 'ar' ? 'ar-EG' : 'en-US',
        {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }
      );

      if (lang === 'ar') {
        formattedTime = formattedTime.replace('AM', 'ص').replace('PM', 'م');
      }

      return formattedTime;
    }
  }

  getOfferList() {
    this.apiService.get(`SpecialOrderOffer/GetBySpecialOrderId/${this.orderId}`).subscribe((res: any) => {
      if (res.data) {
        this.offerList=[]
        this.offerList=res.data
        console.log(res.data);

      }
    });
  }
  onSubmitOffer(){
    let payload={
      price: this.offerSelectedValue.price,
      specialOrderId: this.offerSelectedValue.specialOrderId,
      technicalId: this.offerSelectedValue.technicalId,
    }
    this.apiService.post(`SpecialOrderOffer/Create`,payload).subscribe((res: any) => {
      if (res) {
        this.hideDialog()
      }
    });
  }
  showDialog() {
    this.getOfferList();
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }

}
