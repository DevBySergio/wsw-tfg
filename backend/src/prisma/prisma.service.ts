import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// El decorador @Injectable() marca esta clase para que NestJS
// pueda gestionarla e inyectarla en otros componentes.
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // El método onModuleInit es un "hook" del ciclo de vida de NestJS.
  // Se ejecuta una vez que el módulo ha sido inicializado.
  async onModuleInit() {
    // Aquí nos conectamos explícitamente a la base de datos.
    await this.$connect();
  }

  // onModuleDestroy es otro hook que se ejecuta cuando la aplicación se apaga.
  async onModuleDestroy() {
    // Cerramos la conexión a la base de datos de forma segura.
    await this.$disconnect();
  }
}
