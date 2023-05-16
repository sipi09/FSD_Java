import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {     

  private apiUrl = 'http://localhost:3000/Users';

  constructor(
    private http: HttpClient,
    private router: Router) 
    { }

  fetchUsers(): Observable<User[]> {
    const url = 'http://localhost:3000/Users';
    return this.http.get(url).pipe(
      map((response: any) => response.Users as User[])
    );
  }
  /*
  In the fetchUsers() method, we first create a new instance of the HttpClient 
  using dependency injection. We then use the get() method of the HttpClient 
  to make a GET request to the URL of the JSON file that contains the user data.
  The get() method returns an Observable that represents the response to the 
  HTTP request. We then use the pipe() method to chain an operator 
  to the Observable.
  */

  CheckUserCredetials(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(user => user.email === email && user.password === password);
        if (!user) {
          console.log("NEM ok");
          return false;
        }
        console.log("IGEN ok");
        return true;
      })
    );
  }
  /* 
  In the pipe() method, we chain the map() operator to the Observable. 
  The map() operator takes the response data from the get() method and transforms 
  it into an array of User objects. We do this by calling the map() method 
  on the response data, which is an array of JSON objects. The map() method takes
   a callback function that is called for each element of the array. 
   In the callback function, we create a new instance of the User class 
   for each JSON object in the array. We pass the values of the JSON object's 
   properties to the constructor of the User class to create the new instance. 
   We then return the new instance of the User class from the map() 
   callback function, which creates an array of User objects. 
   Finally, we return the array of User objects from the map() operator, 
   which passes it down the Observable chain.
  */

  CheckUserSession(){
    return sessionStorage.getItem("user")!=null;  // if true, than there is an active session
  }

  logout(){
    sessionStorage.clear();     // this is also on the login page componenent
    this.router.navigate(['/']);
  }

}
