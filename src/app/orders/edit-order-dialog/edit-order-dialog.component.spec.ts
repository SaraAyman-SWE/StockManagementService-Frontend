import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderDialogComponent } from './edit-order-dialog.component';

describe('EditOrderDialogComponent', () => {
  let component: EditOrderDialogComponent;
  let fixture: ComponentFixture<EditOrderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditOrderDialogComponent]
    });
    fixture = TestBed.createComponent(EditOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
