import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_alert';
import { PowerballApiService } from '../api/powerball-api.service';
import { PowerballMetamaskService } from '../services/powerball-metamask.service';
import { NgxUiLoaderService, } from 'ngx-ui-loader';
import { type } from 'os';
import Web3 from "web3";
import { parse } from 'path';
import { interval } from 'rxjs';
import { CommentStmt } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import{MessageService} from '../message.service'

declare let require: any;
declare let window: any;

let tokenAbi = require("../../assets/tokenContract.json");

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html'
})

export class TicketComponent implements OnInit {
  activeUrl: string = "Buy Ticket";
  pageTitle: string = "PowerBall";
  backgroundImage: string = "assets/images/02.jpg";
  selectedNumberCollect = [];
  selecedNumCloneShowBottom = {};
  SingleselectedNumShowBottom = {}
  NumberClonerCollecter = {};
  RandomNumber = {};
  SingleRandomNumber = {};
  SingleselectedNumberCollect = {};
  SelectCloneCard = [];
  UniqueSelectedNM = [];
  UniqueSingleSelectedNM = [];
  ETH_amount_value: any;
  SelectedNumberHTML: any;
  ETH_Selected: any;
  ETH_Value = 0.00;
  ETH_btn_Show: number;
  ETH_Button_ShowVAl: any = '';
  ETH_Total_Value = [];
  number_list_picker: any;
  TopicNames = [1];
  ETH_numberClcik = {
    UserClickNumberStatus: '',
    UserClickNumberValue: {},
  }

  _web3: any;
  _myAddress: string = sessionStorage.getItem("account");
  // _tokenContractAddress: string = "0x5E2677398b10f0927E649d4fC397DC6b72857833";
  _account: string = null;
  balance: any;
  accountDetails: any;
  currentGasPrice;
  combinedArray1: any = [];
  combinedArray2: any = [];
  combinedArray: any = [];
  price;

  nextDrawDays: any = "";
  nextDrawHours: any = "";
  nextDrawMinutes: any = "";
  nextDrawSeconds: any = "";
  nextDrawDate: string = "";
  JackpotPrice: string = "";


  transactionHashAfterTrans: String = '';

  constructor(private ngxLoader: NgxUiLoaderService, private toastr: ToastrService, public alertService: AlertService, public restApi: PowerballApiService, public pbMetamask: PowerballMetamaskService,private message:MessageService) {
    if (sessionStorage.getItem("account")) {
      if (typeof window.web3 !== "undefined") {
        // Use Mist/MetaMask's provider
        this._web3 = new Web3(window.web3.currentProvider);
        if (this._web3.version.network !== "4") {
        }
      } else {
        console.warn(
          "Please use a dapp browser like mist or MetaMask plugin for chrome"
        );
      }
    }
  }

  async ngOnInit() {
    //localStorage.setItem('TotalBlock', '1');
    this.ClearNumberStorage();
    // const checkitem = parseInt(localStorage.getItem('TotalBlock'));
    // console.log(typeof(checkitem));
    //this.getWinningNumber();
    localStorage.removeItem('PickNumber');
    this.ETH_amount_value = document.getElementById('ETH_amount_pick_number_value');
    this.SelectedNumberHTML = document.getElementById('total-selected-number');
    this.ETH_Selected = document.getElementById('ETH_seleced');
    this.number_list_picker = document.getElementById('number-list-picker');
    this.getWinningNumber();
    this.getNextJackpotDetails();

    this.restApi.getPrice().subscribe(data => {
      this.price = data['price'];
      this.TotalCountETH();
    });
    // Meta Mask
    if (sessionStorage.getItem("account")) {

      // To get balance out of Meta Mask (ETH balance)
      this._web3.eth.getBalance(this._myAddress).then((res) => {
        this.balance = res;
        this.balance = parseInt(this.balance) / 1000000000000000000;
        console.log("Balance is =>", this.balance.toFixed(2));
      });
      debugger;
      //this.accountDetails = await this.getAccount();
      this.accountDetails = window.web3.eth.accounts[0];
      debugger;
      console.log(this.accountDetails);
    }

  }



