import { Component, inject, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { NgFor, NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [TranslatePipe, NgFor, NgIf, SelectModule, FormsModule],
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
  cities: any[] = [];

  @Output() contractSelected = new EventEmitter<any>(); // Event emitter

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.params['id'];
    this.getAllCites();
    this.getPackagesListBiContractId(this.contractId, this.serviceId);
    this.selectedLang = this.languageService.translationService.currentLang;
    this.languageService.translationService.onLangChange.subscribe(() => {
      this.selectedLang = this.languageService.translationService.currentLang;
    });
  }

  getPackagesListBiContractId(contractId: string, serviceId: any) {
    this.ApiService.get(`Package/GetPackageByContractIdAndServiceId/${contractId}/${serviceId}`).subscribe((item: any) => {
      console.log(item.data);
      this.packageList = item.data;
      localStorage.setItem('contractDetails', JSON.stringify(this.packageList));

    });
  }

  goNext(packageId: any) {
    this.contractSelected.emit(packageId); // Emit the event when a contract card is clicked
  }

  getAllCites() {
    this.ApiService.get('City/GetAll').subscribe((res: any) => {
      console.log(res);

      const citiesFromApi = res.data.map((data: any) => ({
        ...data,
        fullName: `${data.enName} - ${data.arName}`
      }));

      this.cities = [
        {
          cityId: 0,
          enName: "All",
          arName: "الكل",
          fullName: "All - الكل"
        },
        ...citiesFromApi
      ];

      console.log(this.cities);
    });
  }


  onPackagesDropdownSearch(data: any) {
    if(data.value.cityId) {
      this.ApiService.get(`Package/GetPackageByCityId/${data.value.cityId}/${this.contractId}`).subscribe((res: any) => {
        console.log(res);
        this.packageList = res.data;
        localStorage.setItem('contractDetails', JSON.stringify(this.packageList));
      })
    } else {
      this.getPackagesListBiContractId(this.contractId, this.serviceId);
    }

  }
}

