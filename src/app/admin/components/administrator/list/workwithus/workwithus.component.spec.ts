import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkwithusComponent } from './workwithus.component';

describe('WorkwithusComponent', () => {
  let component: WorkwithusComponent;
  let fixture: ComponentFixture<WorkwithusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkwithusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkwithusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
