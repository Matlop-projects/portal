import { Component } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { MobileAppsComponent } from '../../components/mobile-apps/mobile-apps.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent , MobileAppsComponent , ServicesSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
