import {
   Body,
   ClassSerializerInterceptor,
   Controller,
   Get,
   Post,
   Req,
   Res,
   UseInterceptors,
   ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.interface';
import { Request, Response } from 'express';
import { AuthInterceptor } from './auth.interceptor';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
   constructor(private authService: AuthService) {}
   /*Create account */
   @Post('signup')
   async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
      return this.authService.signUp(createUserDto);
   }
   /*Login*/
   @Post('signin')
   async signIn(
      @Body() authCredentialsDto: AuthCredentialsDto,
      @Res({ passthrough: true }) response: Response
   ): Promise<User> {
      return this.authService.signIn(authCredentialsDto, response);
   }
   /* Get current authenticated user*/
   @UseInterceptors(AuthInterceptor)
   @Get('user')
   async getCurrentUser(@Req() request: Request) {
      return this.authService.getCurrentUser(request);
   }
   /*Logout*/
   @UseInterceptors(AuthInterceptor)
   @Post('logout')
   async logout(@Res({ passthrough: true }) response: Response) {
      return this.authService.logout(response);
   }
}
