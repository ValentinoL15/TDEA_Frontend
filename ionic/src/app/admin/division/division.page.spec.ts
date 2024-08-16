import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DivisionPage } from './division.page';

describe('DivisionPage', () => {
  let component: DivisionPage;
  let fixture: ComponentFixture<DivisionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
