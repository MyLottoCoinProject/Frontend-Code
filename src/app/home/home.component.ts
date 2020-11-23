import { Component, OnInit } from '@angular/core';
import { PowerballApiService } from '../api/powerball-api.service';
import { interval } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  backgroundImage: string = 'assets/images/banner-net.png';

  winnerNumber1: string = "";
  winnerNumber2: string = "";
  winnerNumber3: string = "";
  winnerNumber4: string = "";
  winnerNumber5: string = "";
  winnerNumber6: string = "";

  lastEndTime: string = "";
  nextDrawDate: string = "";

  JackpotPrice: string = "";
  field_draw_date: string = "";
  price: string = "";
  timeToDraw: string = "";

  constructor(public restApi: PowerballApiService) {

    
  }

  ngOnInit(): void {
    /** Home page banner */
    setInterval(function () {
      let homeBanner = document.querySelector(".banner-elements-part");
      if (homeBanner != undefined && homeBanner != null) {
        homeBanner.setAttribute('class', 'banner-elements-part has_bg_image active');
      }
    }, 1000);
    /** End */
    this.getWinningNumber();
    this.getNextJackpotDetails();
    this.getPrice();
  }


  getWinningNumber() {
    this.restApi.getWinningNumber().subscribe((sucess) => {
      let winnerNumbers = sucess["number"];
      if (winnerNumbers != undefined && winnerNumbers != null) {
        this.winnerNumber1 = winnerNumbers[0];
        this.winnerNumber2 = winnerNumbers[1];
        this.winnerNumber3 = winnerNumbers[2];
        this.winnerNumber4 = winnerNumbers[3];
        this.winnerNumber5 = winnerNumbers[4];
      }
      let powerballNumber = sucess["powerballNumber"];
      this.winnerNumber6 = powerballNumber;


      console.log(sucess);
    }, (error) => {
      console.log(error);

    });
  }

  getNextJackpotDetails() {
    let self = this;
    this.restApi.getNextJackpotDetails().subscribe((sucess) => {
      debugger;
      var JackpotDetail = sucess["data"][0];
      if (JackpotDetail != undefined && JackpotDetail != null) {

        var LastEndTime = sucess["data"][0]["LastEndTime"];
        var NextJackpotTime = sucess["data"][0]["NextJackpotTime"];

        const source = interval(1000);
        const subscribe = source.subscribe(x => {

          let date_future: any = new Date(NextJackpotTime * 1000);
          let date_now: any = new Date();

          if (date_future > date_now) {
            let seconds = Math.floor((date_future - (date_now)) / 1000);
            let minutes = Math.floor(seconds / 60);
            let hours = Math.floor(minutes / 60);
            let days = Math.floor(hours / 24);

            let hour = hours;
            hours = hours - (days * 24);
            minutes = minutes - (days * 24 * 60) - (hours * 60);
            seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

            this.timeToDraw = hour.zero() + " : " + minutes.zero() + " : " + seconds.zero();

          }
          else {
            this.timeToDraw = "Results pending"
          }
        });

        this.lastEndTime = new Date(LastEndTime * 1000).lastDrawDate();

        const date = new Date(NextJackpotTime * 1000);
        this.nextDrawDate = date.nextDrawDate();
        this.JackpotPrice = sucess["data"][0]["JackpotPrice"];
      }

      console.log(sucess);
    }, (error) => {
      console.log(error);

    });
  }

  getPrice() {
    this.restApi.getPrice().subscribe(data => {
      this.price = data['price'];
    });
  }


}
