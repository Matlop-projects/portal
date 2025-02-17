import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { Select } from 'primeng/select';
import { ApiService } from '../../services/api.service';
import { LanguageService } from '../../services/language.service';
import { FileUpload } from 'primeng/fileupload';
import { DatePipe, NgIf } from '@angular/common';
import { DatePicker } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { Dialog } from 'primeng/dialog';
import { AddLocationComponent } from '../../pages/location/location/add-location/add-location.component';

@Component({
  selector: 'app-add-special-order',
  standalone: true,
  imports: [
    DatePicker,
    ReactiveFormsModule,
    TranslatePipe,
    InputTextModule,
    FloatLabelModule,
    Select,
    FileUpload,
    NgIf,
    TextareaModule,
    Dialog,
    AddLocationComponent
  ],
  providers: [DatePipe],
  templateUrl: './add-special-order.component.html',
  styleUrl: './add-special-order.component.scss'
})
export class AddSpecialOrderComponent {
  @Input()SpecialOrderType=''
  @Output() value: any = new EventEmitter()
  private apiService = inject(ApiService);
  private router = inject(Router);
  private lang = inject(LanguageService);
  uploadedFiles: any[] = [];
  locations: any[] = []
  showAddLocationDialog:boolean=false
  currentLang = this.lang.translationService.currentLang;
  minDate:Date=new Date();
  form = new FormGroup({
    clientId: new FormControl(localStorage.getItem('userId')),
    specialOrderId: new FormControl(0),
    amount: new FormControl(0),
    locationId: new FormControl('',Validators.required),
    specialOrderDate: new FormControl<any>(null),
    notes: new FormControl(''),
    specialOrderEnum: new FormControl(0),
    specialOrderStatus: new FormControl(1),
    media: new FormControl<any[]>([])
  });

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.setMinDate()
    this.getLocation()

      const dateControl = this.form.get('specialOrderDate');

      if (this.SpecialOrderType=='2') {
        dateControl?.setValidators([Validators.required]);
      } else {
        dateControl?.clearValidators();
      }
      dateControl?.updateValueAndValidity();

  }

  setMinDate() {
    const today = new Date();
    today.setDate(today.getDate() + 1)
    this.minDate = today;
  }

  getLocation() {
    const userId = localStorage.getItem('userId')
    this.apiService.get('Location/GetByUserId/' + userId).subscribe((res: any) => {
      if (res.data) {
        this.locations = []
        res.data.map((item: any) => {
          this.locations.push({
            name: item.countryName,
            code: item.locationId,
          })
        })
      }
    })
  }


  addLocation(){
    this.showAddLocationDialog=true
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

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string); // Convert to Base64
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file); // Read the file as a Data URL
    });
  }
  onSubmit() {
    this.form.patchValue({
      media: this.uploadedFiles,
      specialOrderEnum:+this.SpecialOrderType
    })
   this.value.emit(this.form.value)
    //  this.addLocation();
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
