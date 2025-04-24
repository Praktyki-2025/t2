export class User {
    email: string;
    password: string;

    token: string;

    constructor(email: string, password: string, token: string) {
        this.email = email;
        this.password = password;
        this.token = token;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getToken(): string {
        return this.token;
    }
}
