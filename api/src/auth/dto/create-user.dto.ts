import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
   @IsNotEmpty()
   first_name: string;
   @IsNotEmpty()
   last_name: string;
   @IsEmail()
   @IsNotEmpty()
   email: string;
   @IsString()
   @MinLength(8)
   @MaxLength(32)
   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'Password must be longer than 8 characters and containe an uppercase and a number',
   })
   password: string;
   @IsNotEmpty()
   password_confirm: string;
}
