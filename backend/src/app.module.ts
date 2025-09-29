import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // Importamos nuestro nuevo módulo aquí.
    // Como es un módulo @Global, solo necesitamos hacerlo una vez.
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
