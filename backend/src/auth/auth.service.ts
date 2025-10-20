import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // Inyectamos el PrismaService que creamos antes
  constructor(private prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    // 1. Verificar si el usuario ya existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está en uso.');
    }

    // 2. Hashear la contraseña (¡nunca guardar contraseñas en texto plano!)
    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el "cost" o "salt rounds"

    // 3. Crear el nuevo usuario en la base de datos
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // 4. Devolver el usuario creado (sin la contraseña)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }
}
