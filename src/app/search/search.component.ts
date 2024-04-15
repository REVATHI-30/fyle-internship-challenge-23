import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  searchQuery: string = '';
  showZeroStateMessage: boolean = false;

  constructor(private router: Router, private apiService: ApiService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  searchUser(): void {
    if (this.searchQuery.trim() !== '') {
      this.apiService.getUser(this.searchQuery).subscribe(
        (response: any) => {
          // User found, navigate to the result page with username as parameter
          this.router.navigate(['/result', { username: this.searchQuery }]);
        },
        (error: any) => {
          // User not found, stay on the search page
          this.router.navigate(['/search']);
          this.showZeroStateMessage = true;
        }
      );
    }
  }
}
