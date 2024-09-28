// // // src/users/users.service.ts
// // import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
// // import { InjectRepository } from '@nestjs/typeorm';
// // import { Repository } from 'typeorm';
// // import { User } from './entities/user.entity';
// // import * as bcrypt from 'bcryptjs';
// // import { CreateUserDto } from './dto/create-user.dto';

// // @Injectable()
// // export class UsersService {
// //   constructor(
// //     @InjectRepository(User)
// //     private usersRepository: Repository<User>,
// //   ) {}

// //   export class AdminGuard implements CanActivate {
// //     canActivate(context: ExecutionContext): boolean {
// //       const request = context.switchToHttp().getRequest();
// //       const user = request.user;  // Assume user is attached to request after JWT validation
// //       return user && user.role === 'admin';
// //     }
// //   }

// //   async create(createUserDto: CreateUserDto): Promise<User> {
// //     const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
// //     const user = this.usersRepository.create({
// //       ...createUserDto,
// //       password: hashedPassword,
// //     });
// //     return this.usersRepository.save(user);
// //   }

// //   async findOneByEmail(email: string): Promise<User | undefined> {
// //     return this.usersRepository.findOne({ where: { email } });
// //   }

// //   // async approveUser(userId: number): Promise<void> {
// //   //   await this.usersRepository.update(userId, { status: 'approved' });
// //   // }

// //   async approveUser(userId: number): Promise<User> {
// //     const user = await this.usersRepository.findOne(userId);
// //     if (!user) {
// //       throw new NotFoundException('User not found');
// //     }
  
// //     user.status = 'approved';
// //     return this.usersRepository.save(user);
// //   }
  

// //   async findPendingUsers(): Promise<User[]> {
// //     return this.usersRepository.find({ where: { status: 'pending' } });
// //   }
// // }


// // src/users/users.service.ts
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './entities/user.entity';
// import * as bcrypt from 'bcryptjs';
// import { CreateUserDto } from './dto/create-user.dto';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}

//   async create(createUserDto: CreateUserDto): Promise<User> {
//     const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
//     const user = this.usersRepository.create({
//       ...createUserDto,
//       password: hashedPassword,
//     });
//     return this.usersRepository.save(user);
//   }

//   //Creating admin
//   async createAdmin(createUserDto: CreateUserDto): Promise<User> {
//     const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
//     const admin = this.usersRepository.create({
//       ...createUserDto,
//       password: hashedPassword,
//       role: 'admin',  // Assign 'admin' role
//       status: 'approved',  // Set the status to 'approved' by default for admins
//     });
//     return this.usersRepository.save(admin);
//   }
  
  

//   async approveUser(userId: number): Promise<User> {
//     const user = await this.usersRepository.findOne({ where: { id: userId } });
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     user.status = 'approved';
//     return this.usersRepository.save(user);
//   }

//   async findPendingUsers(): Promise<User[]> {
//     return this.usersRepository.find({ where: { status: 'pending' } });
//   }

//   async findOneByEmail(email: string): Promise<User | undefined> {
//     return this.usersRepository.findOne({ where: { email } });
//   }  
  
// }


// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  // Creating admin user
  async createAdmin(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const admin = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: 'admin',  // Assign 'admin' role
      status: 'approved',  // Set the status to 'approved' by default for admins
    });
    return this.usersRepository.save(admin);
  }

  async approveUser(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.status = 'approved';
    return this.usersRepository.save(user);
  }

  async findPendingUsers(): Promise<User[]> {
    return this.usersRepository.find({ where: { status: 'pending' } });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }  
}
