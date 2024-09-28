// src/users/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: 'student' }) // 'admin' or 'student'
  role: string;

  @Column({ default: 'pending' })  // Set a default status
  status: string;  // Add the status property
  // Add other fields as necessary
}
