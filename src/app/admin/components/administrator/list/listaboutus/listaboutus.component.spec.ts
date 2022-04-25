import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaboutusComponent } from './listaboutus.component';

describe('ListaboutusComponent', () => {
  let component: ListaboutusComponent;
  let fixture: ComponentFixture<ListaboutusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaboutusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
