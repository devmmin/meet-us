import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
// import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      optionsSuccessStatus: 200,
      origin: [
        'self',
        /localhost\:3000/,
        /((?:http(s)?:\/\/)([\w.-]){1,})?(byeonggi\.synology\.me)/,
      ],
    },
  });

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
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}
bootstrap();
