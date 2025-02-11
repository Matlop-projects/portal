import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../../services/api.service';
import { LanguageService } from '../../../services/language.service';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { StepsModule } from 'primeng/steps';
@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [TranslatePipe, NgIf, StepsModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  private lang = inject(LanguageService);
  currentLang = this.lang.translationService.currentLang;
  steps: any = [];
  activeIndex=-1
  order: any = {};
  imgBaseUrl = environment.baseImageUrl;
  defaultImg = 'assets/images/empty-state.png';
  get orderId() {
    const id = this.route.snapshot.params['id'];
    return id;
  }
  // PackageTypeList = [
  //   {
  //     name: 'Daily',
  //     nameAr: 'يومي',
  //     code: 1,
  //   },
  //   {
  //     name: 'Monthly',
  //     nameAr: 'شهري',
  //     code: 2,
  //   },
  //   {
  //     name: 'Qurater',
  //     nameAr: 'ربع سنوي',
  //     code: 3,
  //   },
  //   {
  //     name: 'Biannual',
  //     nameAr: 'نصف سنوي',
  //     code: 4,
  //   },
  //   {
  //     name: 'Yearly',
  //     nameAr: 'سنوي',
  //     code: 5,
  //   },
  //   {
  //     name: 'Weekly',
  //     nameAr: 'اسبوعي',
  //     code: 6,
  //   },
  // ];
  ngOnInit() {
    this.getOrderDetails();
    this.lang.translationService.onLangChange.subscribe(() => {
      this.currentLang = this.lang.translationService.currentLang;
      this.getOrderDetails();
    });
  }

  getSteps(){
   this.steps=[
    {
      label: this.currentLang == 'en' ? 'Pending' : 'قيد الانتظار',
    },
    {
      label: this.currentLang == 'en' ? 'Paid' : 'مدفوع',
    },
    {
      label: this.currentLang == 'en' ? 'Assigned To Provider' : 'مخصص للمزود',
    },
    {
      label: this.currentLang == 'en' ? 'In The Way' : 'في الطريق',
    },
    {
      label: this.currentLang == 'en' ? 'Trying Solve Problem' : 'محاولة حل المشكلة',
    },
    {
      label: this.currentLang == 'en' ? 'Solved' : 'تم الحل',
    },
    {
      label: this.currentLang == 'en' ? 'Client Confirmation' : 'معلومات العميل',
    },
    {
      label: this.currentLang == 'en' ? 'Completed' : 'مكتمل',
    }
   ]
  }
  getOrderDetails() {
    this.getSteps()
    this.apiService.get(`Order/get/${this.orderId}`).subscribe((res: any) => {
      if (res.data){
        this.order = res.data;
        this.activeIndex=res.data.orderStatusEnum
      } 
    });
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

}
