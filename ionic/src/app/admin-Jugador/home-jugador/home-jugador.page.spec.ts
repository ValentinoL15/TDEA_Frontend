import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeJugadorPage } from './home-jugador.page';

describe('HomeJugadorPage', () => {
  let component: HomeJugadorPage;
  let fixture: ComponentFixture<HomeJugadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeJugadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
