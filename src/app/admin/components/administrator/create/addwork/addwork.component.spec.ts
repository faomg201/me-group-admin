import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddworkComponent } from './addwork.component';

describe('AddworkComponent', () => {
  let component: AddworkComponent;
  let fixture: ComponentFixture<AddworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
