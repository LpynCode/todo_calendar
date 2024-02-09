import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async findOne(email: string) {
		return this.prismaService.userModel.findFirst({ where: { email } });
	}

	async createUser(data: RegisterDto) {
		return this.prismaService.userModel.create({ data });
	}
}
