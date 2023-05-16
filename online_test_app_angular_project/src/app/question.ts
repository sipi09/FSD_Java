export class Question {
    id: number;
    type: string;
    question: string;
    opt_1: string;
    opt_2: string;
    opt_3: string;
    ans: string;

    constructor(id: number, type: string, question:string, 
        opt_1: string, opt_2: string, opt_3: string, ans: string){
            this.id = id;
            this.type = type;
            this.question = question;
            this.opt_1 = opt_1;
            this.opt_2 = opt_2;
            this.opt_3 = opt_3;
            this.ans = ans;
    }
}