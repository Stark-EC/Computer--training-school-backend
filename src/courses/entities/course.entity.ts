// src/courses/entities/course.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number; // Course duration in weeks or days

  @Column({ default: true })
  isActive: boolean; // To allow courses to be marked active/inactive
}
