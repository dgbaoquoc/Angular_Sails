import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyHomepageComponent } from './body-homepage.component';

describe('BodyHomepageComponent', () => {
  let component: BodyHomepageComponent;
  let fixture: ComponentFixture<BodyHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
