import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable, take, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = "http://localhost:3000/Users";

  addNewUser(user: User): Observable<Object>{
    return this.httpClient.post(`${this.apiUrl}`, user);
  }

  viewAllUser(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.apiUrl}`);
  }

  getHighestUserId(): Observable<number> {
    return this.httpClient.get<User[]>(this.apiUrl).pipe(
      map(users => {
        const userIds = users.map(user => user.id);
        return Math.max(...userIds);
      })
    );
  }

  /*
  getUserByEmail(email: string): Observable<User> {
    const url = `${this.apiUrl}?email=${email}`;
    return this.httpClient.get<User>(url);
  }
  */
 
  getUserByEmail(email: string): Observable<User> {
    const url = `${this.apiUrl}?email=${email}`;
    return this.httpClient.get<User[]>(url).pipe(
      take(1),
      map(users => users[0])
    );
  }

  isUserAdmin(email: string | null): Observable<boolean> {
    return this.httpClient.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map((users: User[]) => {
        if (users.length > 0) {
          const user = users[0];
          return user.admin == true;
        }
        return false;
      })
    );
  }

}