import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock/stock.service';
import { AppSignalRService } from '../services/common/app-signal-r.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  stockList!: Stock[];
  isDataLoaded: boolean = false;
  constructor(private stockService: StockService, private signalRService: AppSignalRService) {
    this.getRealTimeData();
  }
  ngOnInit(): void {
    this.isDataLoaded = false;
    this.signalRService.stockDataUpdated$.subscribe(res => {
      this.getRealTimeData();
    });
  }
  getRealTimeData(){
    this.stockService.getRealTimeData().subscribe(res => {
      this.isDataLoaded = true;
      this.stockList = res as Stock[];
    });
  }
}
