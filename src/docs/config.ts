import { DocumentBuilder } from '@nestjs/swagger';

//configuracion de el docs
const configsSwagger = new DocumentBuilder()
  .setTitle('Movie Service')
  .setDescription('The Movie Service API description')
  .setVersion('1.0')
  .addTag('Movies')
  .build();

export { configsSwagger };
