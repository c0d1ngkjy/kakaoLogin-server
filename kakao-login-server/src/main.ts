import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowlist = ['http://127.0.0.1:3000'];
  app.enableCors({
    origin: function (origin, callback) {
      if(!origin || allowlist.indexOf(origin) !== -1) {
        callback(null, true)
      }else{
        callback(new Error('Not allowed by CORS'))
      }
    },
    allowedHeaders: '*',
    methods: "GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS",
    credentials: true
  });
  await app.listen(8000);
}
bootstrap();
