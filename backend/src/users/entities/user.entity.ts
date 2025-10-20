import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  // ¡IMPORTANTE! No incluimos el campo 'password' aquí para nunca exponerlo.

  @Field(() => Float)
  balance: number;

  @Field()
  createdAt: Date;
}
