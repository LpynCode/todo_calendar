import { Dialog } from '@headlessui/react';
import styles from './CreateToDoPopup.module.css';
import { useToDosPopusStore } from '../../store/todos-popups.store';
import { CreateToDoForm } from '../CreateToDoForm/CreateToDoForm';

export const CreateToDoPopup = () => {
	const { isOpenToCreate: isOpen, setOpenToCreate: setIsOpen } = useToDosPopusStore();
	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
			<div className={styles.popup_bg}>
				<Dialog.Panel className={styles.popup}>
					<Dialog.Title>Создать ToDo</Dialog.Title>
					<CreateToDoForm />
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};
