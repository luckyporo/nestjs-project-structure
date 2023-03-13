/* eslint-disable import/no-extraneous-dependencies */
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastifyPassport from '@fastify/passport';
import fastifySession from '@fastify/session';
import { Logger as NestLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { AppModule } from './app.module';

/**
 * https://docs.nestjs.com
 * https://github.com/nestjs/nest/tree/master/sample
 * https://github.com/nestjs/nest/issues/2249#issuecomment-494734673
 */
async function bootstrap(): Promise<string> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  await app.register(fastifyCookie);
  await app.register(fastifySession, { secret: '753fed217ab14648902c03cbcb88cba2' });
  await app.register(fastifyPassport.initialize());
  await app.register(cors);

  await app.listen(process.env.PORT || 3000);

  return app.getUrl();
}

(async (): Promise<void> => {
  try {
    const url = await bootstrap();
    NestLogger.log(url, 'Bootstrap');
  } catch (error) {
    NestLogger.error(error, 'Bootstrap');
  }
})();
