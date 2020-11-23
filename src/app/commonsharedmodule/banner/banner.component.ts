import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'common-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit {
  @Input() public currentComponent:string;
  @Input() public pageTitle:string;
  @Input() public backgroundImage:string;
  router: any;
  constructor( private _router: Router) { }

  ngOnInit(): void {
    console.log(this._router.url, this.currentComponent);
  }

}
