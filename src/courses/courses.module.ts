import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course])], // Ensure Course entity is registered here
  providers: [CoursesService],
  controllers: [CoursesController],
  exports: [CoursesService], // Export CoursesService if needed in other modules
})
export class CoursesModule {}
