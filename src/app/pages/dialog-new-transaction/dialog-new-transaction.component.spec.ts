import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewTransactionComponent } from './dialog-new-transaction.component';

describe('DialogNewTransactionComponent', () => {
  let component: DialogNewTransactionComponent;
  let fixture: ComponentFixture<DialogNewTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
