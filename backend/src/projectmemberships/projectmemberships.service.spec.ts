import { Test, TestingModule } from '@nestjs/testing';
import { ProjectmembershipsService } from './projectmemberships.service';

describe('ProjectmembershipsService', () => {
  let service: ProjectmembershipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectmembershipsService],
    }).compile();

    service = module.get<ProjectmembershipsService>(ProjectmembershipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
