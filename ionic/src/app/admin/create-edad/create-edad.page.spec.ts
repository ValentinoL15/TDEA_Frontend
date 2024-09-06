import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEdadPage } from './create-edad.page';

describe('CreateEdadPage', () => {
  let component: CreateEdadPage;
  let fixture: ComponentFixture<CreateEdadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEdadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
