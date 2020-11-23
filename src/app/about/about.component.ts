import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  backgroundImageSection:string = "assets/images/03.jpg";
  pageTitle:string = "About Us";
  activeUrl:string = "About";
  backgroundImage:string = "assets/images/01.jpg";

  constructor() { }

  ngOnInit(): void {
  }

}
