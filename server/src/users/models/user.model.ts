import { UserModel } from '@prisma/client';

export class User {
	private id: number;
	private email: string;
	private password: string;
	constructor({ id, email, password }: UserModel) {
		this.id = id;
		this.email = email;
		this.password = password;
	}

	getDisplay() {
		return { id: this.id, email: this.email };
	}
}
