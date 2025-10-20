import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service'; // Ruta absoluta
import { AuthResolver } from 'src/auth/auth.resolver'; // Ruta absoluta
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigModule y ConfigService
import { PassportModule } from '@nestjs/passport'; // Importa PassportModule
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy'; // Ruta absoluta

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Registra Passport
    JwtModule.registerAsync({
      imports: [ConfigModule], // Asegúrate de que ConfigModule esté importado aquí
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' }, // Por ejemplo, 15 minutos para el Access Token
      }),
      inject: [ConfigService],
    }),
    ConfigModule, // Importa ConfigModule si no es global o si necesitas inyectar ConfigService explícitamente
  ],
  providers: [AuthResolver, AuthService, JwtStrategy], // Añade JwtStrategy a los providers
  exports: [JwtStrategy, PassportModule], // Exporta PassportModule para que GqlAuthGuard funcione
})
export class AuthModule {}
