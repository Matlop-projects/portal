import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { ToasterService } from '../../services/toaster.service';
import { PrimeNG } from 'primeng/config';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule,NotificationsComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
@Input()hasToken:boolean=false
defaultImg="https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png"
profileImg=localStorage.getItem('userImg')
isMenuOpen = false;
  currentLang = 'en';
  selectedLang: string = localStorage.getItem('lang') || 'en';
  languageService = inject(LanguageService);
  toaster = inject(ToasterService);

  menuItems = [
    { path: '/home', label: 'menuItems.home' },
    { path: '/about', label: 'menuItems.aboutUs' },
    { path: '/contact', label: 'menuItems.contactUs' }
  ];

  constructor(@Inject(DOCUMENT) private document: Document, private primeng: PrimeNG, private translate: TranslateService) { }

  ngOnInit(): void {
    this.primeng.ripple.set(true);
    this.initAppTranslation();
    console.log('----this.profileImg---',this.profileImg)
  }

  public initAppTranslation() {
    this.languageService.changeAppDirection(this.selectedLang);
    this.languageService.changeHtmlLang(this.selectedLang);
    this.languageService.use(this.selectedLang);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleLanguage() {
    this.selectedLang = this.selectedLang === 'en' ? 'ar' : 'en';
    this.currentLang = this.selectedLang;
    this.languageService.change(this.selectedLang);

    this.document.body.dir = this.selectedLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', this.selectedLang);
    document.documentElement.setAttribute('dir', this.selectedLang === 'ar' ? 'rtl' : 'ltr');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
