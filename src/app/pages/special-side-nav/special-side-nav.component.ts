import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-special-side-nav',
  standalone: true,
  imports: [RouterOutlet,NgFor,RouterLink,TranslatePipe,CommonModule, RouterModule,],
  templateUrl: './special-side-nav.component.html',
  styleUrl: './special-side-nav.component.scss'
})
export class SpecialSideNavComponent implements OnInit ,OnChanges{
  private router =inject(Router)
  title=''
  menu:any[]=[
    {
      name:'privacy_policy.title',
      route:'privacy',
      icon:'',
    },
    {
      name:'terms_policy.title',
      route:'terms',
      icon:''
    },
    {
      name:'about_us.title',
      route:'about',
      icon:''
    },
    {
      name:'common_questions.title',
      route:'common',
      icon:''
    }
  ]

  ngOnInit() {
  this.defaultTitle()
  }
  ngOnChanges() {
    this.defaultTitle()
 
    this.router.events.subscribe(res => {
      console.log("SpecialSideNavComponent  defaultTitle  this.router.url: --", res)
    
    })
  }
  onRouteChange(item:any){
    this.title=item.name
  }

  defaultTitle(){
    console.log("SpecialSideNavComponent  defaultTitle  this.router.url:", this.router.url)

    if(this.router.url.includes('about'))
      this.title="about_us.title"
    else if (this.router.url.includes('privacy'))
      this.title="privacy_policy.title"
    else if (this.router.url.includes('terms'))
      this.title="terms_policy.title"
    else
    this.title="common_questions.title"
  }
}
