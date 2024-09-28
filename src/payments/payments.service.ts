// // src/payments/payments.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Payment } from './entities/payment.entity';

// @Injectable()
// export class PaymentsService {
//   constructor(
//     @InjectRepository(Payment)
//     private paymentsRepository: Repository<Payment>,
//   ) {}

//   async makePayment(userId: number, amount: number): Promise<Payment> {
//     const payment = this.paymentsRepository.create({ user: { id: userId }, amount });
//     return this.paymentsRepository.save(payment);
//   }

//   async markPaymentComplete(paymentId: number): Promise<void> {
//     await this.paymentsRepository.update(paymentId, { status: 'completed' });
//     const payment = await this.paymentsService.findPendingPayments(userId);
// if (!payment || payment.length === 0 || payment[0].status !== 'completed') {
//   // Handle the case when payment is not completed
// }

//   }

//  // payments.service.ts
// async findPendingPayments(userId: number): Promise<Payment[]> {
//   return this.paymentsRepository.find({
//     where: {
//       userId, 
//       status: 'pending',
//     },
//   });
// }

// }


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
    const payment = this.paymentsRepository.create({ user: { id: userId }, amount, status: 'pending' });
    return this.paymentsRepository.save(payment);
  }

  async markPaymentComplete(paymentId: number): Promise<void> {
    // Update the payment status to completed
    await this.paymentsRepository.update(paymentId, { status: 'completed' });
  }

  async findPendingPayments(userId: number): Promise<Payment[]> {
    return this.paymentsRepository.find({
      where: { userId, status: 'pending' },
    });
  }
}
