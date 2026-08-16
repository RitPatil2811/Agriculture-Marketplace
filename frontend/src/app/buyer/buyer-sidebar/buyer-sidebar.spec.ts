import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerSidebar } from './buyer-sidebar';

describe('BuyerSidebar', () => {
  let component: BuyerSidebar;
  let fixture: ComponentFixture<BuyerSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(BuyerSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
