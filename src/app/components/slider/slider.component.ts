import { Component, inject } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ApiService } from '../../services/api.service';
import { LanguageService } from '../../services/language.service';
import { environment } from '../../../environments/environment';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CarouselModule , NgIf , NgFor],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})

export class SliderComponent {

  api = inject(ApiService);
  images: any;
  private imageUrl = environment.baseImageUrl

  selectedLang: any;
  languageService = inject(LanguageService);

  owlOptions = {
    items: 1,         // Number of items to display
    loop: true,      // Loop through the carousel
    margin: 10,       // Margin between items
    nav: false,       // Show next/previous buttons
    dots: true,       // Show dots
    rtl: true,
    autoplay: true,  // Enable auto play (optional)
    autoplayTimeout: 3000, // Auto play interval in ms (optional)
    autoplayHoverPause: true, // Pause on hover (optional)
    responsive: {
      0: {
        items: 1,   // 1 item on screens smaller than 480px
        dots: true   // Show dots on smaller screens
      },
      480: {
        items: 1,   // 1 item for screen widths 480px and above
        dots: true
      },
      768: {
        items: 1,   // 1 item for screen widths 768px and above
        dots: true
      },
      1024: {
        items: 1,   // 1 item for screen widths 1024px and above
        dots: true
      }
    }
  };

  ngOnInit(): void {
    this.getSliderImages();
    this.languageService.translationService.onLangChange.subscribe(() => {
      this.selectedLang = this.languageService.translationService.currentLang;
     this. setImageLanguage();
    })
  }

  setImageLanguage() {
    if (this.images) {
      this.images.forEach((img: any) => {
        img.image = this.selectedLang === 'ar' ? this.imageUrl + img.imageAr : this.imageUrl + img.imageEn;
      });
    }
  }

  getSliderImages() {
    this.api.get('Slider/GetAll').subscribe((img: any) => {
      console.log(img);
      this.images = img.data;
      this.setImageLanguage();
    })
  }

}

