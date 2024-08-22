import { DocumentBuilder } from '@nestjs/swagger';

//configuracion de el docs
const configsSwagger = new DocumentBuilder()
  .setTitle('Slow Movies')
  .setDescription('The best web site to buy your tickest and start enjoying with your friends and member family.')
  .setVersion('1.0')
  .addTag('SlowMovies')
  .build();

export { configsSwagger };
