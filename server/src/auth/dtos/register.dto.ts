import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';
import { MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from '../auth.constants';

export class RegisterDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@MinLength(6, { message: MIN_LENGTH_PASSWORD })
	@MaxLength(30, { message: MAX_LENGTH_PASSWORD })
	password: string;
}
