import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditteamsComponent } from './editteams.component';

describe('EditteamsComponent', () => {
  let component: EditteamsComponent;
  let fixture: ComponentFixture<EditteamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditteamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditteamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
