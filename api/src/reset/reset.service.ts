import { MailerService } from '@nestjs-modules/mailer';
import {
   BadRequestException,
   forwardRef,
   Inject,
   Injectable,
   NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { ResetEntity } from './models/reset.entity';
import { Reset } from './models/reset.interface';
import { PasswordResetDto } from './dto/password.dto';
@Injectable()
export class ResetService {
   constructor(
      @InjectRepository(ResetEntity)
      private resetRepository: Repository<ResetEntity>,
      private mailerService: MailerService,
      // Circular dependencies service injection
      @Inject(forwardRef(() => AuthService))
      private authService: AuthService
   ) {}

   async createReset(reset: Reset): Promise<Reset> {
      return this.resetRepository.save(reset);
   }
   async forgotPassword(email: string) {
      const token = Math.random().toString(20).substring(2, 12);
      await this.createReset({ email, token });
      // Front end url that will handle password editing
      const url = `http://localhost:4200/reset/${token}`;
      // Send mail with a link
      await this.mailerService.sendMail({
         to: email,
         subject: 'Reset your password',
         html: `Click <a href="${url}">here</a> to reset your password.`,
      });
      return { message: 'Check your emails !' };
   }
   async resetPassword(passwordResetDto: PasswordResetDto) {
      // Destrucutre Dto
      const { token, password, password_confirm } = passwordResetDto;
      // Check if passwords match
      if (password !== password_confirm) {
         throw new BadRequestException('Password do not match !');
      }
      console.log(password, password_confirm, token);
      // Find the reset in the database
      const reset = await this.resetRepository.findOne({ where: { token: token[token] } });
      // So we can get the associated email
      const email = reset.email;
      // Find the user associated to this email in the database
      const user = await this.authService.findUserByEmail(email);

      if (!user) {
         throw new NotFoundException('User not found ! ');
      }
      // Hashing the new password with the uers's salt
      const hashedPassword = await this.authService.hashPassword(password, user.salt);

      await this.authService.updatePassword(user.id, { password: hashedPassword });
      return { message: 'Successfully modified password !', password, password_confirm };
   }
}
