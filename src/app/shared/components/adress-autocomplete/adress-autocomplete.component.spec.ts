import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressAutocompleteComponent } from './adress-autocomplete.component';

describe('AdressAutocompleteComponent', () => {
  let component: AdressAutocompleteComponent;
  let fixture: ComponentFixture<AdressAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdressAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdressAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
