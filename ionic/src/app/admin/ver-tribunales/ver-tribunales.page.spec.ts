import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerTribunalesPage } from './ver-tribunales.page';

describe('VerTribunalesPage', () => {
  let component: VerTribunalesPage;
  let fixture: ComponentFixture<VerTribunalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTribunalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
