import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreatePostsComponent } from './modal-create-posts.component';

describe('ModalCreatePostsComponent', () => {
  let component: ModalCreatePostsComponent;
  let fixture: ComponentFixture<ModalCreatePostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreatePostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreatePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
