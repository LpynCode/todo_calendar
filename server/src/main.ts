import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const PORT = process.env.PORT;
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');

	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

	app.enableCors({ origin: 'http://localhost:3000' });

	await app.listen(PORT, () => {
		console.log(`SERVER STARTED ON ${PORT} PORT!`);
	});
}
bootstrap();
