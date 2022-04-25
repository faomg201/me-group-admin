import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddteamsComponent } from './addteams.component';

describe('AddteamsComponent', () => {
  let component: AddteamsComponent;
  let fixture: ComponentFixture<AddteamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddteamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddteamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
