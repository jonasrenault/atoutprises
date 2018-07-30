export class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;

    constructor(id: number, email: string) {
      this.id = id;
      this.email = email;
    }
}
