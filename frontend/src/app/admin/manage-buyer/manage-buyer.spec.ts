import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBuyer } from './manage-buyer';

describe('ManageBuyer', () => {
  let component: ManageBuyer;
  let fixture: ComponentFixture<ManageBuyer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBuyer],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageBuyer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
