import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getAccessTokenJwtConfig } from 'src/configs/jwt.config';

@Module({
	controllers: [AuthController],
	imports: [
		UsersModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: getAccessTokenJwtConfig,
			inject: [ConfigService],
		}),
	],
	providers: [AuthService],
	exports: [JwtModule],
})
export class AuthModule {}
