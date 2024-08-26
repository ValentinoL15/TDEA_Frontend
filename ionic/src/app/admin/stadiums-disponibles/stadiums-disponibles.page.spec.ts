import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StadiumsDisponiblesPage } from './stadiums-disponibles.page';

describe('StadiumsDisponiblesPage', () => {
  let component: StadiumsDisponiblesPage;
  let fixture: ComponentFixture<StadiumsDisponiblesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StadiumsDisponiblesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
