import { generateCommonDate } from '@/helpers/generate-common-date';
import { IDateTime } from '@/interfaces/date-time.interface';
import { intervalToDuration } from 'date-fns';

export const timeDiff = (startTime: IDateTime, endTime: IDateTime) => {
	const start = generateCommonDate(startTime);
	const end = generateCommonDate(endTime);
	const { days, hours, minutes } = intervalToDuration({ start, end });

	if (days > 0) {
		return `${days}дн ${hours || 0}ч`;
	} else if (hours > 0) {
		return `${hours}ч ${minutes || 0}мин`;
	}
	return `${minutes}мин`;
};
