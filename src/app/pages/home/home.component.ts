import { Component } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { MobileAppsComponent } from '../../components/mobile-apps/mobile-apps.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { HowDoesWorkComponent } from '../how-does-work/how-does-work.component';
import { CommonQuestionsComponent } from '../common-questions/common-questions.component';
import { SpecialOrderListComponent } from "../../components/special-order-list/special-order-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, MobileAppsComponent, ServicesSectionComponent, HowDoesWorkComponent, CommonQuestionsComponent, SpecialOrderListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
