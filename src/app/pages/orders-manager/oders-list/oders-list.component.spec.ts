import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdersListComponent } from './oders-list.component';

describe('OdersListComponent', () => {
  let component: OdersListComponent;
  let fixture: ComponentFixture<OdersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
