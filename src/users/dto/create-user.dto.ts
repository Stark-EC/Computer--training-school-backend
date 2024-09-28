// src/users/dto/create-user.dto.ts
export class CreateUserDto {
    readonly email: string;
    readonly password: string;
    readonly role?: string;
  }
  