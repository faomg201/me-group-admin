import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcontractusComponent } from './listcontractus.component';

describe('ListcontractusComponent', () => {
  let component: ListcontractusComponent;
  let fixture: ComponentFixture<ListcontractusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcontractusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcontractusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
