import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecialOrderComponent } from './add-special-order.component';

describe('AddSpecialOrderComponent', () => {
  let component: AddSpecialOrderComponent;
  let fixture: ComponentFixture<AddSpecialOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSpecialOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSpecialOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
