import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

user: User | undefined;
quiz_selected: string = "";

constructor(
  private userService: UserService,
  private quizService: QuizService,
  private router: Router
) {}

ngOnInit() {
  const email = sessionStorage.getItem('user');
  if (email){
    this.userService.getUserByEmail(email).subscribe(user => {
      this.user = user;
      // console.log(this.user);
    });
  } else {
    // console.log("no user");
  }
}

QuizStart(frm:any) {
  alert('start quiz: ' + this.quiz_selected + '\n\nPrepare to start the quiz..');
  this.quizService.setType(this.quiz_selected);
  this.router.navigate(['/quizform']);
}
/*
ngOnInit() {
  this.userServive.getUserByEmail(sessionStorage.getItem('user')).subscribe(
    user => {
      this.user = user;
      console.log(this.user);
    },
    error => console.log(error)
  );
}
*/

/*
ngOnInit() {
  this.userService.viewAllUser().subscribe(
    users => {
      this.users = users;
      console.log(this.users);
    },
    error => console.log(error)
  );
}
*/

}
