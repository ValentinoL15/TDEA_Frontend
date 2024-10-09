import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SedeHorariosPage } from './sede-horarios.page';

describe('SedeHorariosPage', () => {
  let component: SedeHorariosPage;
  let fixture: ComponentFixture<SedeHorariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SedeHorariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
