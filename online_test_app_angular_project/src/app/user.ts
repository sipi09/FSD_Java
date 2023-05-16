export class User {
    id: number;
    fullname: string;
    email: string;          // also username
    password: string;
    admin: boolean;

    constructor(id: number, fullname: string, email:string, 
        password:string, admin: boolean){
            this.id = id;
            this.fullname = fullname;
            this.email = email;
            this.password = password;
            this.admin = admin;
    }
}
