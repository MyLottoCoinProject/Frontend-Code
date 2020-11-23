import { Component, OnInit } from '@angular/core';
import { PowerballApiService } from '../api/powerball-api.service';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { debug } from 'console';
import * as moment from 'moment';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {
  activeUrl: string = "Results";
  pageTitle: string = "Latest Lottery Results";
  backgroundImage: string = 'assets/images/02.jpg';

  winnerNumber1: string = "";
  winnerNumber2: string = "";
  winnerNumber3: string = "";
  winnerNumber4: string = "";
  winnerNumber5: string = "";
  winnerNumber6: string = "";

  nextDrawDays: any = "";
  nextDrawHours: any = "";
  nextDrawMinutes: any = "";
  nextDrawSeconds: any = "";
  nextDrawDate: string = "";
  JackpotPrice: string = "";
  winningAddress: any = [];
  WinningAmount: any = [];
  OurWinnerModel = new OurWinner();
  OurWinner: any = [];
  OurWinnerData: any = [];
  lastEndTime: string;

  constructor(public restApi: PowerballApiService) { }

  ngOnInit(): void {

    this.getWinningNumber();
    this.getNextJackpotDetails();
    this.getWinningAddress();
    //this.getWinningAmount();
    this.getSaleIdNow();
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
    let self=this;
    this.restApi.getNextJackpotDetails().subscribe((sucess) => {
      var JackpotDetail = sucess["data"][0];
      if (JackpotDetail != undefined && JackpotDetail != null) {

        var LastEndTime = sucess["data"][0]["LastEndTime"];
        var NextJackpotTime = sucess["data"][0]["NextJackpotTime"];
        //this.nextDrawDate = (new Date(LastEndTime * 1000).getUTCDate() - new Date().getUTCDate()).toString();



     var countDownDate = moment(NextJackpotTime * 1000);
    let timedifference= countDownDate.diff(moment()) 
     if (timedifference>0){
      var x = setInterval(function() {
        let diff = countDownDate.diff(moment());
        if (diff <= 0) {
           // If the count down is finished, write some text 
           if(diff==0){
            self.getWinningNumber();
            self.getNextJackpotDetails();
           }
           else{
           self.nextDrawDate ="Next date will come soon."
           }
           clearInterval(x);
        } else{
        let duration =moment.duration(diff,'milliseconds');
        let diffutc= moment.utc(duration.asMilliseconds()).format("HH:mm:ss.SSS");
        self.nextDrawDate=  (duration.days()*24+duration.hours()).zero() + ":" + duration.minutes().zero() + ":" + duration.seconds().zero()
        }
      }, 1000);
    }
    else{
      self.nextDrawDate ="Next date will come soon."
    }

    this.lastEndTime = new Date(LastEndTime * 1000).lastDrawDate();
        // let date_future: any = new Date(NextJackpotTime * 1000);
        // let date_now: any = new Date();

        // let seconds = Math.floor((date_future - (date_now)) / 1000);
        // let minutes = Math.floor(seconds / 60);
        // let hours = Math.floor(minutes / 60);
        // let days = Math.floor(hours / 24);

        // hours = hours - (days * 24);
        // minutes = minutes - (days * 24 * 60) - (hours * 60);
        // seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

        // this.nextDrawDays = days;
        // this.nextDrawHours = hours;
        // this.nextDrawMinutes = minutes;
        // this.nextDrawSeconds = seconds;
        // if (date_future > date_now) {
        //   if (this.nextDrawDays >= 0 && this.nextDrawHours >= 0 && this.nextDrawMinutes > 0) {
        //     this.nextDrawDate = this.nextDrawDays + " " + "Days" + " " + " " + this.nextDrawHours + " " + " " + "Hours" + " " + this.nextDrawMinutes + " " + "Minutes left";
        //   }
        //   else {
        //     //if (this.nextDrawDays == 0 && this.nextDrawHours == 0 && this.nextDrawMinutes == 0) {
        //     const source = interval(1000);
        //     const subscribe = source.subscribe(x => {
        //       let date_future: any = new Date(NextJackpotTime * 1000);
        //         let date_now: any = new Date();
        //         if (date_future > date_now) {
        //           let seconds = Math.floor((date_future - (date_now)) / 1000);
        //           seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
        //           this.nextDrawDate = "Only" + " " + seconds + " " + "Seconds left";
        //           if (seconds == 0) {
        //             this.getWinningNumber();
        //             this.getNextJackpotDetails();
        //             //this.nextDrawDate = "Next date will come soon.";
        //           }
        //         }
        //     });
        //     setTimeout(() => subscribe.unsubscribe(), 61000);
        //       //this.nextDrawDate = "Only" + " " + this.nextDrawSeconds + " " + "Seconds";
        //     //}
        //   }
        // }
        // else {
        //   this.nextDrawDate = "Next date will come soon.";
        // }
        this.JackpotPrice = sucess["data"][0]["JackpotPrice"];
      }

      console.log(sucess);
    }, (error) => {
      console.log(error);

    });
  }
  getSaleIdNow() {
    this.restApi.getSaleIdNow().subscribe((sucess) => {
      let saleID = sucess["Id"];
      console.log(sucess);
    }, (error) => {
      console.log(error);
    });
  }

  getWinningAddress() {
    this.restApi.getWinningAddress().subscribe((sucess) => {
      this.winningAddress = sucess["address"];
      var ourWinenr = [];
      for (var i = 0; i < this.winningAddress.length; i++) {
        this.OurWinnerModel = new OurWinner();
        this.OurWinnerModel.Address = this.winningAddress[i];
        this.OurWinnerModel.Amount = "";
        this.OurWinner.push(this.OurWinnerModel);
      }
      this.getWinningAmount();
      console.log(sucess);
    }, (error) => {
      console.log(error);
    });
  }

  getWinningAmount() {
    this.restApi.getWinningAmount().subscribe((sucess) => {
      this.WinningAmount = sucess["amount"];
      for (var i = 0; i < this.WinningAmount.length; i++) {
        this.OurWinner[i].Amount = "ETH " + " " + (this.WinningAmount[i]/1000000000000000000).toFixed(18);
      }
      this.OurWinnerData = this.OurWinner;
      console.log(sucess);
    }, (error) => {
      console.log(error);
    });
  }


}

class OurWinner{
  Address: string;
  Amount: string;
}
