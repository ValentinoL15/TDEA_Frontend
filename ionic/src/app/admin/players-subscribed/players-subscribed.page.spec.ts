import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersSubscribedPage } from './players-subscribed.page';

describe('PlayersSubscribedPage', () => {
  let component: PlayersSubscribedPage;
  let fixture: ComponentFixture<PlayersSubscribedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersSubscribedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
