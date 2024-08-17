import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSeasonPage } from './create-season.page';

describe('CreateSeasonPage', () => {
  let component: CreateSeasonPage;
  let fixture: ComponentFixture<CreateSeasonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSeasonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
