// // // src/auth/roles.guard.ts
// // import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// // import { Reflector } from '@nestjs/core';
// // import { ROLES_KEY } from './roles.decorator';

// // @Injectable()
// // export class RolesGuard implements CanActivate {
// //   constructor(private reflector: Reflector) {}

// //   canActivate(context: ExecutionContext): boolean {
// //     const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
// //       context.getHandler(),
// //       context.getClass(),
// //     ]);
// //     if (!requiredRoles) {
// //       return true;
// //     }
// //     const { user } = context.switchToHttp().getRequest();
// //     return requiredRoles.some((role) => user.role.includes(role));
// //   }
// // }


// // src/auth/roles.guard.ts
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.get<string[]>('roles', context.getHandler());
//     if (!roles) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
//     return roles.includes(user.role);
//   }
// }


// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the required roles for the route
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // No roles defined, allow access
    }

    // Get the user object from the request, attached by the JwtAuthGuard
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if the user has any of the required roles
    return requiredRoles.some((role) => user.role === role);
  }
}
