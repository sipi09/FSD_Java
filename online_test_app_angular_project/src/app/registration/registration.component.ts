import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  fullname: string = "";
  email: string = "";
  password: string = "";
  password_again: string = "";

  msg: string | null = "";
  isFormSubmit: boolean = false;

  /* in angular predefined classes and services, objects has to be creaed
  as constructor arguments */
  constructor(
    private frmBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {}

  isValidFormSubmitted: boolean | null = null;

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const passwordAgain = form.get('password_again')?.value;
  
    // compare passwords and return error object if they don't match
    return password === passwordAgain ? null : { passwordMismatch: true };
  }

  /* FormGroup version /no FormBuilder/
  UserRegForm = new FormGroup({
    fullname: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z]*$')]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password_again: new FormControl('', [Validators.required, Validators.minLength(6)])
  }
  //, { validators: passwordMatchValidator }
  );
  */

  // FormBuilder version
  UserRegForm = this.frmBuilder.group ({
    fullname: this.frmBuilder.control('', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z ]*$')]),   // withou space: '^[a-zA-Z]*$'
    email: this.frmBuilder.control('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
    password: this.frmBuilder.control('', [Validators.required, Validators.minLength(6)]),
    password_again: this.frmBuilder.control('', [Validators.required, Validators.minLength(6)])
  }
  , { validators: this.passwordMatchValidator }
  );

  onFormSubmit() {
    if (this.UserRegForm.invalid) {
      alert("Invalid form");
      this.isValidFormSubmitted = true;
      this.msg = "";
      return;
    } else {


      this.userService.getHighestUserId().subscribe(
        highestId => {
          const nextId = highestId + 1;
      
          const user: User = {
            id: nextId,
            fullname: this.UserRegForm.value.fullname,
            email: this.UserRegForm.value.email,
            password: this.UserRegForm.value.password,
            admin: false,
          };
      
          this.userService.addNewUser(user).subscribe(
            result => {
              console.log('User posted:', result);
            },
            error => {
              console.log('Error posting user:', error);
            }
          );
        },
        error => {
          console.log('Error retrieving highest user ID:', error);
        }
      );

      this.isValidFormSubmitted = false;
      console.log(this.UserRegForm.value);
      alert('Thank you for the registration!\nContinue to login page.');
      this.router.navigate(['/login']);

      /*
      // create result object
      const user: User = {
        // id: 2,           // id is not needed because it will be autoincremented in db.json
        id: this.userService.getHighestUserId(), // replace with NEXT user ID
        fullname: this.UserRegForm.value.fullname,
        email: this.UserRegForm.value.email,
        password: this.UserRegForm.value.password,
        admin: false,
      };
      
      // save the quiz result to the 
      this.userService.addNewUser(user).subscribe(
        result => {
          console.log('User posted:', result);
        },
        error => {
          console.log('Error posting user:', error);
        }
      );

      this.isValidFormSubmitted = false;
      console.log(this.UserRegForm.value);
      alert('Thank you for the registration! \n Continue to login page.');
      this.router.navigate(['/login']);
      */


      /*
      this.msg = this.UserRegForm.value.fullname;
      this.msg += "<br>" + this.UserRegForm.value.email;
      this.msg += "<br>" + this.UserRegForm.value.password;
      this.msg += "<br>" + this.UserRegForm.value.password_again;
      */




    }
  }



  /*
  RegisterUser(frm: any){
    if (frm.invalid){
      this.isFormSubmit = true;
      alert("Invalid form");
    } else {
      this.isFormSubmit = false;
      this.msg = this.UserRegForm.controls['fullname'].value;
      // alternative: this.msg = this.UserRegForm.get('fullname').value;
      // but it has problem with null value, so:
      // if (this.UserRegForm.controls.fullname) {
      //  this.msg += this.UserRegForm.controls.fullname.value + "<br>";
      //  }
      this.msg += "<br>" + this.UserRegForm.controls['email'].value;
      this.msg += "<br>" + this.UserRegForm.controls['password'].value;
      this.msg += "<br>" + this.UserRegForm.controls['password_again'].value;
    }
  }
  */

  /*
  RegisterUser()
  {
    this.msg = "Person name: " + this.fullname;
    this.msg += "<br> email: " + this.email;
    if(this.password == this.password_again) {
      this.msg += "<br> password is correct ";
    } else {
      this.msg += "<br> password is NOT correct!";
    }
  }
  
  constructor(private builder: FormBuilder,
    private userServ: UserService) {}


  UserRegForm = this.builder.group({
    //id: this.builder.control('', [Validators.required]),
    fullname: this.builder.control('', [Validators.required]),
    email: this.builder.control('', [Validators.required]),
    password: this.builder.control('', [Validators.required]),
    admin: this.builder.control('', [Validators.required])
  });
  */

  /*
  addNewUser(){
    this.userServ.addNewUser(this.UserRegForm.value).subscribe(data=>{
      console.log(data);
      this.msg = "New User data is added...";
    });
  }
  */

}
