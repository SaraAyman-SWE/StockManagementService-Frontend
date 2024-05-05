import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.css']
})
export class OrderEditorComponent implements OnInit {
  @ViewChild('form', { static: true })
  private form!: NgForm;
  orderForm!: UntypedFormGroup;
  private onOrderSaved = new Subject<OrderCreateDto>();
  orderSaved$ = this.onOrderSaved.asObservable();
  isLoadingChanges: boolean = false;
  saveClicked = false;
  public orderTypeList: string[] = ["Buy", "Sell"];

  get type() {
    return this.orderForm.get('type');
  }

  get quantity() {
    return this.orderForm.get('quantity');
  }

  get stockSymbol(){
    return this.orderForm.get('stockSymbol');
  }

  constructor(
    private orderService: OrderService,
    private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.orderForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      stockSymbol: ['', [Validators.required]]
    });
  }

  public resetForm() {
    this.orderForm.reset({
      type: '',
      quantity: '',
      stockSymbol: ''
    });
  }

  public save(event: Event) {
    this.saveClicked = true;
    if (!this.form.submitted) {
      this.form.onSubmit(event);
      return;
    }
    if (!this.orderForm.valid) {
      this.toastr.error("Missing Information", "You have entered invalid or incomplete information. Please correct any errors and try again.");
      return;
    }
    this.toastr.show('Saving changes...');
    this.isLoadingChanges = true;
    const orderDtoData = this.orderForm.value;
    this.orderService.create(orderDtoData as OrderCreateDto).subscribe(
    {
      next: (response: any) => {
        this.isLoadingChanges = false;
        this.onOrderSaved.next(orderDtoData);
        this.toastr.clear();
        this.toastr.success(`Order created successfully`);
        this.resetForm();
        this.orderService.notifyOrderSaved();
      },
      error: res => {
        this.isLoadingChanges = false;
        this.toastr.clear();
        this.toastr.error(res?.error[0]?.errorMessage);
      }
    });
    this.toastr.clear();
  }
}

