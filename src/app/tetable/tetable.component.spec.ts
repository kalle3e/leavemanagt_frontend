import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TetableComponent } from './tetable.component';

describe('TetableComponent', () => {
  let component: TetableComponent;
  let fixture: ComponentFixture<TetableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TetableComponent]
    });
    fixture = TestBed.createComponent(TetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
