import { IsDateString, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { INCORRECT_ID, IS_NOT_DATE } from '../todos.constants';

export class UpdateToDoDto {
	@IsNumber({}, { message: INCORRECT_ID })
	id: number;

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
