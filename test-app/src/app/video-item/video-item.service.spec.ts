import { TestBed } from '@angular/core/testing';

import { VideoItemService } from './video-item.service';

describe('VideoItemService', () => {
  let service: VideoItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
