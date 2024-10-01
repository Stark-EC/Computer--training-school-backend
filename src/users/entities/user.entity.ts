import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column({ default: 'pending' })
  status: string;

  @ManyToMany(() => Course, (course) => course.students)
  @JoinTable() // This is important to establish a linking table for many-to-many
  courses: Course[];
}
