import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment';

const CONTROLLERNAME = "Orders";
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  serviceAPI: string;
  http: HttpClient;
  authenticationSettings: string;

  private orderSavedSubject = new BehaviorSubject<boolean>(false);
  orderSaved$ = this.orderSavedSubject.asObservable();

  constructor(http: HttpClient) { 
    this.serviceAPI = environment.apiURL + "/api" ;
    this.http = http;
    this.authenticationSettings = environment.authenticationUsername + ":" + environment.authenticationPassword;
  }

  create(dto: any) : Observable<any>{
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': `Basic ${btoa(this.authenticationSettings)}` }) };
    return this.http.post<any>(`${this.serviceAPI}/${CONTROLLERNAME}`, dto, httpOptions)
    .pipe(map((record: any) => {
      return record;
    }));
  }

  getHistory() : Observable<any>{
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': `Basic ${btoa(this.authenticationSettings)}` }) };
    return this.http.get<any>(`${this.serviceAPI}/${CONTROLLERNAME}`, httpOptions)
    .pipe(map((record: any) => {
      return record;
    }));
  }

  notifyOrderSaved() {
    this.orderSavedSubject.next(true);
  }

}
