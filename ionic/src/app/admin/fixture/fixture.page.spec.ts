import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FixturePage } from './fixture.page';

describe('FixturePage', () => {
  let component: FixturePage;
  let fixture: ComponentFixture<FixturePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FixturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
