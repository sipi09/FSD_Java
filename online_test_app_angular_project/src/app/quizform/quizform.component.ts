import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuizService } from '../quiz.service';
import { Question } from '../question';
import { UserService } from '../user.service';
import { User } from '../user';
import { ResultService } from '../result.service';
import { Result } from '../result';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizform',
  templateUrl: './quizform.component.html',
  styleUrls: ['./quizform.component.css']
})
export class QuizformComponent {

  questions: Question[] = [];   // questions: Question[] = [];  // questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedAnswer: string | null = '';
  correctAnswers: number = 0;
  quizResult: any = [];
  options: any = [];

  question: Question | undefined;
  user: User | undefined;

  constructor(
    private http: HttpClient,
    private quizService: QuizService,
    private userService: UserService,
    private resultService: ResultService,
    private router: Router,
    )
  {}

  loadQuestions() {
    this.quizService.getQuizQuestionsByType(this.quizService.getType()).subscribe(
      questions => {
        this.questions = questions;
        console.log(this.questions);
        this.question = questions[this.currentQuestionIndex];
        this.options = [this.question.opt_1, this.question.opt_2, this.question.opt_3, this.question.ans];
      },
      error => console.log(error)
    );
  }
  
  ngOnInit() {
    this.loadQuestions();
    }

  onQuesionSubmit() {

    const currentQuestion = this.question;
    if (this.selectedAnswer === currentQuestion?.ans) {
      this.correctAnswers++;
      // alert("good answer");
    } else {
      // alert("wrong answer");
    }

    // move to next
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.question = this.questions[this.currentQuestionIndex];
      this.options = [this.question.opt_1, this.question.opt_2, this.question.opt_3, this.question.ans];  
      this.selectedAnswer = null;
    } else {
      // show the quiz result

      const email = sessionStorage.getItem('user');
      if (email) {
        this.userService.getUserByEmail(email).subscribe(user => {
          this.user = user;
          this.quizResult.user_id = user.id;
          
          this.quizResult.type = this.question?.type;   // the last question item
          this.quizResult.total_questions = this.questions.length;
          this.quizResult.score = Math.round(this.correctAnswers / this.quizResult.total_questions * 100);
          this.quizResult.result = this.quizResult.score >= 80 ? 'passed' : 'failed';
          
          console.log(this.quizResult);
          
          // create result object
          const result: Result = {
            // id: 2,           // id is not needed because it will be autoincremented in db.json
            user_id: this.quizResult.user_id, // replace with actual user ID
            type: this.quizResult.type,
            total_questions: this.quizResult.total_questions,
            score: this.quizResult.score,
            result: this.quizResult.result,
          };
          
          // save the quiz result to the 
          this.resultService.postResult(result).subscribe(
            result => {
              console.log('Result posted:', result);
            },
            error => {
              console.log('Error posting result:', error);
            }
          );
    
          this.router.navigate(['/result'], { queryParams: { quizResult: JSON.stringify(result) } });

        });
      } else {
        this.quizResult.user_id = 0;
      }

    }

  }

}

