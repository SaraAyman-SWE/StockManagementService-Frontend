import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment';

const CONTROLLERNAME = "Stocks";
@Injectable({
  providedIn: 'root'
})
export class StockService {
  serviceAPI: string;
  http: HttpClient;
  authenticationSettings: string;

  constructor(http: HttpClient) { 
    this.serviceAPI = environment.apiURL + "/api" ;
    this.http = http;
    this.authenticationSettings = environment.authenticationUsername + ":" + environment.authenticationPassword;
  }

  getRealTimeData() : Observable<any>{
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': `Basic ${btoa(this.authenticationSettings)}` }) };
    return this.http.get<any>(`${this.serviceAPI}/${CONTROLLERNAME}`, httpOptions)
    .pipe(map((record: any) => {
      return record;
    }));
  }

  getHistoricalData(symbol: string) : Observable<any>{
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': `Basic ${btoa(this.authenticationSettings)}` }) };
    return this.http.get<any>(`${this.serviceAPI}/${CONTROLLERNAME}/${symbol}/history`, httpOptions)
    .pipe(map((record: any) => {
      return record;
    }));
  }
}