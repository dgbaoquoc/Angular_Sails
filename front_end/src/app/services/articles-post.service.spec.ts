import { TestBed } from '@angular/core/testing';

import { ArticlesPostService } from './articles-post.service';

describe('ArticlesPostService', () => {
  let service: ArticlesPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
