import { Component } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent {

  /*
  users: User[] = [
    new User("Peter","sipo@adf.hu","1234", true),
    new User("Béla","bela@adf.hu","1234", false),
    new User("Krisna","krisna@adf.hu","1234", false),
    new User("Józsi","jozsi@adf.hu","1234", false),
    new User("Eszter","eszter@adf.hu","1234", false),
    // new User(5,"Eszter","eszter@adf.hu","1234", false),
  ];
*/

users: User[] = [];   // this is needed otherwise it will be undefined, which will broke the code when looping in the html part..

  constructor(private http: HttpClient, private userService: UserService) {}

  /* 1-way
  ngOnInit(): void {
    console.log("This fires on the init of the component.");
    this.http
      .get<User[]>('http://localhost:3000/Users')
      .subscribe((users: User[]) => {
        // console.log('res', users);
        this.users = users;
      })
  }
  */

  ngOnInit() {
    this.userService.viewAllUser().subscribe(
      users => {
        this.users = users;
        console.log(this.users);
      },
      error => console.log(error)
    );
  }

}
