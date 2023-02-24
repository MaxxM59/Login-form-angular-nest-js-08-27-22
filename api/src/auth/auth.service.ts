import {
   BadRequestException,
   ConflictException,
   Get,
   Injectable,
   InternalServerErrorException,
   UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
   constructor(
      @InjectRepository(UserEntity)
      private readonly usersRepository: Repository<UserEntity>,
      private jwtService: JwtService
   ) {}
   /* Create an account */
   async signUp(createUserDto: CreateUserDto): Promise<void> {
      const { email, password, password_confirm, first_name, last_name } = createUserDto;
      // check if password is correctly confirmed
      if (password !== password_confirm) {
         throw new BadRequestException('Password do not match !');
      }
      // Generate a new user, fill email, hashed password and User unique salt associated
      const user = new UserEntity();
      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);
      // Trying to save the user
      try {
         await this.usersRepository.save(user);
      } catch (error) {
         // email already exists
         if (error.code === '23505') {
            throw new ConflictException('This email already exists !');
         }
         // Other errors
         else {
            throw new InternalServerErrorException('There was an error, please try again.');
         }
      }
   }
   /* Login */
   async signIn(authCredentialsDto: AuthCredentialsDto, response: Response): Promise<User> {
      const { email, password } = authCredentialsDto;
      // Find user by email
      const user = await this.findUserByEmail(email);
      // If user exists and the two provided password match after hasing
      if (
         user &&
         (await bcrypt.compare(
            await this.hashPassword(password, user.salt),
            await this.hashPassword(user.password, user.salt)
         ))
      ) {
         // Providing a jwt cookie
         const jwt = await this.jwtService.signAsync({ id: user.id });
         response.cookie('jwt', jwt, {
            httpOnly: true,
            secure: true,
            //
            sameSite: true,
         });
         return null;
      } else {
         throw new UnauthorizedException('Invalid Crendetials');
      }
   }
   /* Password hash*/
   async hashPassword(password: string, salt: string): Promise<string> {
      // NestJS error if not using String()
      return bcrypt.hash(String(password), salt);
   }
   /*Get User by email*/
   async findUserByEmail(email: string) {
      return this.usersRepository.findOne({ where: { email: email } });
   }
   /* Get current authenticated user*/
   async getCurrentUser(request: Request) {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      return await this.findUserByEmail(data.email);
   }
   /* Update password */
   async updatePassword(id: number, data): Promise<any> {
      return await this.usersRepository.update(id, data);
   }
   /*Logout*/
   async logout(response: Response) {
      response.clearCookie('jwt');
      return { message: 'Successfully disconnected !' };
   }
}
