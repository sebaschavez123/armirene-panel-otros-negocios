import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNotificationComponent } from './order-notification.component';

describe('OrderNotificationComponent', () => {
  let component: OrderNotificationComponent;
  let fixture: ComponentFixture<OrderNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderNotificationComponent]
    });
    fixture = TestBed.createComponent(OrderNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
