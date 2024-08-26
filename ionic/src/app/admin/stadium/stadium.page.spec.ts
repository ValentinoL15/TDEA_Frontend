import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StadiumPage } from './stadium.page';

describe('StadiumPage', () => {
  let component: StadiumPage;
  let fixture: ComponentFixture<StadiumPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StadiumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
