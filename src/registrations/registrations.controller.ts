// src/registrations/registrations.controller.ts
import { Controller, Post, Param, Get, Req, UseGuards } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':courseId')
  async register(@Param('courseId') courseId: number, @Req() req) {
    return this.registrationsService.register(req.user.id, courseId);
  }

  @UseGuards(JwtAuthGuard)
@Get('progress')
async getProgress(@Req() req) {
  const registrations = await this.registrationsService.findByUserId(req.user.id);
  // Transform registrations to include course details, progress, etc.
  return registrations.map(registration => ({
    courseName: registration.course.name,
    // Add more fields like progress, grades if available
  }));
}


  @UseGuards(JwtAuthGuard)
  @Get()
  async getProgress(@Req() req) {
    return this.registrationsService.findByUserId(req.user.id);
  }
}
