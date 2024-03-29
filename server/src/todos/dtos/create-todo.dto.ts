import { IsDateString, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { IS_NOT_DATE } from '../todos.constants';

export class CreateToDoDto {
	userId: number;
	@IsString()
	@ValidateIf((object, value) => value !== null)
	name?: string;

	@IsNotEmpty()
	@IsDateString({ strict: true }, { message: IS_NOT_DATE })
	startTime: string;

	@IsNotEmpty()
	@IsDateString({ strict: true }, { message: IS_NOT_DATE })
	endTime: string;
}
