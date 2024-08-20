import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateListPage } from './create-list.page';

describe('CreateListPage', () => {
  let component: CreateListPage;
  let fixture: ComponentFixture<CreateListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
