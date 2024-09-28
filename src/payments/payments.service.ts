// src/payments/payments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async makePayment(userId: number, amount: number): Promise<Payment> {
    const payment = this.paymentsRepository.create({ user: { id: userId }, amount });
    return this.paymentsRepository.save(payment);
  }

  async markPaymentComplete(paymentId: number): Promise<void> {
    await this.paymentsRepository.update(paymentId, { status: 'completed' });
  }

  async findPendingPayments(): Promise<Payment[]> {
    return this.paymentsRepository.find({ where: { status: 'pending' } });
  }
}
