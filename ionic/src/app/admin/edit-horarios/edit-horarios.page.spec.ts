import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditHorariosPage } from './edit-horarios.page';

describe('EditHorariosPage', () => {
  let component: EditHorariosPage;
  let fixture: ComponentFixture<EditHorariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHorariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
