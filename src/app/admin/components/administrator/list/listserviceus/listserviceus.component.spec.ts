import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListserviceusComponent } from './listserviceus.component';

describe('ListserviceusComponent', () => {
  let component: ListserviceusComponent;
  let fixture: ComponentFixture<ListserviceusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListserviceusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListserviceusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
