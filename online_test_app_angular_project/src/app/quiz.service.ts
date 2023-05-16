import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private type: string = '';

  setType(type: string) {
    this.type = type;
  }

  getType(): string {
    return this.type;
  }

  constructor(private httpClient: HttpClient) 
  { }

  private apiUrl = 'http://localhost:3000/Questions';

  getQuizQuestionsByType(type: string): Observable<Question[]>{
    const apiUrl = `${this.apiUrl}?type=${type}`;
    return this.httpClient.get<Question[]>(apiUrl);
  }

}

