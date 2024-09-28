// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { PaymentsModule } from './payments/payments.module';
import { User } from './users/entities/user.entity';
import { Course } from './courses/entities/course.entity';
import { Registration } from './registrations/entities/registration.entity';
import { Payment } from './payments/entities/payment.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'password',
    //   database: 'training_school',
    //   entities: [User],
    //   synchronize: true,
    // }),
    UsersModule,
    AuthModule,
    CoursesModule,
    RegistrationsModule,
    AuthModule,

  ],
})
export class AppModule {} 
