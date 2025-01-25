import { Component,inject, OnInit} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { FormsModule, NgModel } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [TranslatePipe,FormsModule,NgIf],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent  {

  private translate=inject(LanguageService)
  private apiService=inject(ApiService)
  title='contact_us.title'
  obj:any={
    contactUsId: 0,
    name: "",
    email: "",
    mobile: "",
    message: ""
  }
  isValid(){
      return Object.values(this.obj).every(value => {
        return value !== null && value !== undefined && value !== "";
      });
  }

   validateSaudiPhoneNumber() {
    const saudiPhoneRegex = /^05[0-9]{8}$/;
    const result =saudiPhoneRegex.test(this.obj.mobile);
    console.log("ContactUsComponent  validateSaudiPhoneNumber  this.obj.mobile:", typeof(this.obj.mobile))
    console.log("ContactUsComponent  validateSaudiPhoneNumber  result:", result)
    return result;
  }

 openWhatsApp(){
  const phoneNumber = '+966510021622'; 
    const message ='';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
 
 }

 onSubmit(){
     this.apiService.post('contactUs/Create',this.obj).subscribe()
 }

}
