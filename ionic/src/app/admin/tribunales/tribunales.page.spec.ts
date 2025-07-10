import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TribunalesPage } from './tribunales.page';

describe('TribunalesPage', () => {
  let component: TribunalesPage;
  let fixture: ComponentFixture<TribunalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TribunalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
