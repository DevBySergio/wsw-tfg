import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsEmail({}, { message: 'El email proporcionado no es válido.' })
  email: string;

  @Field()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  password: string;
}
