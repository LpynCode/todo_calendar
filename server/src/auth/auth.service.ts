import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { ALREADY_REGISTERED_ERROR, LOGIN_ERROR } from './auth.constants';
import { IDisplayUser } from 'src/users/interfaces/display-user.interface';
import { User } from 'src/users/models/user.model';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async login({ email, password }: LoginDto) {
		const user = await this.usersService.findOne(email);
		if (!user) throw new UnauthorizedException(LOGIN_ERROR);
		const comparePasswords = await compare(password, user.password);
		if (!comparePasswords) throw new UnauthorizedException(LOGIN_ERROR);
		const displayUser = new User(user).getDisplay();
		const access_token = await this.generateToken(displayUser);
		return {
			user: displayUser,
			access_token,
		};
	}

	async register(user: RegisterDto) {
		const existedUser = await this.usersService.findOne(user.email);
		if (existedUser) throw new UnauthorizedException(ALREADY_REGISTERED_ERROR);

		const saltRounds = 6;
		const passwordHash = await hash(user.password, saltRounds);

		return this.usersService.createUser({ ...user, password: passwordHash });
	}

	private async generateToken(payload: IDisplayUser) {
		return this.jwtService.signAsync(payload);
	}
}
