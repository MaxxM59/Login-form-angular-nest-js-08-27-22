import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ResetModule } from './reset/reset.module';
import appConfig from './config/app.config';

@Module({
   imports: [
      AuthModule,
      ConfigModule.forRoot({ load: [appConfig] }),
      TypeOrmModule.forRootAsync({
         useFactory: () => ({
            type: 'postgres',
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: true,
            synchronize: true,
         }),
      }),
      ResetModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
