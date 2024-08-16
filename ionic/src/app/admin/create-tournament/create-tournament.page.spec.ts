import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTournamentPage } from './create-tournament.page';

describe('CreateTournamentPage', () => {
  let component: CreateTournamentPage;
  let fixture: ComponentFixture<CreateTournamentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTournamentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
