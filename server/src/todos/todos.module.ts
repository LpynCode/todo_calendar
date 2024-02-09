import { Module } from '@nestjs/common';
import { ToDosService } from './todos.service';
import { ToDosController } from './todos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	providers: [ToDosService],
	controllers: [ToDosController],
	imports: [PrismaModule, AuthModule],
	exports: [ToDosService],
})
export class ToDosModule {}
