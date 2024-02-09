import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
	transform(value: any): Date {
		const date = new Date(value);
		if (isNaN(date.getTime())) throw new BadRequestException('Невалидный формат даты!');
		return date;
	}
}
