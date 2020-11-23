import { Component, OnInit, Input, ViewChild, HostListener, DoCheck} from '@angular/core';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,} from '@angular/forms';
import { AlertService } from '../../_alert';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import detectEthereumProvider from '@metamask/detect-provider';
import { PowerballMetamaskService } from '../../services/powerball-metamask.service';
import { type } from 'os';
import Web3 from 'web3';
import { ToastrService } from 'ngx-toastr';
declare let require: any;
declare let window: any;

@Component({
  selector: 'common-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, DoCheck {
  StatusBlockClass: string;
  FormValidateMessage: string;
  FormMessageStatus: Boolean;
  UserTracaction = localStorage.getItem('UserTracaction');
  UserID = localStorage.getItem('UserID');
  ETH_sendTRansactionForm = new FormGroup({
    ETH_addres: new FormControl(''),
    ETH_Rect_address: new FormControl(''),
    ETH_amount: new FormControl(''),
  });
  RopstenNetwork: boolean;
  SendTransButton: boolean;
  CurrentNetwork = {
    NetworkTypeName: '',
    NetworkTypeStatus: false,
  };
  //web3: any = window.web3;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  // New Meta Mask Variables
  web3: any;
  enable: any;
  metaMaskStatus: string = 'Get MetaMask';

  constructor(
    public pbMetamask: PowerballMetamaskService,
    private ngxLoader: NgxUiLoaderService,
    public alertService: AlertService,
    public fb: FormBuilder,
    private toster: ToastrService
  ) {
    this.ETH_sendTRansactionForm = this.fb.group({
      ETH_addres: ['', Validators.required],
      ETH_Rect_address: ['', Validators.required],
      ETH_amount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // On Network Change Reload Page
    // this.pbMetamask.onNetwirkChangeREload();

    this.checkMetaMaskInitial();
    if (window.ethereum.networkVersion !== "1") {
      this.toster.warning('Warning!', 'Please Shift onto Mainnet Net.');
      //this.alertService.info('Please Shift onto Main Net.');
      //this.alertService.customclass('cm-top-right');
      //this.clearAlert();
    }
  }

  ngDoCheck() {
    if (window.ethereum && window.ethereum._state && window.ethereum._state.accounts && window.ethereum._state.accounts.length) {
      if (window.ethereum._state.accounts[0] === undefined) {
        this.metaMaskStatus = "Connect Wallet";
      } else {
        this.metaMaskStatus = "Wallet Connected";
        sessionStorage.setItem('account', window.ethereum._state.accounts[0])
      }
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 150) {
      let element = document.getElementById('main-header-page');
      element.classList.add('sticky');
      element.classList.add('animated');
      element.classList.add('fadeInDown');
    } else {
      let element = document.getElementById('main-header-page');
      element.classList.remove('sticky');
      element.classList.remove('animated');
      element.classList.remove('fadeInDown');
    }
  }

  // Check for Meta Mask
  checkMetaMaskInitial() {
    if (window.ethereum === undefined) {
      this.metaMaskStatus = 'Get MetaMask';
    } else {
      this.metaMaskStatus = 'Connect Wallet';
    }
  }

  // Meta Mask INIT
  initMetaMask() {
    debugger;
    if (this.metaMaskStatus != 'Wallet Connected') {
      if (window.ethereum === undefined) {
        this.toster.error('Non-Ethereum browser detected. Install MetaMask');
        //alert('Non-Ethereum browser detected. Install MetaMask');
        this.metaMaskStatus = 'Get MetaMask';
      } else {
        if (typeof window.web3 !== 'undefined') {
          this.web3 = window.web3.currentProvider;
        } else {
          this.web3 = new Web3.providers.HttpProvider('http://localhost:4200');
        }

        window.web3 = new Web3(window.ethereum);
        this.enable = this.enableMetaMaskAccount();
        setInterval(function () {
          if (window.ethereum._state.accounts[0] === undefined) {
            this.metaMaskStatus = 'Connect Wallet';
          } else {
            this.metaMaskStatus = 'Wallet Connected';
            location.reload();
          }
        }, 1000);
      }
    }
    else {
      this.toster.info('Wallet already connected.');
      //this.alertService.info('Wallet already connected.');
      //this.alertService.customclass('cm-top-right');
      //this.clearAlert();
    }
  }

  clearAlert() {
    setTimeout(() => {
      this.alertService.clear();
    }, 3000);
  }

  // Meta Mask Connect
  async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable();
    });
    return Promise.resolve(enable);
  }

  // Check If Meta Mask Is install or Not
  // async isInstalled() {
  //   this.pbMetamask.isMetaMaskInstalled();
  // }
}
