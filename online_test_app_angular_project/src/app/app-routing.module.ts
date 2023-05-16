import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { UsercheckGuard } from './usercheck.guard';
import { QuizformComponent } from './quizform/quizform.component';
import { ResultComponent } from './result/result.component';
import { UserResultsComponent } from './user-results/user-results.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "registered-users", component: RegisteredUsersComponent},

  {path: "welcome", component: WelcomeComponent, canActivate:[UsercheckGuard]},
  {path: "quizform", component: QuizformComponent, canActivate:[UsercheckGuard]},
  {path: "result", component: ResultComponent, canActivate:[UsercheckGuard]},
  {path: "user-results", component: UserResultsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