  // Get Account Meta Mask
  private async getAccount(): Promise<string> {
    if (this._account == null) {
      this._account = (await new Promise((resolve, reject) => {
        new this._web3.eth.getAccounts((err, accs) => {
          if (err != null) {
            this.toastr.error("There was an error fetching your accounts.");
            //alert("There was an error fetching your accounts.");
            return;
          }

          if (accs.length === 0) {
            this.toastr.error("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
            //alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
            return;
          }
          resolve(accs[0]);
        });
      })) as string;

      this._web3.eth.defaultAccount = this._account;
    }

    return Promise.resolve(this._account);
  }


  sendTransactionToMetaMask() {
    this.message.sendMessage('Please don\'t refresh, transaction is processing.');
    this.ngxLoader.start();

    let contractInstance = new this._web3.eth.Contract(tokenAbi);

    // OLD address
    // contractInstance._address = '0x2a733eDb37503E62391e3c01a3511BD18fF109Cb';

    // NEW address

    this.restApi.getContractAddress().subscribe(async (success) => {
      contractInstance._address = success["ContractAddress"];

      //contractInstance._address = '0x5E2677398b10f0927E649d4fC397DC6b72857833';

      console.log("Methods", contractInstance.methods);

      // To get current gasPrice
      this._web3.eth.getGasPrice().then(gasPriceMetaMask => this.currentGasPrice = gasPriceMetaMask);

      this.combinedArray1 = [];
      this.combinedArray2 = [];
      this.combinedArray = [];
      // debugger;
      this.ngxLoader.start();
      for (let i = 1; i <= this.TopicNames.length; i++) {
        let ele = this.SingleselectedNumShowBottom['singlenumber-lp-' + i];
        this.combinedArray1.push(...ele);
      }
      var selecedNumCloneShowBottomData = this.selecedNumCloneShowBottom;
      for (let i = 1; i <= this.TopicNames.length; i++) {
        let value = this.SingleselectedNumShowBottom['singlenumber-lp-' + i][0];
        ////this.selecedNumCloneShowBottom['number-lp-' + i].push(value);
        //let ele = this.selecedNumCloneShowBottom['number-lp-' + i];

        selecedNumCloneShowBottomData['number-lp-' + i].push(value);
        let ele = selecedNumCloneShowBottomData['number-lp-' + i];
        this.combinedArray2.push(...ele);
      }

      //this.combinedArray = [...this.combinedArray2, ...this.combinedArray1];
      this.combinedArray = [...this.combinedArray2];

      function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
      }

      for (let i = 0; i < this.combinedArray.length; i++) {
        this.combinedArray[i] = (this.combinedArray[i] < 10) ? '0' + this.combinedArray[i].toString() : this.combinedArray[i].toString();
      }

      const copycombinedArray = [...this.combinedArray]
      const topicLength = this.TopicNames.length;

      console.log("Combined Array", this.combinedArray);
      this.ngxLoader.start();
      this.restApi.getPrice().subscribe(async data => {
        this.ngxLoader.start();
        this.price = data['price'];
        console.log("Price from API", this.price);

        // let multiplier = (this.combinedArray.length/6) * parseFloat(this.price);

        // console.log(multiplier);

        // console.log(multiplier * 1000000000000000000);
        // this.ngxLoader.start();

        // console.log("calc", ((this.combinedArray.length/6) * parseInt(this.price))
        // console.log("Price from eth", this.currentGasPric
        this.restApi.getGasPrice({ "numberOfTicket": topicLength }).subscribe((res: any) => {

          contractInstance.methods.purchaseTicket(copycombinedArray).send({
            from: this._myAddress,
            gasPrice: res.gasPrice.toString(),
            gas: res.gasFees.toString(),
            value: (copycombinedArray.length / 6) * parseFloat(this.price) * 1000000000000000000
          }).then(async res => {
            this.restApi.getNextJackpotDetails().subscribe((sucess) => {
              debugger;
              this.JackpotPrice = sucess["data"][0]["JackpotPrice"];
            });
            this.removeAllAfterBuyTicket();
            this.ngxLoader.stop();
            this.message.sendMessage('');
            let button = document.getElementById("trbutton");
            button.click();
            //this.removeAllAfterBuyTicket();
            this.transactionHashAfterTrans = res.transactionHash;
            let saleId = await contractInstance.methods.getSaleIdNow().call();
            let status = await this._web3.eth.getTransactionReceipt(this.transactionHashAfterTrans)
            const data = {
              "Serial": "0",
              "TransactionHash": this.transactionHashAfterTrans,
              "FromAccount": this._myAddress,
              "AmountETH": this.ETH_Button_ShowVAl.toString(),
              "TicketNumber": JSON.stringify(copycombinedArray),
              "TransactionStatus": status.status,
              "Time": new Date().toString(),
              "SaleId": saleId,
              "Status": res.status,
              "TotalTickets": topicLength
            }
            this.restApi.saveTransactionDetails(data).subscribe((res) => {
              console.log(res);

              this.combinedArray = [];
              this.combinedArray1 = [];
              this.combinedArray2 = [];

            }, (err) => {
              console.log(err);

            });
            console.log("Result From Purchase =>", res)
          }).catch(error => {
            this.ngxLoader.stop();
            this.message.sendMessage('');
            console.log(error.transactionHash);

            for (let i = 1; i <= this.TopicNames.length; i++) {
              if (this.selecedNumCloneShowBottom['number-lp-' + i] != undefined) {
                if (this.selecedNumCloneShowBottom['number-lp-' + i].length > 5) {
                  this.selecedNumCloneShowBottom['number-lp-' + i].pop(this.SingleselectedNumShowBottom['singlenumber-lp-' + i]);
                }
              }
            }
            //location.reload();
          });
        }, err => {
          console.log(err);
        });
        // console.log("REsult", (this.combinedArray.length/6) * parseInt(this.price) * 100000000000000000 );



        //this.restApi.getNextJackpotDetails().subscribe((sucess) => {
        //  this.JackpotPrice = sucess["data"][0]["JackpotPrice"];
        //});

      });

    });

    // contractInstance.methods.purchaseTicket(this.combinedArray).send({
    //   from: this._tokenContractAddress,
    //   gasPrice: '2',
    //   gas: 60000,
    //   value: this.combinedArray.length * this.price
    // }).then(res => console.log("Result From Purchase =>", res));

  }


