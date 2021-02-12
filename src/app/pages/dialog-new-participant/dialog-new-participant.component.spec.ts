import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewParticipantComponent } from './dialog-new-participant.component';

describe('DialogNewParticipantComponent', () => {
  let component: DialogNewParticipantComponent;
  let fixture: ComponentFixture<DialogNewParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
