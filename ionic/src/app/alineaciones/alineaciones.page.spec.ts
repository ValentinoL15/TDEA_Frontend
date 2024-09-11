import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlineacionesPage } from './alineaciones.page';

describe('AlineacionesPage', () => {
  let component: AlineacionesPage;
  let fixture: ComponentFixture<AlineacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlineacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
