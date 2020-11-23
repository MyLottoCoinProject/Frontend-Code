import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import{MessageService} from './message.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'My Lotto Coin';

  subscription: Subscription;
  text:''
  

  constructor(private messageService:MessageService){


    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
         this.text=message.text
      } else {
        // clear messages when empty message received
       this.text=''
      }
    });

    (function () {
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      Date.prototype.getMonthName = function () {
        return months[this.getMonth()];
      };
      Date.prototype.getDayName = function () {
        return days[this.getDay()];
      };
      Date.prototype.nextDrawDate = function () {
        return `${this.getDayName().substring(0, 3)}, ${this.getMonthName().substring(0, 3)} ${this.getDate()}`
      }
      Date.prototype.lastDrawDate = function () {
        return `${this.getMonthName()} ${this.getDate()}, ${this.getFullYear()}`
      }

      Number.prototype.zero = function () {
        return (this < 10) ? 0 + this.toString() : this
      }
    })();

    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
