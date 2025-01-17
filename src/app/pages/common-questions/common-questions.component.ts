import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
@Component({
  selector: 'app-common-questions',
  standalone: true,
  imports: [NgFor,AccordionModule],
  templateUrl: './common-questions.component.html',
  styleUrl: './common-questions.component.scss'
})
export class CommonQuestionsComponent {
  activeIndex=-1
  items:any[]=[
    {
      question:'what happen when i cancel my order ?',
      answer:"The customer’s cancellation or postponement of the order means that the customer does not want the service, and the customer can cancel or postpone the order 24 hours before its due date via the application, or contact the customer service center."
    },
    {
      question:'what happen when i cancel my order ?',
      answer:"The customer’s cancellation or postponement of the order means that the customer does not want the service, and the customer can cancel or postpone the order 24 hours before its due date via the application, or contact the customer service center."
    },
    {
      question:'what happen when i cancel my order ?',
      answer:"The customer’s cancellation or postponement of the order means that the customer does not want the service, and the customer can cancel or postpone the order 24 hours before its due date via the application, or contact the customer service center."
    }
    , {
      question:'what happen when i cancel my order ?',
      answer:"The customer’s cancellation or postponement of the order means that the customer does not want the service, and the customer can cancel or postpone the order 24 hours before its due date via the application, or contact the customer service center."
    },
    {
      question:'what happen when i cancel my order ?',
      answer:"The customer’s cancellation or postponement of the order means that the customer does not want the service, and the customer can cancel or postpone the order 24 hours before its due date via the application, or contact the customer service center."
    },
    {
      question:'what happen when i cancel my order ?',
      answer:"The customer’s cancellation or postponement of the order means that the customer does not want the service, and the customer can cancel or postpone the order 24 hours before its due date via the application, or contact the customer service center."
    },
    {
      question:'what happen when i cancel my order ?',
      answer:"The customer’s cancellation or postponement of the order means that the customer does not want the service, and the customer can cancel or postpone the order 24 hours before its due date via the application, or contact the customer service center."
    }
    , {
      question:'what happen when i cancel my order ?',
      answer:"The customer’s cancellation or postponement of the order means that the customer does not want the service, and the customer can cancel or postpone the order 24 hours before its due date via the application, or contact the customer service center."
    }
  ]

  onOpen(i:any){
  console.log("CommonQuestionsComponent  onChange  i:", i)
 this.activeIndex=i
  }

  getActiveIndex(){
    return this.activeIndex
  }
}
