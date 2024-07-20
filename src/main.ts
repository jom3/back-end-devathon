import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { configsSwagger } from './docs';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const document = SwaggerModule.createDocument(app, configsSwagger);
  
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get<number>('port'));
}
bootstrap();
