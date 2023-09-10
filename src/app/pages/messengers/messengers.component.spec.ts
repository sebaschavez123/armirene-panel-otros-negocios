import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengersComponent } from './messengers.component';

describe('MessengersComponent', () => {
  let component: MessengersComponent;
  let fixture: ComponentFixture<MessengersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessengersComponent]
    });
    fixture = TestBed.createComponent(MessengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
