import { MONTHS } from '@/constants/months.constants';
import { useCalendarStore } from '@/modules/CalendarWorkspace/store/calendar.store';
import { Listbox } from '@headlessui/react';
import Arrow from '@/icons/arrow.svg';
import btn_styles from '@/UI/Button/Button.module.css';
import styles from './MonthsListBox.module.css';
import Button from '@/UI/Button/Button';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { IMonth } from '@/interfaces/month.interface';

export const MonthsListBox = () => {
	const { calendar:{ month, year }, fetchCalendar } = useCalendarStore();
	const [selectedYear, setSelectedYear] = useState<number>(year);

	useEffect(() => {
		setSelectedYear(year);
	}, [year]);

	const onChange = (month: IMonth) => {
		fetchCalendar(month.number-1, selectedYear);
	};

	const onClickDecrement = () => {
		setSelectedYear( selectedYear + 1);
	};

	const onClickIncrement = () => {
		setSelectedYear( selectedYear - 1);
	};
	return (
		<Listbox value={MONTHS[month.number-1]} as='div' onChange={onChange}>
			<Listbox.Button className={cn(btn_styles.button, styles.list_button)} >
				{month.name} {year}
				<Arrow className={styles.arrow_down}/>
			</Listbox.Button>
			<Listbox.Options className={styles.week_days_container}>
				<div className={styles.week_days_header}>
					<div className={styles.header_title}>{selectedYear}</div>
					<div className={styles.up_down_year_buttons}>
						<Button onClick={onClickIncrement} arrowPosition={'up'}/>
						<Button onClick={onClickDecrement} arrowPosition={'down'}/>
					</div>
				</div>
				<div className={styles.week_days_group}>
					{MONTHS.map((el) => (
						<Listbox.Option key={el.number} as='div' className={styles.week_day} value={el}>
							{el.shortName}
						</Listbox.Option>
					))
					}
				</div>
			</Listbox.Options>
		</Listbox>
	);
};