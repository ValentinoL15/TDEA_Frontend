import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCampeonatoPage } from './create-campeonato.page';

describe('CreateCampeonatoPage', () => {
  let component: CreateCampeonatoPage;
  let fixture: ComponentFixture<CreateCampeonatoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCampeonatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
