import { TestBed, inject } from '@angular/core/testing';
import { Project2Service } from './project2.service';

describe('Project2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Project2Service]
    });
  });

  it('should be created', inject([Project2Service], (service: Project2Service) => {
    expect(service).toBeTruthy();
  }));
});
