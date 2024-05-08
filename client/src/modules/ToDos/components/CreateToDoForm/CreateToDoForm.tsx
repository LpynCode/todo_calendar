import { Input } from '@/UI/Input/Input';
import { ICreateToDoForm } from '../../types/create-todo-form.interface';
import { useForm } from 'react-hook-form';
import PencilIcon from '@/icons/pencil.svg';

import styles from './CreateToDoForm.module.css';
import Button from '@/UI/Button/Button';
import { IToDo } from '@/interfaces/todo.interface';
import { generateDateTime } from '@/helpers/generate-date';
import { useToDosStore } from '@/modules/ToDos/store/todos.store';
import { useToDosPopusStore } from '@/modules/ToDos/store/todos-popups.store';
export const CreateToDoForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ICreateToDoForm>();

	const { createToDo } = useToDosStore();
	const { setOpenToCreate } = useToDosPopusStore();

	const onSubmit = (data: ICreateToDoForm) => {
		const prepairedData: Omit<IToDo, 'id'> = {
			name: data.name,
			startTime: generateDateTime(new Date(data.startDate + 'T' + data.startTime)),
			endTime: generateDateTime(new Date(data.endDate + 'T' + data.endTime)),
		};
		createToDo(prepairedData);
		setOpenToCreate(false);
	};
	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Input
				icon={<PencilIcon />}
				labelName="Имя"
				placeholder="Введите имя todo"
				aria-invalid={!!errors.name}
				error={errors.name}
				{...register('name', { required: 'Поле обязательно для заполнения' })}
				autoFocus
			/>
			<div className={styles.time_block}>
				<Input
					labelName="Дата начала"
					aria-invalid={!!errors.startDate}
					error={errors.startDate}
					type="date"
					{...register('startDate', { required: 'Поле обязательно для заполнения' })}
				/>
				<Input
					labelName="Время начала"
					aria-invalid={!!errors.startTime}
					error={errors.startTime}
					type="time"
					{...register('startTime', { required: 'Поле обязательно для заполнения' })}
				/>
			</div>
			<div className={styles.time_block}>
				<Input
					labelName="Дата окончания"
					aria-invalid={!!errors.endDate}
					error={errors.endDate}
					type="date"
					{...register('endDate', { required: 'Поле обязательно для заполнения' })}
				/>
				<Input
					labelName="Время окончания"
					aria-invalid={!!errors.endTime}
					error={errors.endTime}
					type="time"
					{...register('endTime', { required: 'Поле обязательно для заполнения' })}
				/>
			</div>

			<Button type="submit">Создать</Button>
		</form>
	);
};
