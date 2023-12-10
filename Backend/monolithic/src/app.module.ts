import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { moduloDeteccion } from './modules/deteccion.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,"..","public"),
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.connectionURL),
    moduloDeteccion
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}