import { MONTHS } from 'src/constants/months.constants';
import { WEEK_DAYS } from 'src/constants/weeks.constants';
import { IDateTime } from 'src/interfaces/date-time.interface';

export const generateDateTime = (dateStr: Date): IDateTime => {
	const monthIndex = dateStr.getMonth();
	const year = dateStr.getFullYear();
	const day = dateStr.getDate();
	const hours = dateStr.getHours();
	const minutes = dateStr.getMinutes();

	const weekDayIndex = dateStr.getDay() - 1;
	return {
		day,
		weekDay: WEEK_DAYS[weekDayIndex],
		month: MONTHS[monthIndex],
		year,
		hours,
		minutes,
	};
};
