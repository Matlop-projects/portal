import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private router=inject(Router)
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  goTo(value:string){
    if(value=='contact')
      this.router.navigateByUrl(`${value}`)
    else
    this.router.navigate(['home']).then(()=>{
      this.router.navigateByUrl(`/sp/${value}`)
    })
     
  }

}
