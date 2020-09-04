import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageTestComponent } from './homepage-test.component';

describe('HomepageTestComponent', () => {
  let component: HomepageTestComponent;
  let fixture: ComponentFixture<HomepageTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
