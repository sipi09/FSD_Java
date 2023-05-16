export class Result {
    // id: number;              // id is not needed because in the db.json it will be autoincremented
    user_id: number;
    type: string;
    total_questions: number;
    score: number;
    result: string;

    constructor(
        // id: number, 
        user_id: number, type: string, total_questions: number, 
        score: number, result: string){
            // this.id = id;
            this.user_id = user_id;
            this.type = type;
            this.total_questions = total_questions;
            this.score = score;
            this.result = result;
    }
}
