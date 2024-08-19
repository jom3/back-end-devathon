import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CinemasController } from './cinemas.controller';
import { CinemasService } from './cinemas.service';

@Module({
  controllers: [CinemasController],
  providers: [CinemasService, PrismaService],
})
export class CinemasModule {}
