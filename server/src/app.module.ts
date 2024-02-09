import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ToDosModule } from './todos/todos.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV}`,
		}),
		PrismaModule,
		AuthModule,
		UsersModule,
		PrismaModule,
		ToDosModule,
	],
})
export class AppModule {}
