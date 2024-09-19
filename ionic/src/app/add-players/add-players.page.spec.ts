import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPlayersPage } from './add-players.page';

describe('AddPlayersPage', () => {
  let component: AddPlayersPage;
  let fixture: ComponentFixture<AddPlayersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
