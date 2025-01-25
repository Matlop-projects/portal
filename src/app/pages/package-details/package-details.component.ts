import { Component, inject, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '@ngx-translate/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-package-details',
  standalone: true,
  imports: [TranslatePipe , NgIf],
  templateUrl: './package-details.component.html',
  styleUrl: './package-details.component.scss'
})
export class PackageDetailsComponent {

  private ApiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  selectedLang: any;
  languageService = inject(LanguageService);
  @Input() packageId: any;
  packageDetails: any

  ngOnInit(): void {
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
    });
  }

}
