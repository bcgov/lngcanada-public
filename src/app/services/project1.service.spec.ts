import { TestBed, inject } from '@angular/core/testing';
import { Project1Service } from './project1.service';

describe('Project1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Project1Service]
    });
  });

  it('should be created', inject([Project1Service], (service: Project1Service) => {
    expect(service).toBeTruthy();
  }));
});
