// src/payments/payments.controller.ts
import { Controller, Post, Param, Body, Put } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post(':userId')
  async makePayment(@Param('userId') userId: number, @Body('amount') amount: number) {
    return this.paymentsService.makePayment(userId, amount);
  }

  @Put(':id/complete')
  async markPaymentComplete(@Param('id') paymentId: number) {
    return this.paymentsService.markPaymentComplete(paymentId);
  }
}
