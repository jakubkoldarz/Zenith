import { Test, TestingModule } from '@nestjs/testing';
import { ProjectmembershipsController } from './projectmemberships.controller';

describe('ProjectmembershipsController', () => {
  let controller: ProjectmembershipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectmembershipsController],
    }).compile();

    controller = module.get<ProjectmembershipsController>(ProjectmembershipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
