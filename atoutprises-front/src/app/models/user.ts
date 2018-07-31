export class User {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    facebook_id: number;
    score: number;
    tops: number;
    max_grade: string;

    constructor(id: number, email: string) {
      this.id = id;
      this.email = email;
    }
}
