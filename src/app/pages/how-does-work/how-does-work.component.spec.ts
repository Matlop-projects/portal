import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowDoesWorkComponent } from './how-does-work.component';

describe('HowDoesWorkComponent', () => {
  let component: HowDoesWorkComponent;
  let fixture: ComponentFixture<HowDoesWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowDoesWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowDoesWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
