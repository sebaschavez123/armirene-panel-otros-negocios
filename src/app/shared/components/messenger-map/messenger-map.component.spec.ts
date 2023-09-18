import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerMapComponent } from './messenger-map.component';

describe('MessengerMapComponent', () => {
  let component: MessengerMapComponent;
  let fixture: ComponentFixture<MessengerMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessengerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
