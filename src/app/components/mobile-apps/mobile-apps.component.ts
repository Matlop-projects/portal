import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-mobile-apps',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './mobile-apps.component.html',
  styleUrl: './mobile-apps.component.scss'
})
export class MobileAppsComponent {

}
