import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserEntity } from './models/user.entity';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth.constants';

@Module({
   imports: [
      TypeOrmModule.forFeature([UserEntity]),
      JwtModule.register({
         secret: jwtConstants.secret,
         signOptions: {
            expiresIn: 3600,
         },
      }),
   ],

   controllers: [AuthController],
   providers: [AuthService],
   exports: [AuthService],
})
export class AuthModule {}
