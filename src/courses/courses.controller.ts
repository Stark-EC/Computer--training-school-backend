// src/courses/courses.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('create')
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  async findAll() {
    return this.coursesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id/deactivate')
  async deactivate(@Param('id') id: number) {
    return this.
    coursesService.deactivate(id);
  }

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Put(':id')
async update(@Param('id') id: number, @Body() updateCourseDto: CreateCourseDto) {
  return this.coursesService.update(id, updateCourseDto);
}

}
