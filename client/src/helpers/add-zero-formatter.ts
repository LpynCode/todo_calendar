export const addZeroFormatter = (day: number): string => {
	return Math.floor(day/10) > 0 ? day.toString() : '0' + day.toString();
};