import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFarmer } from './manage-farmer';

describe('ManageFarmer', () => {
  let component: ManageFarmer;
  let fixture: ComponentFixture<ManageFarmer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFarmer],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageFarmer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
