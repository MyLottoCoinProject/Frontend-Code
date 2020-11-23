import { Injectable } from '@angular/core';
import { AlertService } from '../_alert';
import { NgxUiLoaderService, } from 'ngx-ui-loader';
import detectEthereumProvider from '@metamask/detect-provider';
@Injectable({
  providedIn: 'root'
})
export class PowerballMetamaskService {
  SendTransButton: boolean;
  CurrentNetwork= {
    NetworkTypeName: '',
    NetworkTypeStatus:false
  };
  UserID = localStorage.getItem('UserID');
  UserTracaction = localStorage.getItem('UserTracaction');
  constructor(public alertService: AlertService, private ngxLoader: NgxUiLoaderService) { }

  async onNetwirkChangeREload() {
    const ethereum = await detectEthereumProvider();
    if (ethereum) { 
      ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
    }
  }

  
  // Change Value to HEXA
  onConvertHexa(value) {
    if (isNaN(value)) {
      if (value != '') {
        const encoded = new Buffer(value).toString('hex');
        const output = '0x' + encoded.toUpperCase();
        return output;
      }
    }
    else {
      value = value.toString();
      const encoded = new Buffer(value).toString('hex');
        const output = '0x' + encoded.toUpperCase();
        return output;
    } 
  }
  closeMessageAndLoader() {
    setTimeout(() => {
      this.alertService.clear();
      this.ngxLoader.stop();
      window.location.reload();
    }, 3000);
  }

  async checkislocked() {
    const ethereum = await detectEthereumProvider();
    const lockstatus = await ethereum._metamask.isUnlocked();
    return lockstatus;
  }
  async sendEthereum(data) {
    this.ngxLoader.start();
    const $this = this;
    const ethereum = await detectEthereumProvider();
    const FromThisAddress = data.UserID;
    const ToThisAddress = data.RecipientID;
    const ThisValues = this.onConvertHexa(data.UserPayment);
    const lockedstatus = await this.checkislocked();
    if (lockedstatus) {
      ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: FromThisAddress,
            to: ToThisAddress,
            value: ThisValues,
            gasPrice: '0x09184e72a000',
            gas: '0x5208',
          },
        ],
      })
      .then((txHash) => {
        $this.alertService.info('Transaction Sucess!');
        $this.alertService.customclass('cm-top-right');
        this.closeMessageAndLoader();
      })
     .catch((error) => {
       $this.alertService.info('Something went Wrong Please Try again');
       $this.alertService.customclass('cm-top-right');
       this.closeMessageAndLoader();
     });  
    }
    else {
      $this.alertService.info('Something went Wrong Please Try check is MetaMask is locked or not.');
      $this.alertService.customclass('cm-top-right');
       this.closeMessageAndLoader();
    }
    
     
  }

  // Is Installed
  async isMetaMaskInstalled() {

    this.ngxLoader.start();
    const ethereum = await detectEthereumProvider();
    const $this = this;     
        //Check if chrome extension is install or not
      if (ethereum) {
        // if extension is install then connect to the site
        // get account id from extension
        ethereum.request({ method: 'eth_requestAccounts' }).then((result) => {
          if (result.length === 0) {
            $this.alertService.info('MetaMask is locked Please Unlock For Tracaction');
            $this.alertService.customclass('cm-top-right');
            localStorage.removeItem('UserTracaction');
            localStorage.removeItem('RecipientID');
            localStorage.removeItem('UserID');
            $this.closeMessageAndLoader();
          }
          else {
            $this.alertService.info('MetaMask is unlocked. Now we are Ready To send Tracaction');
            $this.alertService.customclass('cm-top-right');
            $this.SendTransButton = true;
            localStorage.setItem('UserTracaction', 'Yes');
            localStorage.setItem('UserID', result[0]);
            localStorage.setItem('RecipientID', '0x63dfFe36bf79f2A683EeaCd7f6b28f4A43783D9d');
            $this.closeMessageAndLoader();
          }

        }).catch((error) => {
          
            console.log(error);
          // If the request fails, the Promise will reject with an error.
        });
      } 
      else {
        // Please install extesion link with message to user
        $this.alertService.info('MetaMask is not installed. Please Install.');
        $this.alertService.customclass('cm-top-right');
        localStorage.removeItem('UserTracaction');
        localStorage.removeItem('UserID');
        localStorage.removeItem('RecipientID');
        $this.closeMessageAndLoader();
        
      }

  }

  // Check Network Type
  async CurrentNetworkType() {
    const ethereum = await detectEthereumProvider();
    const NetworkTypeVersion = ethereum.networkVersion;
    switch (NetworkTypeVersion) {
      case "1":
        this.CurrentNetwork.NetworkTypeName = "Main";
        this.CurrentNetwork.NetworkTypeStatus = false;
        break;
      case "2":
        this.CurrentNetwork.NetworkTypeName = "Morden";
        this.CurrentNetwork.NetworkTypeStatus = false;
       break;
      case "3":
        this.CurrentNetwork.NetworkTypeName = "Ropsten";
        this.CurrentNetwork.NetworkTypeStatus = true;
        break;
      case "4":
        this.CurrentNetwork.NetworkTypeName = "Rinkeby";
        this.CurrentNetwork.NetworkTypeStatus = false;
        break;
      case "42":
        this.CurrentNetwork.NetworkTypeName = "Kovan";
        this.CurrentNetwork.NetworkTypeStatus = false;
        break;
      default:
        this.CurrentNetwork.NetworkTypeName = "Unknown";
        this.CurrentNetwork.NetworkTypeStatus = false;
    }
    return this.CurrentNetwork;
  }


}
