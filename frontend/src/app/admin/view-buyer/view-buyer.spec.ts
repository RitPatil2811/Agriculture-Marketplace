import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBuyer } from './view-buyer';

describe('ViewBuyer', () => {
  let component: ViewBuyer;
  let fixture: ComponentFixture<ViewBuyer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBuyer],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewBuyer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
