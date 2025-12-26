import { Module } from '@nestjs/common';
import { ProjectmembershipsController } from './projectmemberships.controller';
import { ProjectmembershipsService } from './projectmemberships.service';

@Module({
  controllers: [ProjectmembershipsController],
  providers: [ProjectmembershipsService]
})
export class ProjectmembershipsModule {}
