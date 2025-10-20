import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Configuración del módulo de GraphQL.
    // Le decimos a NestJS que use Apollo como servidor y que genere
    // automáticamente nuestro archivo de esquema 'schema.gql'.
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),

    // Nuestro módulo global para la conexión con la base de datos.
    PrismaModule,

    // El módulo que contiene toda nuestra lógica de autenticación.
    AuthModule,
  ],
  // Dejamos los controladores y proveedores principales vacíos, ya que
  // nuestra lógica está organizada en módulos de funcionalidades.
  controllers: [],
  providers: [],
})
export class AppModule {}
