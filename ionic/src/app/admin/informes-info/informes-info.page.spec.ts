import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformesInfoPage } from './informes-info.page';

describe('InformesInfoPage', () => {
  let component: InformesInfoPage;
  let fixture: ComponentFixture<InformesInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
