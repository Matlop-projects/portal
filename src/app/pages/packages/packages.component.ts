import { Component, inject, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { NgFor, NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [TranslatePipe, NgFor , NgIf],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent {

  private ApiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  selectedLang: any;
  languageService = inject(LanguageService);
  @Input() contractId: any;
  packageList: any;
  packageId: any;
  serviceId: any;

  @Output() contractSelected = new EventEmitter<any>(); // Event emitter

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.params['id'];
    this.getPackagesListBiContractId(this.contractId,this.serviceId);
    this.selectedLang = this.languageService.translationService.currentLang;
    this.languageService.translationService.onLangChange.subscribe(() => {
      this.selectedLang = this.languageService.translationService.currentLang;
    });
  }

  getPackagesListBiContractId(contractId: string , serviceId: any) {
    this.ApiService.get(`Package/GetPackageByContractIdAndServiceId/${contractId}/${serviceId}`).subscribe((item: any) => {
      console.log(item.data);
      this.packageList = item.data;
    });
  }

  goNext(packageId:any) {
    this.contractSelected.emit(packageId); // Emit the event when a contract card is clicked
  }
}

