import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogUserComponent } from './dialog-user.component';

describe('MatDialogUserComponent', () => {
  let component: MatDialogUserComponent;
  let fixture: ComponentFixture<MatDialogUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatDialogUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDialogUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
