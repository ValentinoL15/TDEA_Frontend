import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormatPage } from './format.page';

describe('FormatPage', () => {
  let component: FormatPage;
  let fixture: ComponentFixture<FormatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
