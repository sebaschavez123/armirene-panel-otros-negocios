import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOfficeCardComponent } from './branch-office-card.component';

describe('BranchOfficeCardComponent', () => {
  let component: BranchOfficeCardComponent;
  let fixture: ComponentFixture<BranchOfficeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchOfficeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchOfficeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
