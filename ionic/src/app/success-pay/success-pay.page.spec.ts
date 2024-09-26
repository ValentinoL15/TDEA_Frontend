import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessPayPage } from './success-pay.page';

describe('SuccessPayPage', () => {
  let component: SuccessPayPage;
  let fixture: ComponentFixture<SuccessPayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
