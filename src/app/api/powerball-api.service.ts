import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { Observable } from 'rxjs/Rx';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
//import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PowerballApiService {

  apiurl="http://15.223.79.224:3005/";
  private priceURL = this.apiurl+"api/eth/getPriceOfOneTicket";

  constructor(public http: HttpClient) { }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getEstimateJackpotDetail() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('G+R_#yva9dfPZz3m!MC-SA3L:BMrka3Kx%PbA6fW7-HtYa!b6j!DYS4+q_^RP*8eyprpLF2CQ')
      })
    };
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set("Authorization", "Basic SWFteW91cnVzZXJmb3Jwb3dlcmJhbGw6SWFteW91cnBhc3Nmb3Jwb3dlcmJhbGw=")
      .set('Access-Control-Allow-Origin', '*');
    return this.http.get(this.apiurl+'api/eth/getEstimateJackpotDetail', { headers: httpOptions.headers });
  }


  getWinningNumber() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('G+R_#yva9dfPZz3m!MC-SA3L:BMrka3Kx%PbA6fW7-HtYa!b6j!DYS4+q_^RP*8eyprpLF2CQ')
      })
    };

    return this.http.get(this.apiurl+'api/eth/getWinningNumber', { headers: httpOptions.headers });

  }

  getNextJackpotDetails() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('G+R_#yva9dfPZz3m!MC-SA3L:BMrka3Kx%PbA6fW7-HtYa!b6j!DYS4+q_^RP*8eyprpLF2CQ')
      })
    };
    return this.http.get(this.apiurl+'api/eth/getNextJackpotDetails', { headers: httpOptions.headers });
  }

  getGasPrice(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('G+R_#yva9dfPZz3m!MC-SA3L:BMrka3Kx%PbA6fW7-HtYa!b6j!DYS4+q_^RP*8eyprpLF2CQ')
      })
    };
    return this.http.post(this.apiurl+'api/eth/calculateEstimatedGas',data, { headers: httpOptions.headers });
   //return this.http.post('http://localhost:3005/api/eth/createTransaction',data, { headers: httpOptions.headers });
  }


  saveTransactionDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('G+R_#yva9dfPZz3m!MC-SA3L:BMrka3Kx%PbA6fW7-HtYa!b6j!DYS4+q_^RP*8eyprpLF2CQ')
      })
    };
    return this.http.post(this.apiurl+'api/eth/createTransaction',data, { headers: httpOptions.headers });
   //return this.http.post('http://localhost:3005/api/eth/createTransaction',data, { headers: httpOptions.headers });
  }


  getPrice() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('G+R_#yva9dfPZz3m!MC-SA3L:BMrka3Kx%PbA6fW7-HtYa!b6j!DYS4+q_^RP*8eyprpLF2CQ')
      })
    };

    return this.http.get(this.priceURL, { headers: httpOptions.headers });
  }

  getSaleIdNow() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('G+R_#yva9dfPZz3m!MC-SA3L:BMrka3Kx%PbA6fW7-HtYa!b6j!DYS4+q_^RP*8eyprpLF2CQ')
      })
    };
    return this.http.get(this.apiurl+'api/eth/getSaleIdNow', { headers: httpOptions.headers });
  }

  getWinningAddress() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('G+R_#yva9dfPZz3m!MC-SA3L:BMrka3Kx%PbA6fW7-HtYa!b6j!DYS4+q_^RP*8eyprpLF2CQ')
      })
    };
    return this.http.get(this.apiurl+'api/eth/getWinningAddress', { headers: httpOptions.headers });
  }

  getWinningAmount() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('G+R_#yva9dfPZz3m!MC-SA3L:BMrka3Kx%PbA6fW7-HtYa!b6j!DYS4+q_^RP*8eyprpLF2CQ')
      })
    };
    return this.http.get(this.apiurl+'api/eth/getWinningAmount', { headers: httpOptions.headers });
  }

  getContractAddress() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('G+R_#yva9dfPZz3m!MC-SA3L:BMrka3Kx%PbA6fW7-HtYa!b6j!DYS4+q_^RP*8eyprpLF2CQ')
      })
    };
    return this.http.get(this.apiurl+'api/eth/getContractAddress', { headers: httpOptions.headers });
  }


}
