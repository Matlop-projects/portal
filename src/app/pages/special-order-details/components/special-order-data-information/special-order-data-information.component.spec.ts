import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialOrderDataInformationComponent } from './special-order-data-information.component';

describe('SpecialOrderDataInformationComponent', () => {
  let component: SpecialOrderDataInformationComponent;
  let fixture: ComponentFixture<SpecialOrderDataInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialOrderDataInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialOrderDataInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
