import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class PasswordResetDto {
   @IsString()
   token: string;
   @IsString()
   @MinLength(8)
   @MaxLength(32)
   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'Password must be longer than 8 characters and containe an uppercase and a number',
   })
   password: string;
   @IsString()
   @MinLength(8)
   @MaxLength(32)
   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'Password must be longer than 8 characters and containe an uppercase and a number',
   })
   password_confirm: string;
}
