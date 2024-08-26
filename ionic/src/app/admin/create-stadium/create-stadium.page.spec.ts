import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateStadiumPage } from './create-stadium.page';

describe('CreateStadiumPage', () => {
  let component: CreateStadiumPage;
  let fixture: ComponentFixture<CreateStadiumPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStadiumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
