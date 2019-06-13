import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourYearInputComponent } from './four-year-input.component';

describe('FourYearInputComponent', () => {
  let component: FourYearInputComponent;
  let fixture: ComponentFixture<FourYearInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourYearInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourYearInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
