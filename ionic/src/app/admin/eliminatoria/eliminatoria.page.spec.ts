import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminatoriaPage } from './eliminatoria.page';

describe('EliminatoriaPage', () => {
  let component: EliminatoriaPage;
  let fixture: ComponentFixture<EliminatoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminatoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
