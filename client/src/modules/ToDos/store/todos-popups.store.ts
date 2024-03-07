import { create } from 'zustand';

interface ToDosPopupsState {
	isOpenToUpdate: boolean;
	isOpenToCreate: boolean;
	setOpenToCreate: (state: boolean) => void;
	setOpenToUpdate: (state: boolean) => void;
}

export const useToDosPopusStore = create<ToDosPopupsState>((set) => ({
	isOpenToUpdate: false,
	isOpenToCreate: false,
	setOpenToCreate: (state: boolean) => {
		console.log('hello');
		set({ isOpenToCreate: state, isOpenToUpdate: false });
	},
	setOpenToUpdate: (state: boolean) => {
		set({ isOpenToUpdate: state, isOpenToCreate: false });
	},
}));
