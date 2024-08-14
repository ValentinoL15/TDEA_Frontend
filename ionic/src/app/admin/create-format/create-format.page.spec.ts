import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFormatPage } from './create-format.page';

describe('CreateFormatPage', () => {
  let component: CreateFormatPage;
  let fixture: ComponentFixture<CreateFormatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
