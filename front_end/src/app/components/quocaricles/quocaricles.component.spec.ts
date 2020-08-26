import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuocariclesComponent } from './quocaricles.component';

describe('QuocariclesComponent', () => {
  let component: QuocariclesComponent;
  let fixture: ComponentFixture<QuocariclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuocariclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuocariclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
