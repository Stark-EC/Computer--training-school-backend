// // src/courses/courses.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Course } from './entities/course.entity';
// import { CreateCourseDto } from './dto/create-course.dto';

// @Injectable()
// export class CoursesService {
//   constructor(
//     @InjectRepository(Course)
//     private coursesRepository: Repository<Course>,
//   ) {}

//   async create(createCourseDto: CreateCourseDto): Promise<Course> {
//     const course = this.coursesRepository.create(createCourseDto);
//     return this.coursesRepository.save(course);
//   }

//   async findAll(): Promise<Course[]> {
//     return this.coursesRepository.find({ where: { isActive: true } });
//   }

//   async findOne(id: number): Promise<Course> {
//     return this.coursesRepository.findOneBy({ id });
//   }

//   async deactivate(id: number): Promise<void> {
//     await this.coursesRepository.update(id, { isActive: false });
//   }

//   // src/courses/courses.service.ts
// async update(id: number, updateCourseDto: CreateCourseDto): Promise<Course> {
//   await this.coursesRepository.update(id, updateCourseDto);
//   return this.coursesRepository.findOneBy({ id });
// }

// }


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private coursesRepository: Repository<Course>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.coursesRepository.create(createCourseDto); // This is fine if types match
    return this.coursesRepository.save(course);  // You don't need to change this part
  }
  
  async registerStudent(courseId: number, studentId: number): Promise<Course> {
    const course = await this.coursesRepository.findOne({
      where: { id: courseId },
      relations: ['students'],
    });
    
    const student = await this.usersRepository.findOne({ where: { id: studentId } }); // Fix here
  
    if (course && student) {
      course.students.push(student);
      return this.coursesRepository.save(course);
    }
  
    throw new Error('Course or Student not found');
  }
  

  async getCoursesForStudent(studentId: number): Promise<Course[]> {
    const student = await this.usersRepository.findOne({
      where: { id: studentId },
      relations: ['courses'],
    });

    return student?.courses || [];
  }
}
