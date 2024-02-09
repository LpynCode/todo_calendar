import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UNAUTHORIZED } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();

		try {
			const authHeader = req.headers.authorization;
			const token = authHeader.split(' ')[1];
			const user = await this.jwtService.verifyAsync(token);
			req.user = user;
			return true;
		} catch (e) {
			throw new UnauthorizedException(UNAUTHORIZED);
		}
	}
}
