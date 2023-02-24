import { Body, Controller, Post } from '@nestjs/common';
import { PasswordResetDto } from './dto/password.dto';
import { ResetService } from './reset.service';

@Controller()
export class ResetController {
   constructor(private resetService: ResetService) {}
   @Post('forgot')
   async forgot(@Body('email') email: string) {
      return this.resetService.forgotPassword(email);
   }

   @Post('reset')
   async resetPassword(@Body() passwordDto: PasswordResetDto) {
      return this.resetService.resetPassword(passwordDto);
   }
}
