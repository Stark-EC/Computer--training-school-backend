// // // src/users/users.controller.ts
// // import { Controller, Post, Body, Param, Put, Get, UseGuards } from '@nestjs/common';
// // import { UsersService } from './users.service';
// // import { CreateUserDto } from './dto/create-user.dto';
// // import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// // import { RolesGuard } from 'src/auth/roles.guard';
// // import { Roles } from 'src/auth/roles.decorator';
// // import { User } from './entities/user.entity';
   
// // @Controller('users')
// // export class UsersController {
// //   constructor(private readonly usersService: UsersService) {}

// //   @Post('signup')
// //   async create(@Body() createUserDto: CreateUserDto) {
// //     return this.usersService.create(createUserDto);
// //   }

// //   @UseGuards(JwtAuthGuard, RolesGuard)
// //   @Roles('admin')
// //   @Put(':id/approve')
// //   async approveUser(@Param('id') id: number) {
// //     return this.usersService.approveUser(id);
// //   }


// //   @UseGuards(JwtAuthGuard, RolesGuard)
// //   @Roles('admin')
// //   @Get('pending')
// //   async getPendingUsers() {
// //     return this.usersService.findPendingUsers();
// //   }

// // @Put(':id/approve')
// // @UseGuards(AdminGuard)  // Ensures only admins can access this route
// // async approveUser(@Param('id') id: number): Promise<User> {
// //   return this.usersService.approveUser(id);
// // }
// // }


// // src/users/users.controller.ts
// import { Controller, Post, Body, Param, Put, Get, UseGuards } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { RolesGuard } from 'src/auth/roles.guard';
// import { Roles } from 'src/auth/roles.decorator';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Post('signup')
//   async create(@Body() createUserDto: CreateUserDto) {
//     return this.usersService.create(createUserDto);
//   }

//   //creating admin
//   @Post('create-admin')
//   async createAdmin(@Body() createUserDto: CreateUserDto) {
//     return this.usersService.createAdmin(createUserDto);
//   }
  


//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('admin')
//   @Put(':id/approve')
//   async approveUser(@Param('id') id: number) {
//     return this.usersService.approveUser(id);
//   }

//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('admin')
//   @Get('pending')
//   async getPendingUsers() {
//     return this.usersService.findPendingUsers();
//   }
// }


// src/users/users.controller.ts
import { Controller, Post, Body, Param, Put, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Creating admin user
  @Post('create-admin')
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createAdmin(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id/approve')
  @ApiBearerAuth() // Indicates that the endpoint requires authenticatio
  async approveUser(@Param('id') id: number) {
    return this.usersService.approveUser(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('pending')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'List of pending users.' })
  async getPendingUsers() {
    return this.usersService.findPendingUsers();
  }
}
