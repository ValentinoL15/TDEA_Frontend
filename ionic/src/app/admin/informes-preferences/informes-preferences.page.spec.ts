import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformesPreferencesPage } from './informes-preferences.page';

describe('InformesPreferencesPage', () => {
  let component: InformesPreferencesPage;
  let fixture: ComponentFixture<InformesPreferencesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesPreferencesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
