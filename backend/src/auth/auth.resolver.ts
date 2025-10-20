import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'; // <-- Añade Query
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // ==========================================================
  // AÑADIMOS ESTA QUERY PARA SOLUCIONAR EL ERROR DE ARRANQUE
  // ==========================================================
  @Query(() => String, { name: 'healthCheck' })
  healthCheck(): string {
    return 'ok';
  }
  // ==========================================================

  @Mutation(() => User, { name: 'register' })
  register(@Args('registerInput') registerInput: RegisterDto) {
    return this.authService.register(registerInput);
  }
}
