import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditworksComponent } from './editworks.component';

describe('EditworksComponent', () => {
  let component: EditworksComponent;
  let fixture: ComponentFixture<EditworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditworksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
