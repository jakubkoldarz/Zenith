import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { CategoriesModule } from './categories/categories.module';
import { ProjectmembershipsModule } from './projectmemberships/projectmemberships.module';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    TasksModule,
    CategoriesModule,
    ProjectmembershipsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
