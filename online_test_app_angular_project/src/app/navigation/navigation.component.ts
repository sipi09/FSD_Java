import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(
    private loginService: LoginService,
    private userService: UserService,) 
  {}

is_session_active = this.loginService.CheckUserSession();
is_admin_user: boolean = false;

logout(): void {
  this.loginService.logout();
}

ngOnInit() {
  const email = sessionStorage.getItem('user');
  console.log(email);
  this.userService.isUserAdmin(email).subscribe(isAdmin => {
    if (isAdmin) {
      console.log('User is an admin');
      this.is_admin_user = true;
      // Perform admin-specific tasks
    } else {
      console.log('User is not an admin');
      this.is_admin_user = false;
      // Perform non-admin tasks
    }
  });
}

}
