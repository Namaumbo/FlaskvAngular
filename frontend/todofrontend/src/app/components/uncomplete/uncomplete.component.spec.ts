import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UncompleteComponent } from './uncomplete.component';

describe('UncompleteComponent', () => {
  let component: UncompleteComponent;
  let fixture: ComponentFixture<UncompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UncompleteComponent]
    });
    fixture = TestBed.createComponent(UncompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
