import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagerTestComponent } from './user-manager-test.component';

describe('UserManagerTestComponent', () => {
  let component: UserManagerTestComponent;
  let fixture: ComponentFixture<UserManagerTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagerTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagerTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
