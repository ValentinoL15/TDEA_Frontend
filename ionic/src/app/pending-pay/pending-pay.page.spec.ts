import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PendingPayPage } from './pending-pay.page';

describe('PendingPayPage', () => {
  let component: PendingPayPage;
  let fixture: ComponentFixture<PendingPayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
