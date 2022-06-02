import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditserviceusComponent } from './editserviceus.component';

describe('EditserviceusComponent', () => {
  let component: EditserviceusComponent;
  let fixture: ComponentFixture<EditserviceusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditserviceusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditserviceusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
