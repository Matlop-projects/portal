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
       title:' Sign Up and Create an Account: ',
       desc:'  Start your journey with Matlop by downloading the app and easily creating your personal account.'
    },
    {
      title:' Choose the Desired Service: ',
      desc:' Select from a wide range of services, including cleaning, hospitality, maintenance, and more, tailored to meet the needs of your company or home.'
   },
   {
    title:' Specify the Details: ',
    desc:'  Set the execution date, location, and duration (hours or contract period) to ensure a fully customized service.'
 },
 {
  title:'Pick the Right Package: ',
  desc:' Browse through our various packages and choose the one that fits your budget and requirements, whether you need hourly services or long-term contracts.'
},
{
  title:' Secure Payment: ',
  desc:'  Enjoy safe and easy electronic payment options, with the flexibility to pay upfront or upon service completion.'
},
{
title:' Professional Execution:',
desc:'  Our professional team arrives on time to deliver the service with the quality and professionalism that matches your expectations.'
},
{
title:' Feedback and Support:',
desc:' After the service is completed, you can rate your experience and provide any feedback to help us improve. Our support team is always here to assist you!'
}
   ]
}
