import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeTournamentPage } from './home-tournament.page';

describe('HomeTournamentPage', () => {
  let component: HomeTournamentPage;
  let fixture: ComponentFixture<HomeTournamentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTournamentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
