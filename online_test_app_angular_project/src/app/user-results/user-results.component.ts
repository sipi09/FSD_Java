import { Component } from '@angular/core';
import { Result } from '../result';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-user-results',
  templateUrl: './user-results.component.html',
  styleUrls: ['./user-results.component.css']
})
export class UserResultsComponent {
 
  results: Result[] = []; 

  constructor(
    private resultService: ResultService,
  ) 
  {}

  ngOnInit() {
    this.resultService.viewAllResults().subscribe(
      users => {
        this.results = users;
        console.log(this.results);
      },
      error => console.log(error)
    );
  }

}
