import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { LanguageService } from '../../services/language.service';
import { NgFor } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [NgFor, TranslatePipe],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss'
})
export class ServicesSectionComponent {


  api = inject(ApiService);
  services: any;
  private imageUrl = environment.baseImageUrl;
  selectedLang: any;
  languageService = inject(LanguageService);
  private router = inject(Router)


  ngOnInit(): void {
    this.getAllServices();
    this.languageService.translationService.onLangChange.subscribe(() => {
      this.selectedLang = this.languageService.translationService.currentLang;
      // this.setImageLanguage();
    })
  }

  getAllServices() {
    this.api.get('Service/GetAll').subscribe((img: any) => {
      console.log(img);
      this.services = img.data;
      this.setImageLanguage();
    })
  }

  setImageLanguage() {
    if (this.services) {
      this.services.forEach((img: any) => {
        img.image = this.imageUrl + img.image;
      });
    }
  }

  goReservation(id: string) {
    this.router.navigate(['reservation' , id])
  }

}
