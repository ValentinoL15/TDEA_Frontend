import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEmpresaPage } from './edit-empresa.page';

describe('EditEmpresaPage', () => {
  let component: EditEmpresaPage;
  let fixture: ComponentFixture<EditEmpresaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmpresaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
