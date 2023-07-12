import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesSelectComponent } from './cities-select.component';

describe('CitiesSelectComponent', () => {
  let component: CitiesSelectComponent;
  let fixture: ComponentFixture<CitiesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitiesSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitiesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
