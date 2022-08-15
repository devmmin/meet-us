import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from 'src/config/swagger';
import { setPrisma } from '@config/prisma';
import { NestExpressApplication } from '@nestjs/platform-express';

// import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      credentials: true,
      optionsSuccessStatus: 200,
      origin: [
        'http://localhost:3000',
        /((?:http(s)?:\/\/)([\w.-])+)?(apollographql\.com)/,
        /localhost/,
        /((?:http(s)?:\/\/)([\w.-])+)?(byeonggi\.synology\.me)/,
        'https://studio.apollographql.com',
      ],
    },
  });
  setupSwagger(app);
  // app.use(
  //   helmet({
  //     contentSecurityPolicy: {
  //       useDefaults: false,
  //       directives: {
  //         'default-src': [
  //           "'self'",
  //           "'unsafe-inline'",
  //           '*.cdn.apollographql.com',
  //           '*.googleapis.com',
  //           '*.gstatic.com',
  //         ],
  //       },
  //     },
  //     crossOriginEmbedderPolicy: false,
  //   }),
  // );
  app.use(cookieParser());
  // app.use(
  //   csurf({
  //     cookie: true,
  //     httpOnly: true,
  //     maxAge: 3600,
  //     key: '_csrf',
  //     path: '/',
  //   }),
  // );
  await setPrisma(app);
  await app.listen(3000);
}
bootstrap();
