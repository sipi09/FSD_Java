import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Result } from './result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  private apiUrl = 'http://localhost:3000';

  postResult(result: Result): Observable<Result> {
    const url = `${this.apiUrl}/Results`;
    return this.httpClient.post<Result>(url, result);
  }

  viewAllResults(): Observable<Result[]> {
    const url = `${this.apiUrl}/Results`;
    return this.httpClient.get<Result[]>(url);
  }

}
