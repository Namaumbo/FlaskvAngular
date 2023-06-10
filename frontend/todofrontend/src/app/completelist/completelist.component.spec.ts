import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletelistComponent } from './completelist.component';

describe('CompletelistComponent', () => {
  let component: CompletelistComponent;
  let fixture: ComponentFixture<CompletelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletelistComponent]
    });
    fixture = TestBed.createComponent(CompletelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
