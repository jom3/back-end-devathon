import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { configsSwagger } from './docs';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // validaciones
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  
  // docs
  const document = SwaggerModule.createDocument(app, configsSwagger);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get<number>('port'));
  logger.log(`Server running on port ${configService.get<number>('port')}`);
}
bootstrap();
