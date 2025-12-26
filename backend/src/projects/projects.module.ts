import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [UsersController, ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
