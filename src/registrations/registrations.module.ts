import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { Registration } from './entities/registration.entity';
import { PaymentsModule } from '../payments/payments.module'; // Import PaymentsModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Registration]),
    PaymentsModule, // Ensure PaymentsModule is imported here
  ],
  providers: [RegistrationsService],
  controllers: [RegistrationsController],
})
export class RegistrationsModule {}
