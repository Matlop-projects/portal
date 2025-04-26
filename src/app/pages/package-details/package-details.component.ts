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
import { AddLocationComponent } from '../../pages/location/location/add-location/add-location.component';
import { Dialog } from 'primeng/dialog';


interface UploadedFile {
  src: string;
  mediaTypeEnum: number;
}

@Component({
  selector: 'app-package-details',
  standalone: true,
  imports: [TranslatePipe, NgIf, NgFor, Dialog, AddLocationComponent, Select, FileUpload, TextareaModule, FormsModule, DatePicker, InputTextModule, NgClass],
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
  showAddLocationDialog: boolean = false


  paymentList = [
    // {
    //     "paymentId": 1,
    //     "enName": "cash",
    //     "arName": "كاش",
    //     "enDescription": "<p>Payment in cash to the worker supervisor upon completion of the order on site</p>",
    //     "arDescription": "<p>الدفع كاش لمشرف العمال عند الانتهاء من الطلب في الموقع </p>"
    // },
    // {
    //     "paymentId": 2,
    //     "enName": "stc pay",
    //     "arName": "اس تي سي باي",
    //     "enDescription": "<p>Payment is made by STC Pay in the program when ordering the package</p>",
    //     "arDescription": "<p>الدفع بواسطة اس تي سي باي في البرنامج عند القيام بطلب الباقة </p>"
    // },
    {
      "paymentId": 3,
      "enName": "credit card",
      "arName": "بطاقة بنكية ",
      "enDescription": "<p>Payment by bank card while ordering the package in the program</p>",
      "arDescription": "<p>الدفع بواسطة البطاقة البنكية اثناء طلب الباقة في البرنامج </p>",
      finalPayment: `credit card - بطاقة بنكية `,
    },
    // {
    //     "paymentId": 4,
    //     "enName": "apple pay",
    //     "arName": "ابل باي ",
    //     "enDescription": "<p>Payment via Apple Pay when ordering the package in the program</p>",
    //     "arDescription": "<p>الدفع بواسطة ابل باي عند طلب الباقة في البرنامج</p>"
    // },
    // {
    //     "paymentId": 6,
    //     "enName": "Bank transfer",
    //     "arName": "تحويل بنكي ",
    //     "enDescription": "<p>Payment is by bank transfer to the company&#39;s account</p>",
    //     "arDescription": "<p>الدفع بواسطة تحويل بنكي على حساب الشركة</p>"
    // },
    // {
    //     "paymentId": 7,
    //     "enName": "wallet",
    //     "arName": "محفظة ",
    //     "enDescription": "<p>Payment using the wallet balance in the application</p>",
    //     "arDescription": "<p>الدفع بواسطة رصيد المحفظة في التطبيق </p>"
    // }
  ]
  paymentSelect: any;

  workingHoursSelect: any;
  workingHoursList: any;

  dates: any;
  minDate: Date | null = null; // Initialize as null
  maxDate: Date | null = null; // Initialize as null
  isDateInvalid: boolean = false;

  errorMessage: any;

  noteValue: string = '';


  uploadedFiles: UploadedFile[] = [];
  discountType: any;

  orderObject: any = {
    clientId: 0,
    paymentWayId: null,
    media: [{ src: '', mediaTypeEnum: 0 }],
    notes: "",
    packageId: 0,
    coponeId: null,
    locationId: null,
    vistTimeId: null,
    orderSubTotal: 0,
    orderTotal: 0,
    scheduleDates: [],
    orderEquipments: []
  }

  contractName: any;
  isoDates: any;
  equipments: any[] = [];


  ngOnInit(): void {
    // this.getPaymentList();
    this.contractDetails = localStorage.getItem('contractDetails');
    this.userId = localStorage.getItem('userData');
    this.userId = JSON.parse(this.userId);
    this.orderObject.clientId = +this.userId.id;
    this.getLocationByuserId(+this.userId.id);

    this.getEquipmentsList(this.packageId);
    this.getWorkingHours();
    this.setCalendarLimits();
    this.contractDetails = JSON.parse(this.contractDetails);
    console.log(this.contractDetails);
    this.contractName = localStorage.getItem('contractName');
    this.contractName = JSON.parse(this.contractName);

    this.getPackagesListById(this.packageId);
    this.orderObject.packageId = this.packageId;
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
      this.orderObject.orderTotal = item.data.price;
    });
  }

  getLocationByuserId(userId: number) {
    this.ApiService.get(`Location/GetByuserId/${userId}`).subscribe((loc: any) => {
      this.locationList = loc.data.map((item: any) => ({
        ...item,
        finalLocation: `${item.countryName}-${item.cityName}-${item.districtName}`,
      }));
    })
  }

  onLocationChange(data: any) {
    this.orderObject.locationId = data.value.locationId;
  }

  checkCoupon() {
    if (this.coupon) {
      this.ApiService.get(`Copone/Verfiy/${this.coupon}/${+this.userId.id}`).subscribe((loc: any) => {
        this.invalidCoupn = false;
        this.validCoupon = true;
        this.toaster.successToaster('Coupon Addedd Successfully');
        this.discountType = loc.data.coponeType;
        this.packageDetails.couponPrice = 0;
        this.packageDetails.couponDiscount = 0;
        if (loc.data.offerType == 1) {
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

  // getPaymentList() {
  //   // this.ApiService.get(`PaymentWay/GetAll`).subscribe((pay: any) => {
  //   //   console.log(pay);
  //   //   this.paymentList = pay.data.map((item: any) => ({
  //   //     ...item,
  //   //     finalPayment: `${item.enName}-${item.arName}`,
  //   //   }));
  //   // })
  //   console.log( this.paymentList);

  //  this.paymentList.map((item: any) => ({
  //     finalPayment: `${item.enName}-${item.arName}`,
  //   }));

  //   console.log( this.paymentList);
  // }

  onPaymentChange(e: any) {
    this.orderObject.paymentWayId = e.value.paymentId;
  }

  getWorkingHours() {
    this.ApiService.get(`WorkingTime/GetAll`).subscribe((hours: any) => {
      this.workingHoursList = hours.data.map((item: any) => ({
        ...item,
        finalWorking: `${new Date(item.startDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} - ${new Date(item.endDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
      }));
    });
  }

  onWorkingHoursChange(e: any) {
    this.orderObject.vistTimeId = e.value.workTimeId;
  }

  setCalendarLimits() {
    if (this.contractDetails.packageType == 2) {
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
    // packageType
    console.log(this.packageDetails);

    console.log(this.contractDetails);
    if (this.contractDetails[0].packageType == 2) {
      validationValue = Math.ceil((this.packageDetails.visitNumber / 4));
      console.log(validationValue);
      if (this.dates.length < validationValue) {
        this.errorMessage = `You must select at least ${validationValue} dates.`;
        this.isDateInvalid = true;
      } else {
        this.isDateInvalid = false;
        this.errorMessage = '';
        this.isoDates = this.dates.map((date: any) => date.toISOString());
        this.orderObject.scheduleDates = (this.isoDates);

      }

    } else {
      this.isDateInvalid = false;
      this.errorMessage = '';
      this.isoDates = this.dates.map((date: any) => date.toISOString());
      this.orderObject.scheduleDates = (this.isoDates);
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
    const files = event.currentFiles;
    console.log(files);

    this.uploadedFiles.length = 0;
    const promises = files.map((file: File) => {
      return this.convertFileToBase64(file).then((base64String: string) => ({
        src: base64String,
        mediaTypeEnum: file.type.startsWith('image/') ? 1 : file.type.startsWith('video/') ? 2 : 0,
        fileName: file.name
      }));
    });

    Promise.all(promises)
      .then((processedFiles) => {
        console.log(processedFiles);

        this.uploadedFiles = processedFiles.filter(file => file.src !== '');

        this.orderObject.media = [...this.uploadedFiles];

      })
      .catch((error) => {
        console.error('Error processing files:', error);
      });
  }

  onRemove(data: any) {
    this.orderObject.media.length = 0;
    this.uploadedFiles = this.uploadedFiles.filter((item: any) => item.fileName !== data.file.name);
    this.orderObject.media = [...this.uploadedFiles];
  }

  onClear() {
    this.orderObject.media.length = 0;
  }




  clearMedia() {
    this.uploadedFiles.length = 0;
  }

  API_addLocation(payload: any) {
    this.ApiService
      .post('Location/Create', payload)
      .subscribe((res) => {
        if (res) {
          this.getLocationByuserId(+this.userId.id);
        }
      });
  }

  onAddLocation(formValue: any) {
    this.API_addLocation(formValue)
    this.showAddLocationDialog = false
  }

  addLocation() {
    this.showAddLocationDialog = true
  }

  createOrder() {
    if (this.orderObject.locationId == null) {
      this.toaster.errorToaster(this.languageService.translate('PACKAGE_DETAILS.VALIDATION.LOCATION'));
    } else if (this.orderObject.paymentWayId == null) {
      this.toaster.errorToaster(this.languageService.translate('PACKAGE_DETAILS.VALIDATION.PAYMENT'));
    } else if (this.orderObject.vistTimeId == null) {
      this.toaster.errorToaster(this.languageService.translate('PACKAGE_DETAILS.VALIDATION.VISTI_TIME'));
    } else if (this.orderObject.scheduleDates.length == 0) {
      this.toaster.errorToaster(this.languageService.translate('PACKAGE_DETAILS.VALIDATION.SHCEDULE'));
    } else {
      this.orderObject.notes = this.noteValue;
      console.log(this.orderObject);
      this.ApiService.post('Order/Create', this.orderObject).subscribe((res: any) => {
        console.log(res);
        const orderId = res.data.orderId;
        window.location.href = `https://aspng.matlop.com/payment/creditcardweb?orderid=${orderId}`;
      })
    }
  }


  getEquipmentsList(packageId: any) {
    this.ApiService.get(`Equipment/GetByPackageId/${packageId}`).subscribe((res: any) => {
      console.log(res);

      this.equipments = res.data.map((item: any) => ({
        ...item,
        status: false  // ✅ Add status property
      }));

      console.log(this.equipments); // Now it will have status: false
    });
  }

  selectedEquipments: { equipmentId: number }[] = []; // declare at top of your TS file

  toggleStatus(equipment: any) {
    equipment.status = !equipment.status;

    // After toggling, regenerate the selectedEquipments array
    this.selectedEquipments = this.equipments
      .filter((item: any) => item.status)
      .map((item: any) => ({
        equipmentId: item.equipmentId,
        orderEquipmentId: 0,
        orderId: 0,
      }));

    console.log(this.selectedEquipments); // check in console
    this.orderObject.orderEquipments = this.selectedEquipments;
    console.log(this.orderObject);

  }


}
