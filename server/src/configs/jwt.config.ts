import { ConfigService } from '@nestjs/config';

export const getAccessTokenJwtConfig = async (configService: ConfigService) => ({
	signOptions: {
		expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
	},
	secret: configService.get<string>('JWT_SECRET'),
});
