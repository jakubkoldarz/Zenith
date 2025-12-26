import { Module } from '@nestjs/common';
import { ProjectmembershipsController } from './projectmemberships/projectmemberships.controller';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [ProjectmembershipsController, TasksController],
  providers: [TasksService]
})
export class TasksModule {}
