import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = "";
  password: string = "";

  isValidUser: boolean = false;

  msg: string = "";

  constructor(
    private logService: LoginService,
    private router: Router      // for programatic navigation
  ) {

    sessionStorage.clear();   // when the constructor is executing, the session is cleared

  }

  /*
  CheckLoginDetails(frm:any)  // frm: form
  {
    if (frm.invalid) {
      alert('Form is invalid');
    } else {
      // if (this.email=='sipoczpeti@gmail.com' && this.password=='12345'){
      if(this.logService.CheckUserCredetials(this.email, this.password) == true)
        //this.msg = "Successful login";
        this.router.navigate(['/welcome']);
       else
        this.msg="Invalid username/password.";
      
    }
  }
  */
 
  CheckLoginDetails(frm:any)  // frm: form
  {
    if (frm.invalid) {
      alert('Form is invalid');
      } 
      else {
        this.logService.CheckUserCredetials(this.email, this.password)
          .subscribe((is_valid: boolean) =>{
            if(is_valid) {
              sessionStorage.setItem("user", this.email)
              this.router.navigate(['/welcome']);
            }
            else {
              this.msg="Invalid username/password.";
            }
          })
      }



      /*
      else {
        this.logService.CheckUserCredetials(this.email, this.password)
          .subscribe(isValid => {
          this.isValidUser = isValid;
      if(isValid) {
        //this.msg = "Successful login";
        this.router.navigate(['/welcome']);
      } else {
        this.msg="Invalid username/password.";
      }
      });
    }
    */

  }
}
