import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuscribedTeamsPage } from './suscribed-teams.page';

describe('SuscribedTeamsPage', () => {
  let component: SuscribedTeamsPage;
  let fixture: ComponentFixture<SuscribedTeamsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscribedTeamsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
