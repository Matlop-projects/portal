import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToasterService } from './services/toaster.service';
import { PrimeNG } from 'primeng/config';
import { Toast } from 'primeng/toast';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule  , TranslateModule , Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService , ToasterService , PrimeNG,ConfirmationService]
})
export class AppComponent {
  title = 'matlop-portal';
}
