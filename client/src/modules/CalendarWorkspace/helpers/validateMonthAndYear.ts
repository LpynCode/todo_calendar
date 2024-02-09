

export const validateMonthAndYear = (monthIndex: number, year: number): [number, number] => {
	if(monthIndex == -1) {
		monthIndex = 11;
		year--;
	}
	if(monthIndex == 12) {
		monthIndex = 0;
		year++;
	}
	return [monthIndex, year];
};