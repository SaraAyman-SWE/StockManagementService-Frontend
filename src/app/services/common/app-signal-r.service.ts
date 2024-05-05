import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppSignalRService {
  private hubConnection: signalR.HubConnection;
  private stockDataUpdatedSubject = new Subject<Stock[]>();
  stockDataUpdated$: Observable<Stock[]> = this.stockDataUpdatedSubject.asObservable();
  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.apiURL + '/realtimestocks')
      .build();

    this.hubConnection
    .start()
    .then(() => console.log('Connected to SignalR hub'))
    .catch(err => console.error('Error connecting to SignalR hub:', err));
  
    this.hubConnection.on('StockDataUpdated', (stocks: Stock[]) => {
      this.stockDataUpdatedSubject.next(stocks);
    });
  }
}
