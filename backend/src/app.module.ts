import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from 'src/prisma/prisma.module'; // Ruta absoluta
import { AuthModule } from 'src/auth/auth.module'; // Ruta absoluta
import { ConfigModule } from '@nestjs/config'; // Importa ConfigModule

@Module({
  imports: [
    // Importa y configura ConfigModule para que sea global
    ConfigModule.forRoot({ isGlobal: true }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PrismaModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
