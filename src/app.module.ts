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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-crtn95hu0jms73boao0g-a',
      port: 5432,
      username: 'starkec_db_user',
      password: 'JfaRFEF1mdhGF2BrPv4hZsRO3ePPAvxJ',
      database: 'starkec_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    RegistrationsModule,
    AuthModule,

  ],
})
export class AppModule {} 
