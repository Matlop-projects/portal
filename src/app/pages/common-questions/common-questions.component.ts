import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AccordionModule } from 'primeng/accordion';
import { LanguageService } from '../../services/language.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-common-questions',
  standalone: true,
  imports: [NgFor,AccordionModule,TranslatePipe,NgIf],
  templateUrl: './common-questions.component.html',
  styleUrl: './common-questions.component.scss'
})
export class CommonQuestionsComponent implements OnInit {

  private apiService=inject(ApiService)
  private router=inject(Router)
  currentRouter =this.router.url
  activeIndex=-1
  items:any[]=[]
  selectedLang: any;
  languageService = inject(LanguageService); 
  ngOnInit() {
    this.getAllFAQS()
    this.currentRouter =this.router.url
    this.languageService.translationService.onLangChange.subscribe(() => {
        this.selectedLang = this.languageService.translationService.currentLang;
        this.getAllFAQS()
      }); 
  }
  onOpen(i:any){
 this.activeIndex=i
  }

  getActiveIndex(){
    return this.activeIndex
  }

  getAllFAQS(){
       this.apiService.get('FAQs/GetAll').subscribe((res:any)=>{
         if(res.data){ 
          this.items=[]
          res.data.map((item:any)=>{
             this.items.push({
              question:this.selectedLang=='en'?item.enTitle:item.arTitle,
              answer:this.selectedLang=='en'?item.enDescription:item.arDescription
             })
          })
         }
          
       })
  }
}
