import { Component, inject, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '@ngx-translate/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToasterService } from '../../services/toaster.service';
import { DatePicker } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { FileUpload } from 'primeng/fileupload';




@Component({
  selector: 'app-package-details',
  standalone: true,
  imports: [TranslatePipe, NgIf, NgFor, Select, FileUpload, TextareaModule, FormsModule, DatePicker, InputTextModule, NgClass],
  templateUrl: './package-details.component.html',
  styleUrl: './package-details.component.scss'
})
export class PackageDetailsComponent {

  private ApiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toaster = inject(ToasterService);

  selectedLang: any;
  languageService = inject(LanguageService);
  @Input() packageId: any;
  packageDetails: any
  contractDetails: any;
  userId: any;
  locationList: any;
  locationSelect: any;
  coupon: any;
  invalidCoupn: boolean = false;
  validCoupon: boolean = false;
  invalidCoupnMessage: string = '';

  paymentList: any;
  paymentSelect: any;

  workingHoursSelect: any;
  workingHoursList: any;

  dates: any;
  minDate: Date | null = null; // Initialize as null
  maxDate: Date | null = null; // Initialize as null
  isDateInvalid: boolean = false;

  errorMessage: any;

  noteValue: any;
  uploadedFiles: any[] = [];
  discountType: any;



  ngOnInit(): void {
    this.contractDetails = localStorage.getItem('contractDetails');
    this.userId = localStorage.getItem('userData');
    this.userId = JSON.parse(this.userId);
    this.getLocationByuserId(+this.userId.id);
    this.getPaymentList();
    this.getWorkingHours();
    this.setCalendarLimits();
    this.contractDetails = JSON.parse(this.contractDetails);
    this.getPackagesListById(this.packageId);
    this.selectedLang = this.languageService.translationService.currentLang;
    this.languageService.translationService.onLangChange.subscribe(() => {
      this.selectedLang = this.languageService.translationService.currentLang;
    });
  }

  getPackagesListById(packageId: string) {
    this.ApiService.get(`Package/GetPackage/${packageId}`).subscribe((item: any) => {
      console.log(item.data);
      this.packageDetails = item.data;
      this.packageDetails.couponPrice = 0;
      this.packageDetails.couponDiscount = 0;
    });
    console.log(this.packageDetails);

  }

  getLocationByuserId(userId: number) {
    this.ApiService.get(`Location/GetByuserId/${userId}`).subscribe((loc: any) => {
      console.log(loc);
      this.locationList = loc.data.map((item: any) => ({
        ...item,
        finalLocation: `${item.countryName}-${item.cityName}-${item.districtName}`,
      }));
    })
  }

  onLocationChange(data: any) {
    console.log(data);
  }

  checkCoupon() {
    if (this.coupon) {
      this.ApiService.get(`Copone/Verfiy/${this.coupon}`).subscribe((loc: any) => {
        console.log(loc);
        this.invalidCoupn = false;
        this.validCoupon = true;
        this.toaster.successToaster('Coupon Addedd Successfully');
        this.discountType = loc.data.coponeType;
        this.packageDetails.couponPrice = 0;
        this.packageDetails.couponDiscount = 0;
        if (loc.data.coponeType == 1) {
          this.packageDetails.couponDiscount = loc.data.amount;
          this.packageDetails.couponPrice = this.calculateSalePrice(this.packageDetails.price, loc.data.amount);
        } else {
          this.packageDetails.couponDiscount = loc.data.amount;
          this.packageDetails.couponPrice = this.packageDetails.price - this.packageDetails.couponPrice
        }
      }, err => {
        this.invalidCoupn = true;
        this.validCoupon = false;
        this.invalidCoupnMessage = err.error.message;
        this.toaster.errorToaster('Invalid Coupon');
      })
    } else {
      this.toaster.errorToaster('Please Add Coupon');
    }
  }

  calculateSalePrice(originalPrice: number, discountPercentage: number): number {
    return originalPrice - (originalPrice * discountPercentage) / 100;
  }

  getPaymentList() {
    this.ApiService.get(`PaymentWay/GetAll`).subscribe((pay: any) => {
      console.log(pay);
      this.paymentList = pay.data.map((item: any) => ({
        ...item,
        finalPayment: `${item.enName}-${item.arName}`,
      }));
    })
  }

  onPaymentChange(e: any) {
    console.log(e);
  }

  getWorkingHours() {
    this.ApiService.get(`WorkingTime/GetAll`).subscribe((hours: any) => {
      console.log(hours);
      this.workingHoursList = hours.data.map((item: any) => ({
        ...item,
        finalWorking: `${new Date(item.startDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} - ${new Date(item.endDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
      }));
    });
  }

  onWorkingHoursChange(e: any) {
    console.log(e);
  }

  setCalendarLimits() {
    if (this.contractDetails.contractTypeId == 28) {
      this.minDate = new Date();
      this.minDate.setDate(this.minDate.getDate() + 1);

      this.maxDate = new Date();
      this.maxDate.setMonth(this.maxDate.getMonth() + 1);
    } else {
      this.minDate = new Date();
      this.minDate.setDate(this.minDate.getDate() + 1);

      this.maxDate = null;
    }
  }


  validateMinDates() {
    let validationValue = 0;
    console.log(this.contractDetails.contractTypeId);
    if (this.contractDetails.contractTypeId == 28) {
       validationValue =  Math.ceil(( this.packageDetails.visitNumber / 4 ) );
       console.log(validationValue);
       if (this.dates.length < validationValue) {
        this.errorMessage = `You must select at least ${validationValue} dates.`;
        this.isDateInvalid = true;
      } else {
        this.isDateInvalid = false;
        this.errorMessage = '';
      }

    } else {

    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string); // Convert to Base64
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file); // Read the file as a Data URL
    });
  }

  onSelect(event: any): void {
    const files = event.currentFiles; // Array of selected files
    console.log(files);

    const promises = files.map((file: File) => {
      return this.convertFileToBase64(file).then((base64String: string) => ({
        src: base64String,
        mediaTypeEnum: file.type.startsWith('image/') ? 1 : file.type.startsWith('video/') ? 2 : 0,
      }));
    });

    Promise.all(promises)
      .then((processedFiles) => {
        console.log(processedFiles); // Final processed array
        this.uploadedFiles.push(...processedFiles); // Add to `uploadedFiles`
      })
      .catch((error) => {
        console.error('Error processing files:', error);
      });
  }

  clearMedia() {
    this.uploadedFiles.length = 0;
  }

}
