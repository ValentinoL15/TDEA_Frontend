import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSedePage } from './create-sede.page';

describe('CreateSedePage', () => {
  let component: CreateSedePage;
  let fixture: ComponentFixture<CreateSedePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSedePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
