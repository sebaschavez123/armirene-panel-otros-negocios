import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAddressPopupComponent } from './confirm-address-popup.component';

describe('ConfirmAddressPopupComponent', () => {
  let component: ConfirmAddressPopupComponent;
  let fixture: ComponentFixture<ConfirmAddressPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmAddressPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmAddressPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
