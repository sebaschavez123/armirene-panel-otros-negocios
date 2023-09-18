import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAuthenticationComponent } from './home-authentication.component';

describe('FormsContainerComponent', () => {
  let component: HomeAuthenticationComponent;
  let fixture: ComponentFixture<HomeAuthenticationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAuthenticationComponent]
    });
    fixture = TestBed.createComponent(HomeAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
