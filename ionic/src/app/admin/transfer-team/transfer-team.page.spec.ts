import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferTeamPage } from './transfer-team.page';

describe('TransferTeamPage', () => {
  let component: TransferTeamPage;
  let fixture: ComponentFixture<TransferTeamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferTeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
