import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { MatDialog } from '@angular/material/dialog';
import { EditOrderDialogComponent } from '../edit-order-dialog/edit-order-dialog.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orderList!: OrderResponseDto[];

  constructor(private orderService: OrderService, private dialog: MatDialog) {
    this.initializeDataTable();
  }
  ngOnInit(): void {
    this.initializeDataTable();
    this.orderService.orderSaved$.subscribe(() => {
      this.initializeDataTable();
  });
  }

  private initializeDataTable(){
    this.orderService.getHistory().subscribe(res => this.orderList = res as OrderResponseDto[]);
  }

  openAddOrderDialog(){
    const dialogRef = this.dialog.open(EditOrderDialogComponent, 
      {
        panelClass: ['mat-dialog-lg', 'modal-fix-1', 'bg-grey-1'],
        data: {}
      });
    dialogRef.afterClosed().subscribe(r => {
    });
  }
}
