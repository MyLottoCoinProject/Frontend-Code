import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html'
})
export class FaqComponent implements OnInit {
  pageTitle:string = "FAQ";
  activeUrl:string = "faq";
  backgroundImage:string = "assets/images/01.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
