import { Component, inject, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { NgFor, NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [ NgFor, TranslatePipe , NgIf],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.scss',
})
export class ContractsComponent {
  private ApiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  selectedLang: any;
  languageService = inject(LanguageService);
  serviceId: any;
  contractList: any;

  @Output() contractSelected = new EventEmitter<any>(); // Event emitter

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.params['id'];
    this.getContractListBiServiceId(this.serviceId);
    this.selectedLang = this.languageService.translationService.currentLang;
    this.languageService.translationService.onLangChange.subscribe(() => {
      this.selectedLang = this.languageService.translationService.currentLang;
    });
  }

  getContractListBiServiceId(serviceId: string) {
    this.ApiService.get(`ContractType/GetByServiceId/${serviceId}`).subscribe((item: any) => {
      console.log(item.data);
      this.contractList = item.data;
    });
  }

  goNext(contractId: string) {
    this.contractSelected.emit(contractId); // Emit the event when a contract card is clicked
  }
}
