import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMessengerComponent } from './order-messenger.component';

describe('OrderMessengerComponent', () => {
  let component: OrderMessengerComponent;
  let fixture: ComponentFixture<OrderMessengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderMessengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
