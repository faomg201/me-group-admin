import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmyblogComponent } from './listmyblog.component';

describe('ListmyblogComponent', () => {
  let component: ListmyblogComponent;
  let fixture: ComponentFixture<ListmyblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListmyblogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmyblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
