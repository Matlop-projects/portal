import { Component, inject } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { ContractsComponent } from '../contracts/contracts.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '@ngx-translate/core';
import { PackagesComponent } from '../packages/packages.component';
import { NgIf } from '@angular/common';
import { PackageDetailsComponent } from '../package-details/package-details.component';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [StepperModule, NgIf, ButtonModule, PackageDetailsComponent, ContractsComponent, PackagesComponent, TranslatePipe],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {


  private ApiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  selectedLang: any;
  languageService = inject(LanguageService);
  serviceId: any;
  contractId: any;
  currentStep: number = 1;
  packageId: any;

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.params['id'];
  }


  onNext(activateCallback: (step: number) => void, nextStep: number, id: string) {
    if (nextStep == 2) {
      this.contractId = id;
    } else if (nextStep == 3) {
      this.packageId = id
    }

    this.currentStep = nextStep;
    activateCallback(nextStep);
  }

  onBack(activateCallback: (step: number) => void, previousStep: number) {
    this.currentStep = previousStep;
    activateCallback(previousStep);
  }
}
