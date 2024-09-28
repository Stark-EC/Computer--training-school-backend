// src/registrations/registrations.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from './entities/registration.entity';
import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private registrationsRepository: Repository<Registration>,
    private paymentsService: PaymentsService,
  ) {}

  async register(userId: number, courseId: number): Promise<Registration> {
    const payment = await this.paymentsService.findPendingPayment(userId);
    if (!payment || payment.status !== 'completed') {
      throw new ForbiddenException('You must complete payment before registering for courses.');
    }

    const registration = this.registrationsRepository.create({ user: { id: userId }, course: { id: courseId } });
    return this.registrationsRepository.save(registration);
  }
}
