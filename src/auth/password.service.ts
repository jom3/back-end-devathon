import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class PasswordService {
  generateRandomPassword(length: number): string {
    const password = randomBytes(length)
      .toString('base64') // Codifica en base64
      .slice(0, length); // Corta el resultado para obtener la longitud deseada

    return password;
  }
}
