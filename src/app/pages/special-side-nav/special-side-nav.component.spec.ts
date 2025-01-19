import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialSideNavComponent } from './special-side-nav.component';

describe('SpecialSideNavComponent', () => {
  let component: SpecialSideNavComponent;
  let fixture: ComponentFixture<SpecialSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialSideNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
