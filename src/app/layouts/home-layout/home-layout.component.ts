import { Component, inject, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { LanguageService } from '../../services/language.service';
import { ToasterService } from '../../services/toaster.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [RouterOutlet, Toast , NavbarComponent , FooterComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss'
})
export class HomeLayoutComponent {
  hasToken:boolean=false;
  showMenuIcon:boolean=false
  selectedLang: any;
  languageService = inject(LanguageService);
  toaster = inject(ToasterService);
  apiService=inject(ApiService)
  ngOnInit(): void {
    this.checkValidateToken()
    this.selectedLang = this.languageService.translationService.currentLang;
    this.languageService.translationService.onLangChange.subscribe(() => {
      this.checkValidateToken()
      this.selectedLang = this.languageService.translationService.currentLang;
    })
  }

  checkValidateToken(){
    this.apiService.post('Authentication/validateUserToken',{
     tokenToValidate:localStorage.getItem('token')
    }).subscribe((res:any) => {
     this.hasToken=res.data
    })
 }
  onClickMenuIcon(){
    this.showMenuIcon=!this.showMenuIcon
  }

  onClickOutSideCompleted(event:boolean){
   if(event)
     this.showMenuIcon=false
  }

}
