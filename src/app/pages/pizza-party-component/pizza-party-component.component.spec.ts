import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaPartyComponentComponent } from './pizza-party-component.component';

describe('PizzaPartyComponentComponent', () => {
  let component: PizzaPartyComponentComponent;
  let fixture: ComponentFixture<PizzaPartyComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaPartyComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaPartyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
