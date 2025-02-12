import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SedeImagesPage } from './sede-images.page';

describe('SedeImagesPage', () => {
  let component: SedeImagesPage;
  let fixture: ComponentFixture<SedeImagesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SedeImagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
