import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Repository } from '../result/result.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getUser(githubUsername: string): Observable<any> {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }
// This method returns an observable of type Repository[] interface array. So each response/observable is an array object which will have a name for sure but description and topics are optional. 
  getRepos(githubUsername: string,  pageSize: number, pageNumber: number): Observable<Repository[]> {
    return this.httpClient.get<Repository[]>(`https://api.github.com/users/${githubUsername}/repos?page=${pageNumber}&per_page=${pageSize}`).pipe(
      tap(_ => console.log(`Fetched repositories for ${githubUsername}`)),
      catchError(error => {
        console.error('Error fetching repositories:', error);
        return throwError('Failed to fetch repositories');
      })
    );
  }

  getTotalRepoCount(username: string): Observable<number> {
    return this.httpClient.get<any>(`https://api.github.com/users/${username}`).pipe(
      map(user => user.public_repos),
      catchError(error => {
        console.error('Error fetching total repository count:', error);
        return throwError('Failed to fetch total repository count');
      })
    );
  }
  

}


