export class User {
    id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    facebook_id: number;
    score: number;
    tops: number;
    max_grade: string;

    constructor(id: string, email: string) {
      this.id = id;
      this.email = email;
    }
}

export class TopStats {
  [grade: string]: {
    total: number,
    count: number
  }
}
