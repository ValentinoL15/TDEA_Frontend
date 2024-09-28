import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FailurePayPage } from './failure-pay.page';

describe('FailurePayPage', () => {
  let component: FailurePayPage;
  let fixture: ComponentFixture<FailurePayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FailurePayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
