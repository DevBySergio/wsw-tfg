import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// El decorador @Global() hace que este módulo esté disponible en toda la aplicación
// sin necesidad de importarlo en cada módulo que necesite el PrismaService.
@Global()
@Module({
  providers: [PrismaService],
  // Exportamos el PrismaService para que pueda ser inyectado en otros módulos.
  exports: [PrismaService],
})
export class PrismaModule {}
