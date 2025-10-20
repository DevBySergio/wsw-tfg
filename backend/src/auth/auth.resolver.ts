import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service'; // <- Ruta absoluta
import { RegisterDto } from 'src/auth/dto/register.dto'; // <- Ruta absoluta
import { User } from 'src/users/entities/user.entity'; // <- Ruta absoluta
import { LoginDto } from 'src/auth/dto/login.dto'; // <- Ruta absoluta
import { AuthResponse } from 'src/auth/entities/auth.entity'; // <- Ruta absoluta
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard'; // <- Ruta absoluta
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'; // <- Ruta absoluta

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String, { name: 'healthCheck' })
  healthCheck(): string {
    return 'ok';
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(@Args('loginInput') loginInput: LoginDto) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => User, { name: 'register' })
  register(@Args('registerInput') registerInput: RegisterDto) {
    return this.authService.register(registerInput);
  }

  @Query(() => User, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: User) {
    return user;
  }
}
