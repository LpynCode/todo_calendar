

export const getTasksDeclination = (count: number): string => {
	const remainder = count % 10;
	if(count < 20 && count > 10) {
		return 'событий';
	}
	if(remainder >= 5 || remainder == 0) {
		return 'событий';
	}else if(remainder == 1) {
		return 'событие';
	} else {
		return 'события';
	}
};