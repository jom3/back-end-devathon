import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configsSwagger } from './docs';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();

  //Prefix
  app.setGlobalPrefix('api');

  // validaciones de los DTOs.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // docs
  const document = SwaggerModule.createDocument(app, configsSwagger);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get<number>('port'));
  logger.log(`Server running on port ${configService.get<number>('port')}`);
}
bootstrap();
