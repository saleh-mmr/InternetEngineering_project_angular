import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentInvoiceComponent } from './recent-invoice.component';

describe('RecentInvoiceComponent', () => {
  let component: RecentInvoiceComponent;
  let fixture: ComponentFixture<RecentInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
