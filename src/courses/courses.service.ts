// src/courses/courses.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.coursesRepository.create(createCourseDto);
    return this.coursesRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return this.coursesRepository.find({ where: { isActive: true } });
  }

  async findOne(id: number): Promise<Course> {
    return this.coursesRepository.findOneBy({ id });
  }

  async deactivate(id: number): Promise<void> {
    await this.coursesRepository.update(id, { isActive: false });
  }

  // src/courses/courses.service.ts
async update(id: number, updateCourseDto: CreateCourseDto): Promise<Course> {
  await this.coursesRepository.update(id, updateCourseDto);
  return this.coursesRepository.findOneBy({ id });
}

}
