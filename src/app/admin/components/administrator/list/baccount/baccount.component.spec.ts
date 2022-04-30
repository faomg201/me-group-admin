import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaccountComponent } from './baccount.component';

describe('BaccountComponent', () => {
  let component: BaccountComponent;
  let fixture: ComponentFixture<BaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
