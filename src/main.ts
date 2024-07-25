import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { configsSwagger } from './docs';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // validaciones
  app.useGlobalPipes(new ValidationPipe());
  
  // docs
  const document = SwaggerModule.createDocument(app, configsSwagger);
  SwaggerModule.setup('docs', app, document);
  //Cookies
  app.use(cookieParser());
  await app.listen(configService.get<number>('port'));
}
bootstrap();
