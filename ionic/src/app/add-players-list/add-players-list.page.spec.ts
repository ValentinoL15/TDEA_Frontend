import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPlayersListPage } from './add-players-list.page';

describe('AddPlayersListPage', () => {
  let component: AddPlayersListPage;
  let fixture: ComponentFixture<AddPlayersListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
