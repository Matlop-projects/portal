import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-how-does-work',
  standalone: true,
  imports: [NgFor,TranslatePipe],
  templateUrl: './how-does-work.component.html',
  styleUrl: './how-does-work.component.scss'
})
export class HowDoesWorkComponent {
   data:any[]=[
    {
       title:'how_does.q1',
       desc:'how_does.answ1'
    },
    {
      title:'how_does.q2',
      desc:'how_does.answ2'
   },
   {
    title:'how_does.q3',
    desc:'how_does.answ3'
 },
 {
  title:'how_does.q4',
  desc:'how_does.answ4'
},
{
  title:'how_does.q5',
  desc:'how_does.answ5'
},
{
title:'how_does.q6',
desc:'how_does.answ6'
},
{
title:'how_does.q7',
desc:'how_does.answ7'
}
   ]
}