  getWinningNumber() {
    this.restApi.getEstimateJackpotDetail().subscribe((sucess) => {
      console.log(sucess);
    }, (error) => {
      console.log(error);
    });
  }
  getNextJackpotDetails() {
    let self = this;
    this.restApi.getNextJackpotDetails().subscribe((sucess) => {
      var JackpotDetail = sucess["data"][0];
      if (JackpotDetail != undefined && JackpotDetail != null) {

        var NextJackpotTime = sucess["data"][0]["NextJackpotTime"];
        //this.nextDrawDate = (new Date(LastEndTime * 1000).getUTCDate() - new Date().getUTCDate()).toString();

        var countDownDate = moment(NextJackpotTime * 1000);
        let timedifference = countDownDate.diff(moment())
        if (timedifference > 0) {
          var x = setInterval(function () {
            let diff = countDownDate.diff(moment());
            if (diff <= 0) {
              // If the count down is finished, write some text
              if (diff == 0) {
                self.getWinningNumber();
                self.getNextJackpotDetails();
              }
              else {
                self.nextDrawDate = "Next date will come soon."
              }
              clearInterval(x);
            } else {
              let duration = moment.duration(diff, 'milliseconds');
              let diffutc = moment.utc(duration.asMilliseconds()).format("HH:mm:ss.SSS");
              self.nextDrawDate = (duration.days() * 24 + duration.hours()).zero() + ":" + duration.minutes().zero() + ":" + duration.seconds().zero()
            }
          }, 1000);
        }
        else {
          self.nextDrawDate = "Next date will come soon."
        }

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
        //     //output: 0,1,2,3,4,5....
        //     //const subscribe = source.subscribe(val => console.log(val));
        //     //setTimeout(() => subscribe.unsubscribe(), 5000);

        //     const subscribe = source.subscribe(x => {
        //       let date_future: any = new Date(NextJackpotTime * 1000);
        //       let date_now: any = new Date();
        //       if (date_future > date_now) {
        //         let seconds = Math.floor((date_future - (date_now)) / 1000);
        //         seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
        //         this.nextDrawDate = "Only" + " " + seconds + " " + "Seconds left";
        //         if (seconds == 0) {
        //           this.getWinningNumber();
        //           this.getNextJackpotDetails();
        //           //this.nextDrawDate = "Next date will come soon.";
        //         }
        //       }
        //     });
        //     setTimeout(() => subscribe.unsubscribe(), 61000);
        //     //this.nextDrawDate = "Only" + " " + this.nextDrawSeconds + " " + "Seconds";
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

  randomNumberNotExist(value, id) {

    const totalBlock = this.TopicNames;

    for (let i = 1; i <= totalBlock.length; i++) {
      const cmid = 'random_' + i;
      const index = this.RandomNumber[cmid].indexOf(value);
      if (index != undefined) {
        if (index > -1) {
          //console.log('found '+value);
          return 'found';
          //console.log(this.RandomNumber[cmid]);
        }
        else {
          return 'not';
          // console.log('not found');
          // console.log(this.RandomNumber[cmid]);
        }
      }
    }
  }
  randomNumadd(value, id, partID) {

    const checkstatus = this.randomNumberNotExist(value, id);
    if (checkstatus == 'not') {
      this.RandomNumber[id].push(value);
      this.UniqueSelectedNM.push(value);
      this.selecedNumCloneShowBottom[partID].push(value);
    }
  }

  async singleRandomNumberPick(event, singleID) {
    debugger;
    const totalBlock = this.TopicNames;
    this.UniqueSingleSelectedNM = [];
    //for (let i = 1; i <= totalBlock.length; i++) {
    const id = 'random_' + singleID;
    const partID = 'number-lp-' + singleID;
    const singleparentID = 'singlenumber-lp-' + singleID;
    this.RandomNumber[id] = [];
    this.UniqueSelectedNM = [];
    this.selecedNumCloneShowBottom[partID] = [];
    this.SingleselectedNumShowBottom[singleparentID] = [];

    this.SingleRandomNumber[singleparentID] = [];
    // Multiple randon number
    for (let p = 0; this.RandomNumber[id].length < 5; p++) {
      const value = Math.floor(Math.random() * 69);
      if (value != 0) {
        if (this.RandomNumber[id].length == 0) {
          this.RandomNumber[id].push(value);
          this.UniqueSelectedNM.push(value);
          this.selecedNumCloneShowBottom[partID].push(value);
        }
        else {
          //this.randomNumadd(value, id, partID);
          const index = this.RandomNumber[id].indexOf(value);
          if (index == -1) {
            this.RandomNumber[id].push(value);
            this.UniqueSelectedNM.push(value);
            this.selecedNumCloneShowBottom[partID].push(value);
          }
        }
      }
    }

    // singel Random Number
    for (let p = 0; this.SingleRandomNumber[singleparentID].length < 1; p++) {
      const singlerand = Math.floor(Math.random() * 26) + 1;
      if (singlerand != 0) {
        if (this.SingleRandomNumber[singleparentID].length == 0) {
          const out = await this.SingleRandomNumbercheck(singlerand);
          console.log(out + " == " + singlerand);
          this.SingleRandomNumber[singleparentID].push(out);
        }
      }
    }

    this.SingleRandomNumber[singleparentID].forEach((val, inx) => {
      this.UniqueSingleSelectedNM.push(val);
      this.SingleselectedNumShowBottom[singleparentID].push(val);
    });

    this.ShowBottomSingleNumbers(singleparentID);
    this.ShowBottomNumbers(partID);
    //}
    console.log(this.SingleRandomNumber);
    this.showSinglerandomNumber(singleID);
  }


  async randomNumberPick(){
    for (let i = 1; i <= this.TopicNames.length; i++) {
      this.singleRandomNumberPick(null,i);
    }
  }
  // async randomNumberPick() {
  //   debugger;
  //   const totalBlock = this.TopicNames;
  //   this.UniqueSingleSelectedNM = [];
  //   for (let i = 1; i <= totalBlock.length; i++) {
  //     const id = 'random_' + i;
  //     const partID = 'number-lp-' + i;
  //     const singleparentID = 'singlenumber-lp-' + i;
  //     this.RandomNumber[id] = [];
  //     this.UniqueSelectedNM = [];
  //     this.selecedNumCloneShowBottom[partID] = [];
  //     this.SingleselectedNumShowBottom[singleparentID] = [];

  //     this.SingleRandomNumber[singleparentID] = [];
  //     // Multiple randon number
  //     for (let p = 0; this.RandomNumber[id].length < 5; p++) {
  //       const value = Math.floor(Math.random() * 69);
  //       if (value != 0) {
  //         if (this.RandomNumber[id].length == 0) {
  //           this.RandomNumber[id].push(value);
  //           this.UniqueSelectedNM.push(value);
  //           this.selecedNumCloneShowBottom[partID].push(value);
  //         }
  //         else {
  //           this.randomNumadd(value, id, partID);
  //         }
  //       }
  //     }

  //     // singel Random Number
  //     for (let p = 0; this.SingleRandomNumber[singleparentID].length < 1; p++) {
  //       const singlerand = Math.floor(Math.random() * 26) + 1;
  //       if (singlerand != 0) {
  //         if (this.SingleRandomNumber[singleparentID].length == 0) {
  //           const out = await this.SingleRandomNumbercheck(singlerand);
  //           console.log(out + " == " + singlerand);
  //           this.SingleRandomNumber[singleparentID].push(out);
  //         }
  //       }
  //     }

  //     this.SingleRandomNumber[singleparentID].forEach((val, inx) => {
  //       this.UniqueSingleSelectedNM.push(val);
  //       this.SingleselectedNumShowBottom[singleparentID].push(val);
  //     });


  //     // console.log(this.RandomNumber);
  //     // console.log(this.SingleRandomNumber);
  //     // console.log(this.UniqueSingleSelectedNM);
  //     this.ShowBottomSingleNumbers(singleparentID);
  //     this.ShowBottomNumbers(partID);
  //   }
  //   console.log(this.SingleRandomNumber);
  //   this.showrandomNumber();
  // }
  SingleRandomNumbercheck(singlerand) {
    debugger;
    let out = singlerand;
    const totalBlock = this.TopicNames;
    for (let i = 1; i <= totalBlock.length; i++) {
      const singleparentID = 'singlenumber-lp-' + i;
      if (this.SingleRandomNumber[singleparentID] != undefined) {
        this.SingleRandomNumber[singleparentID].forEach((val, inx) => {
          if (singlerand == val) {
            const newrdnumber = Math.floor(Math.random() * 26) + 1;
            console.log("Match " + newrdnumber + "  == old => " + singlerand + " == " + val);
            out = newrdnumber;
          }
        });
      }
    }
    // console.log(this.SingleRandomNumber);
    // console.log(singlerand+" == "+out);
    return out;
  }


  showSinglerandomNumber(singleID: any) {
    debugger;
    const totalBlock = this.TopicNames;
    const $this = this;
    //for (let i = 1; i <= totalBlock.length; i++) {
    let i = singleID;
    const parentID = 'number-lp-' + i;
    const numberID = 'random_' + i;
    const singleparentID = 'singlenumber-lp-' + i;
    const SingleRandarry = this.SingleRandomNumber[singleparentID];
    const randnumber = this.RandomNumber[numberID];
    this.NumberClonerCollecter[parentID] = [];
    this.SingleselectedNumberCollect[singleparentID] = [];

    if (SingleRandarry != undefined && randnumber != undefined) {
      SingleRandarry.forEach((val, inx) => {
        this.SingleselectedNumberCollect[singleparentID].push(val);
      });

      randnumber.forEach((value, index) => {
        this.NumberClonerCollecter[parentID].push(value);
      });
      const sum = this.NumberClonerCollecter[parentID].reduce((acc, cur) => acc + cur, 0);
      const prevalue = 0.01;
      const Total = sum * prevalue;
      //this.ETH_Value = sum * prevalue;
      this.ETH_amount_value = Total;
      this.ETH_numberClcik.UserClickNumberStatus = 'Yes';
      this.ETH_numberClcik.UserClickNumberValue = Total.toFixed(2);
      localStorage.setItem("PickNumber-" + parentID, JSON.stringify(this.ETH_numberClcik));
      this.TotalCountETH();
    }
    //}
  }


  showrandomNumber() {

    const totalBlock = this.TopicNames;
    const $this = this;
    for (let i = 1; i <= totalBlock.length; i++) {
      const parentID = 'number-lp-' + i;
      const numberID = 'random_' + i;
      const singleparentID = 'singlenumber-lp-' + i;
      const SingleRandarry = this.SingleRandomNumber[singleparentID];
      const randnumber = this.RandomNumber[numberID];
      this.NumberClonerCollecter[parentID] = [];
      this.SingleselectedNumberCollect[singleparentID] = [];

      if (SingleRandarry != undefined && randnumber != undefined) {
        SingleRandarry.forEach((val, inx) => {
          this.SingleselectedNumberCollect[singleparentID].push(val);
        });

        randnumber.forEach((value, index) => {
          this.NumberClonerCollecter[parentID].push(value);
        });
        const sum = this.NumberClonerCollecter[parentID].reduce((acc, cur) => acc + cur, 0);
        const prevalue = 0.01;
        const Total = sum * prevalue;
        //this.ETH_Value = sum * prevalue;
        this.ETH_amount_value = Total;
        this.ETH_numberClcik.UserClickNumberStatus = 'Yes';
        this.ETH_numberClcik.UserClickNumberValue = Total.toFixed(2);
        localStorage.setItem("PickNumber-" + parentID, JSON.stringify(this.ETH_numberClcik));
        this.TotalCountETH();
      }
    }
  }
  addItem() {
    const currentblock = this.TopicNames.length;
    if (currentblock < 10) {
      this.TopicNames.push(currentblock + 1);
      const val = currentblock + 1;
      localStorage.setItem('TotalBlock', JSON.stringify(val));

    }
    this.TotalCountETH();
  }
  removeAllAfterBuyTicket() {
    this.removeAllBlock();
    this.TopicNames = [1];
    const val = 1;
    localStorage.setItem('TotalBlock', JSON.stringify(val));
    this.TotalCountETH();
  }

  removeAll(event) {
    if (confirm("Are you sure to delete all tickets.")) {
      this.removeAllBlock();
      this.TopicNames = [1];
      const val = 1;
      localStorage.setItem('TotalBlock', JSON.stringify(val));
      this.TotalCountETH();
    }

  }
  clearAllTicket() {
    if (confirm("Are you sure to clear all tickets.")) {
      this.removeAllBlock();
    }
  }

  removeAllBlock() {
    const totalBlock = this.TopicNames;
    for (var i = 1; i <= totalBlock.length; i++) {
      //if (i > 1) {
      this.NumberClonerCollecter["number-lp-" + i] = [];
      this.selecedNumCloneShowBottom["number-lp-" + i] = [];
      this.ShowBottomNumbers('number-lp-' + i);
      this.RandomNumber['random_' + i] = [];

      this.SingleRandomNumber['singlenumber-lp-' + i] = [];
      this.SingleselectedNumShowBottom['singlenumber-lp-' + i] = [];
      this.SingleselectedNumberCollect['singlenumber-lp-' + i] = [];
      this.ShowBottomSingleNumbers('singlenumber-lp-' + i);
      //}
    }
  }

  removeItem(value) {
    debugger;
    const index = this.TopicNames.indexOf(value);
    if (index > -1) {
      this.TopicNames.splice(index, 1);
    }
    localStorage.setItem('TotalBlock', JSON.stringify(this.TopicNames.length));

  }
  cmOpenModal() {

    const Modalbtn = document.getElementById('Modal-btn');
    Modalbtn.click();
  }
  closeMessageAndLoader() {
    setTimeout(() => {
      this.alertService.clear();
      this.ngxLoader.stop();
    }, 3000);
  }


  clearAlert() {
    setTimeout(() => {
      this.alertService.clear();
    }, 3000);
  }

  replaceDateWithIndex(id) {
    const totalBlock = this.TopicNames;

    this.NumberClonerCollecter["number-lp-" + id] = [];
    this.selecedNumCloneShowBottom["number-lp-" + id] = [];

    this.RandomNumber['random_' + id] = [];

    this.SingleRandomNumber['singlenumber-lp-' + id] = [];
    this.SingleselectedNumShowBottom['singlenumber-lp-' + id] = [];
    this.SingleselectedNumberCollect['singlenumber-lp-' + id] = [];

    let parentID = "number-lp-";
    let singleparentID = 'singlenumber-lp-';
    let randomID = 'random_';

    for (var i = id; i < totalBlock.length; i++) {

      let i1 = i + 1;

      this.NumberClonerCollecter[parentID + i] = this.NumberClonerCollecter[parentID + i1];
      this.selecedNumCloneShowBottom[parentID + i] = this.selecedNumCloneShowBottom[parentID + i1];
      this.ShowBottomNumbers(parentID + i);

      this.RandomNumber['random_' + i] = this.RandomNumber['random_' + i1];

      this.SingleRandomNumber[singleparentID + i] = this.SingleRandomNumber[singleparentID + i1];
      this.SingleselectedNumShowBottom[singleparentID + i] = this.SingleselectedNumShowBottom[singleparentID + i1];
      this.SingleselectedNumberCollect[singleparentID + i] = this.SingleselectedNumberCollect[singleparentID + i1];
      this.ShowBottomSingleNumbers(singleparentID + i);

      //this.RandomSingleActive(i, "");
    }
    //removing data from last index
    let lastIndex = totalBlock.length;

    this.NumberClonerCollecter[parentID + lastIndex] = [];
    this.selecedNumCloneShowBottom[parentID + lastIndex] = [];
    this.RandomNumber['random_' + lastIndex] = [];

    this.SingleRandomNumber[singleparentID + lastIndex] = [];
    this.SingleselectedNumShowBottom[singleparentID + lastIndex] = [];
    this.SingleselectedNumberCollect[singleparentID + lastIndex] = [];
  }

  onClearClick(event, id) {

    let parentID = "number-lp-" + id;
    const singleparentID = 'singlenumber-lp-' + id;

    this.selectedNumberCollect = [];
    this.NumberClonerCollecter[parentID] = [];
    this.selecedNumCloneShowBottom[parentID] = [];
    this.ShowBottomNumbers(parentID);

    this.RandomNumber['random_' + id] = [];

    this.SingleRandomNumber[singleparentID] = [];
    this.SingleselectedNumShowBottom[singleparentID] = [];
    this.SingleselectedNumberCollect[singleparentID] = [];
    this.ShowBottomSingleNumbers(singleparentID);

    this.RandomSingleActive(id, "");

  }

  CloneAdd(value) {

    if (this.SelectCloneCard.indexOf(value) == -1) {
      this.SelectCloneCard.push(value);
    }
  }

  SaveNumber(event, parentID, PickValue) {

    if (this.NumberClonerCollecter[parentID].length > 4) {
      const index = this.NumberClonerCollecter[parentID].indexOf(PickValue);
      const Unqselectindex = this.UniqueSelectedNM.indexOf(PickValue);

      if (index != -1) {
        this.NumberClonerCollecter[parentID].splice(index, 1);
        this.selecedNumCloneShowBottom[parentID].splice(index, 1);
        this.RandomNumber['random_' + parentID.split("-")[2]].splice(index, 1);
        this.UniqueSelectedNM.splice(Unqselectindex, 1);
        event.target.className = "";
      }
      else {
        this.toastr.error('You can only Select Five Numbers');
        //this.alertService.info('Please Click Under number 5 Below');
        //this.alertService.customclass('cm-top-right');
        //this.clearAlert();
      }
    }
    else {
      if (this.NumberClonerCollecter[parentID].indexOf(PickValue) == -1) {
        event.target.className = "active";
        this.NumberClonerCollecter[parentID].push(PickValue);
        this.selecedNumCloneShowBottom[parentID].push(PickValue);
        this.RandomNumber['random_' + parentID.split("-")[2]].push(PickValue);
        this.UniqueSelectedNM.push(PickValue);
        this.ETH_numberClcik.UserClickNumberStatus = 'Yes';
      }
      else {
        event.target.className = "";
        const index = this.NumberClonerCollecter[parentID].indexOf(PickValue);
        const selectNumCloneindex = this.selecedNumCloneShowBottom[parentID].indexOf(PickValue);
        const randomIndex = this.RandomNumber['random_' + parentID.split("-")[2]].indexOf(PickValue);
        const Unqselectindex = this.UniqueSelectedNM.indexOf(PickValue);
        if (index > -1 || Unqselectindex > -1) {
          this.NumberClonerCollecter[parentID].splice(index, 1);
          this.selecedNumCloneShowBottom[parentID].splice(selectNumCloneindex, 1);
          this.RandomNumber['random_' + parentID.split("-")[2]].splice(randomIndex, 1);
          this.UniqueSelectedNM.splice(Unqselectindex, 1);
        }
      }
      const sum = this.NumberClonerCollecter[parentID].reduce((acc, cur) => acc + cur, 0);
      const prevalue = 0.01;
      const Total = sum * prevalue;
      //this.ETH_Value = sum * prevalue;
      this.ETH_amount_value = Total;
      this.ETH_numberClcik.UserClickNumberValue = Total;
    }
    localStorage.setItem("PickNumber-" + parentID, JSON.stringify(this.ETH_numberClcik));
    this.TotalCountETH();
  }
  sum(input) {

    if (toString.call(input) !== "[object Array]")
      return 0;
    var total = 0;
    for (var i = 0; i < input.length; i++) {
      if (isNaN(input[i])) {
        continue;
      }
      total += Number(input[i]);
    }
    return total;
  }
  RandomSingleActive(cmid, value) {
    let out = '';
    const id = 'singlenumber-lp-' + cmid;
    const totalBlock = this.TopicNames;
    if (this.SingleselectedNumberCollect[id] != undefined) {
      for (let i = 1; i <= totalBlock.length; i++) {
        const cmi = 'singlenumber-lp-' + i;
        if (cmi == id) {
          if (this.SingleselectedNumberCollect[cmi] != undefined) {
            const index = this.SingleselectedNumberCollect[cmi].indexOf(value);
            if (index > -1) {
              out = 'active';
            }
          }
        }
      }
    }
    return out;
  }

  Randomnumberactive(cmid, value) {
    let out = '';
    const id = 'number-lp-' + cmid;
    const totalBlock = this.TopicNames;
    if (this.NumberClonerCollecter[id] != undefined) {
      for (let i = 1; i <= totalBlock.length; i++) {
        const cmi = 'number-lp-' + i;
        if (cmi == id) {
          if (this.NumberClonerCollecter[cmi] != undefined) {
            const index = this.NumberClonerCollecter[cmi].indexOf(value);
            if (index > -1) {
              out = 'active';
            }
          }
        }
      }
    }
    return out;
  }
  DisabledExistKey(i, ID) {
    let out = '';
    const parentID = 'number-lp-' + ID;
    const index = this.UniqueSelectedNM.indexOf(i);
    if (index > -1) {
      out = 'in';
    }
    return out;
  }
  DisabledSingleExistKey(i) {
    let out = '';
    const index = this.UniqueSingleSelectedNM.indexOf(i);
    if (index > -1) {
      out = 'in';
    }
    return out;
  }
  ClearNumberStorage() {
    const totalBlock = localStorage.getItem('TotalBlock');
    if (totalBlock !== undefined) {
      console.log(totalBlock + " ==");
      const totalBlocks = parseInt(totalBlock);
      for (let i = 0; i < totalBlocks; i++) {
        const get = i + 1;
        localStorage.removeItem('PickNumber-number-lp-' + get)
      }
      localStorage.removeItem('TotalBlock');
    }

    localStorage.removeItem('TotalNumberETH');
    localStorage.removeItem('TotalETH');
  }
  TotalCountETH() {
    const totalBlock = this.TopicNames;
    localStorage.setItem('TotalNumberETH', 'Empty');
    this.ETH_Total_Value = [];
    for (let i = 0; i < totalBlock.length; i++) {
      const get = i + 1;
      const getAllStorage = JSON.parse(localStorage.getItem('PickNumber-number-lp-' + get));
      if (getAllStorage !== null) {
        this.ETH_Total_Value.push(getAllStorage.UserClickNumberValue);
      }

    }
    this.ETH_btn_Show = this.sum(this.ETH_Total_Value);
    this.ETH_Button_ShowVAl = this.TopicNames.length * this.price;
    localStorage.setItem('TotalETH', this.ETH_Button_ShowVAl);
  }

  // Show Botom Number
  ShowBottomNumbers(parentID) {
    debugger;
    let values = [];
    if (this.selecedNumCloneShowBottom[parentID] != undefined) {
      values = this.selecedNumCloneShowBottom[parentID].sort((a, b) => a - b);
    }
    var currentID = parentID.split("-");
    const lastItem = currentID[currentID.length - 1];
    const elm = document.getElementById('total-selected-number-' + lastItem);
    elm.innerHTML = '';
    if (values != undefined) {
      values.forEach((value, index) => {
        elm.innerHTML += "<span style='background-color:white;color:black;height: 26px;width: 26px;border-radius:50%;'>" + value + "</span>";
      });
    }

  }
  currentcardremove(event) {
    debugger;
    const $this = this;
    const parentindex = event.target.parentNode.parentNode.parentNode;
    const parentval = event.target.parentNode.parentNode.parentNode.getAttribute('data-val');
    if (parentval != '1') {
      const parentID = 'number-lp-' + parentval;
      const singleparentID = 'singlenumber-lp-' + parentval;
      const currnetStatus = this.NumberClonerCollecter[parentID];
      const singlecurrentstatus = this.SingleselectedNumShowBottom[singleparentID];
      if (parentval != "1") {
        const value = parseInt(parentval);
        if (singlecurrentstatus != undefined) {
          this.SingleselectedNumShowBottom[singleparentID].forEach((val, indx) => {
            const valinx = $this.UniqueSingleSelectedNM.indexOf(val);
            if (valinx > -1) {
              $this.UniqueSingleSelectedNM.splice(valinx, 1);
            }
          });
        }
        if (currnetStatus != undefined) {
          this.NumberClonerCollecter[parentID].forEach((val, indx) => {
            const valindex = $this.UniqueSelectedNM.indexOf(val);
            if (valindex > -1) {
              $this.UniqueSelectedNM.splice(valindex, 1);
            }
          });
        }



        //this.removeItem(value);
        localStorage.removeItem('PickNumber-number-lp-' + value);
        //this.onClearClick(event, parentval);
        this.replaceDateWithIndex(value);
        this.removeItem(this.TopicNames.length)
      }
    }
    else {
      this.toastr.error('You can not remove first ticket.');
    }
    this.TotalCountETH();
  }
  ShowBottomSingleNumbers(parentID) {

    const SingleValues = this.SingleselectedNumShowBottom[parentID];
    var currentID = parentID.split("-");
    const lastItem = currentID[currentID.length - 1]
    const elm = document.getElementById('single-selected-number-' + lastItem);
    elm.innerHTML = '';
    if (SingleValues != undefined) {
      SingleValues.forEach((value, index) => {
        elm.innerHTML += "<span style='background-color:red;color:white;height:26px;width:26px;border-radius:50%;'>" + SingleValues + "</span>";
      });
    }
  }
  // On click Multiple Numbers
  onPickNumberClick(event) {
    const $this = this;
    const PickValue = parseInt(event.target.innerHTML);
    const parentID = event.target.parentNode.id;

    if (this.NumberClonerCollecter[parentID] === undefined) {
      this.NumberClonerCollecter[parentID] = [];
      this.selecedNumCloneShowBottom[parentID] = [];
      this.RandomNumber['random_' + parentID.split("-")[2]] = [];
      this.SaveNumber(event, parentID, PickValue);
    }
    else {
      this.SaveNumber(event, parentID, PickValue);
    }
    this.ShowBottomNumbers(parentID);
  }

  // Saving Selected Numbers
  saveSinleNumber(event, parentID, PickValue) {

    if (this.SingleselectedNumberCollect[parentID].length > 0) {
      const index = this.SingleselectedNumberCollect[parentID].indexOf(PickValue);
      const uniquesinlgeindex = this.UniqueSingleSelectedNM.indexOf(PickValue);
      if (index != -1) {
        this.SingleselectedNumberCollect[parentID].splice(index, 1);
        this.SingleselectedNumShowBottom[parentID].splice(index, 1);
        this.UniqueSingleSelectedNM.splice(uniquesinlgeindex, 1);
        event.target.className = "";
      }
      else {
        this.toastr.error('You can only Select One Powerball Number');
        //this.alertService.info('You can only Select One Number');
        //this.alertService.customclass('cm-top-right');
        //this.clearAlert();

      }

    }
    else {
      if (this.SingleselectedNumberCollect[parentID].indexOf(PickValue) == -1) {
        event.target.className = "active";
        this.SingleselectedNumberCollect[parentID].push(PickValue);
        this.SingleselectedNumShowBottom[parentID].push(PickValue);
        this.UniqueSingleSelectedNM.push(PickValue);
      }
      else {
        event.target.className = "";
        const index = this.SingleselectedNumberCollect[parentID].indexOf(PickValue);
        const uniquesinlgeindex = this.UniqueSingleSelectedNM.indexOf(PickValue);
        if (index > -1) {
          this.SingleselectedNumberCollect[parentID].splice(index, 1);
          this.SingleselectedNumShowBottom[parentID].splice(index, 1);
          this.UniqueSingleSelectedNM.splice(uniquesinlgeindex, 1)
        }
      }
    }
  }

  // Single Select Value
  onSinglePickNumberClick(event) {
    const $this = this;
    const PickValue = parseInt(event.target.innerHTML);
    const parentID = event.target.parentNode.id;
    if (this.SingleselectedNumberCollect[parentID] === undefined) {
      this.SingleselectedNumberCollect[parentID] = [];
      this.SingleselectedNumShowBottom[parentID] = []
      this.saveSinleNumber(event, parentID, PickValue);
    }
    else {
      this.saveSinleNumber(event, parentID, PickValue);
    }
    this.ShowBottomSingleNumbers(parentID);
    console.log(this.SingleselectedNumberCollect);
  }

  validateBeforePay() {
    let isValidate = "";
    var combinedarray1: any = [];
    var combinedarray2: any = [];
    var combinedarray: any = [];
    //if (this.SingleselectedNumShowBottom != undefined && this.selecedNumCloneShowBottom != undefined) {
    for (let i = 1; i <= this.TopicNames.length; i++) {
      if (this.SingleselectedNumShowBottom['singlenumber-lp-' + i] != undefined) {
        let ele = this.SingleselectedNumShowBottom['singlenumber-lp-' + i]
        combinedarray1.push(...ele);
      }
    }

    for (let i = 1; i <= this.TopicNames.length; i++) {
      if (this.selecedNumCloneShowBottom['number-lp-' + i] != undefined) {
        let ele = this.selecedNumCloneShowBottom['number-lp-' + i]
        combinedarray2.push(...ele);
      }
    }
    combinedarray = [...combinedarray2, ...combinedarray1];

    if (combinedarray.length == 0) {
      this.toastr.error('Please select all numbers.');
      //this.alertService.info('Please select all numbers.');
      //this.alertService.customclass('cm-top-right');
      //this.clearAlert();
      isValidate = "No";
      return isValidate;
    }
    else if (combinedarray.length % 6 != 0) {
      this.toastr.error('Please select all numbers.');
      //this.alertService.info('Please select all numbers.');
      //this.alertService.customclass('cm-top-right');
      //this.clearAlert();
      isValidate = "No";
      return isValidate;
    }
    //}
    //else {
    //  this.alertService.info('Please select all numbers');
    //  this.alertService.customclass('cm-top-right');
    //  this.clearAlert();
    //  isValidate = "No";
    //  return isValidate;
    //}

  }

  async sendTicketPay() {
    debugger;
    //this.validateBeforePay();
    if (this.validateBeforePay() != "No") {
      if (sessionStorage.getItem("account")) {
        //this.ngxLoader.start();
        var accountid = window.web3.eth.accounts[0];
        if (this.accountDetails == accountid) {
          this.sendTransactionToMetaMask();
          this.ngxLoader.stop();
        }
        else {
          this.toastr.error('Account has been changed.')
          this.ngxLoader.stop();
          location.reload();
        }
      }
      else {
        this.toastr.error('Please connect Wallet.');
        this.ngxLoader.stop();
        //this.alertService.info('Please connect Wallet.');
        //this.alertService.customclass('cm-top-right');
        //this.clearAlert();
      }

    }
    // const picknumberexist = localStorage.getItem('TotalETH');
    // const lockedstatus = await this.pbMetamask.checkislocked();
    // const UserID  =  localStorage.getItem('UserID');
    // if (lockedstatus) {
    //   if (picknumberexist !== null && UserID !== null) {
    //     const NetworkTypeCheck = await this.pbMetamask.CurrentNetworkType();
    //     if (NetworkTypeCheck.NetworkTypeStatus) {
    //       this.ngxLoader.stop();
    //       const RecipientID = localStorage.getItem('RecipientID');
    //       const UserPayment = JSON.parse(localStorage.getItem('TotalETH'));
    //       const data = {
    //         'UserID': UserID,
    //         'RecipientID': RecipientID,
    //         'UserPayment': UserPayment,
    //       }


    //       this.pbMetamask.sendEthereum(data);
    //     }
    //     else {
    //       this.alertService.info("Please Chaneg Network Type For Transaction");
    //       this.alertService.customclass('cm-top-right');
    //       this.closeMessageAndLoader();
    //     }
    //   }
    //   else {
    //     this.alertService.info("Please Pick any Number after try again");
    //     this.alertService.customclass('cm-top-right');
    //     this.closeMessageAndLoader();
    //   }
    // }
    // else {
    //   this.alertService.info("Please unlock your Meta Mask");
    //   this.alertService.customclass('cm-top-right');
    //   localStorage.removeItem('UserTracaction');
    //   localStorage.removeItem('RecipientID');
    //   localStorage.removeItem('UserID');
    //   this.closeMessageAndLoader();
    // }
  }
}
