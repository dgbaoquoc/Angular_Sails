import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleManagerTestComponent } from './article-manager-test.component';

describe('ArticleManagerTestComponent', () => {
  let component: ArticleManagerTestComponent;
  let fixture: ComponentFixture<ArticleManagerTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleManagerTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleManagerTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
