import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDivisionPage } from './create-division.page';

describe('CreateDivisionPage', () => {
  let component: CreateDivisionPage;
  let fixture: ComponentFixture<CreateDivisionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDivisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
