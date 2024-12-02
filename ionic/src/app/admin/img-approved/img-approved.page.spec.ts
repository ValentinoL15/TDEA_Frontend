import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImgApprovedPage } from './img-approved.page';

describe('ImgApprovedPage', () => {
  let component: ImgApprovedPage;
  let fixture: ComponentFixture<ImgApprovedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgApprovedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
