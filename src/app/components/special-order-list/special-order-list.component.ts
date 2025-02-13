import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { NgClass, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-special-order-list',
  standalone: true,
  imports: [NgFor , TranslatePipe],
  templateUrl: './special-order-list.component.html',
  styleUrl: './special-order-list.component.scss'
})
export class SpecialOrderListComponent {

  languageService = inject(LanguageService);
  private router = inject(Router);
  selectedLang: any;
  specialOrderList = [
    {orderType: 1 , img:'assets/images/emergency.png' , nameAr: 'طارئ' , nameEn: 'Emergency'},
    {orderType: 2 , img:'assets/images/special.png' , nameAr: 'خاص' , nameEn: 'Special'}
  ]


  ngOnInit(): void {
    this.languageService.translationService.onLangChange.subscribe(() => {
      this.selectedLang = this.languageService.translationService.currentLang;
    })
  }

  goReservation(id: number) {
    this.router.navigate(['special_order_details' , id])
  }

}
