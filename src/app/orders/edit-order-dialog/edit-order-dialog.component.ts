import { AfterViewInit, Component, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { OrderEditorComponent } from '../order-editor/order-editor.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersListComponent } from '../orders-list/orders-list.component';

@Component({
  selector: 'app-edit-order-dialog',
  templateUrl: './edit-order-dialog.component.html',
  styleUrls: ['./edit-order-dialog.component.css']
})
export class EditOrderDialogComponent implements AfterViewInit {
  @ViewChild(OrderEditorComponent, { static: false }) 
  orderEditor!: OrderEditorComponent;
  constructor(public dialogRef: MatDialogRef<OrderEditorComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { }) {
  }

  ngAfterViewInit() {
    this.orderEditor.orderSaved$.subscribe((order: any) => this.dialogRef.close(order));
  }
}
