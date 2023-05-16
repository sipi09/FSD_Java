import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  quiz_type: string = ''
  score: number = 0;
  result: string = "";
  cssclass:string = "";

  /*
  country: string = "";
  cities:string[] = ["New York", "Los Angeles", "Las Vegas", "Seatle", "New Jersey"];
  */

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    if(this.score >= 80) {
      this.result = "passed";
      this.cssclass = "cssgreen";
    } else {
      this.result = "failed";
      this.cssclass = "cssred";
    }
  }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      const quizResult = JSON.parse(params['quizResult']);
      this.quiz_type = quizResult.type;
      this.score = quizResult.score;
      this.result = quizResult.result;
      if(this.score >= 80) {
        this.result = "passed";
        this.cssclass = "cssgreen";
      } else {
        this.result = "failed";
        this.cssclass = "cssred";
      }
      console.log(quizResult);
    });
  }


}
