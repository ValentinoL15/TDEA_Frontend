import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDayPage } from './create-day.page';

describe('CreateDayPage', () => {
  let component: CreateDayPage;
  let fixture: ComponentFixture<CreateDayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
