import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormatsImagesPage } from './formats-images.page';

describe('FormatsImagesPage', () => {
  let component: FormatsImagesPage;
  let fixture: ComponentFixture<FormatsImagesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatsImagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
