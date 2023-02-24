import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
   @IsString()
   @MinLength(4)
   @MaxLength(20)
   email: string;

   @IsString()
   @MinLength(8)
   @MaxLength(32)
   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'Password must be longer than 8 characters and containe an uppercase and a number',
   })
   password: string;
}
