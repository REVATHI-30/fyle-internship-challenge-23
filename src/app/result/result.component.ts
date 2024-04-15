import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

export interface Repository {
  name: string;
  description?: string;
  topics?: string[]
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {
  username: string = ''; 
  bio: string = ''; 
  location: string = ''; 
  socialLink: string = ''; 
  githubUrl: string = ''; 
  repositories: Repository[] = []; 
  pageSize: number = 10;
  pageNumbers: number[] = [];
  currentPage: number = 1;
  totalRepositories: any;
  totalCount: any;
  avatarUrl: any;
 

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }


  ngOnInit(): void {
    // Get the username from the route parameter
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      // Fetch user details including total number of repositories
      this.apiService.getUser(username).subscribe((user: any) => {
        // Updating user details 
        this.username = user.login;
        this.bio = user.bio;
        this.location = user.location;
        this.socialLink = user.twitter_username ? `https://twitter.com/${user.twitter_username}` : '';
        this.githubUrl = user.html_url;
        this.avatarUrl = user.avatar_url; 
  
        // Get the total number of repositories for the user
        this.apiService.getTotalRepoCount(username).subscribe(totalCount => {
          // Calculate total number of pages based on page size
          const totalPages = Math.ceil(totalCount / this.pageSize);
          // Fetch repositories for the first page
          this.apiService.getRepos(username, this.pageSize, this.currentPage).subscribe((repos: Repository[]) => {
            this.repositories = repos;
            // console.log(this.repositories.length, "Changing according to pagesize value")
            this.updatePageNumbers();
            
          });
        });
      });
    }
  }
  

  fetchRepositories(username: string, pageNumber: number): void {
    this.apiService.getRepos(username, this.pageSize, pageNumber).subscribe((repos: Repository[]) => {
      this.repositories = repos;
      console.log(this.repositories.length)
    });
  }
  
  onPageSizeChange(): void {
    this.updatePageNumbers();
    this.fetchRepositories(this.username, 1);
  }
  
  onPageNumberChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.fetchRepositories(this.username, pageNumber);
  }

  updatePageNumbers(): void {
    this.currentPage = 1;
    this.apiService.getTotalRepoCount(this.username).subscribe((totalCount: number) => {
      // console.log(totalCount, "Total repository count");
      const totalPages = Math.ceil(totalCount / this.pageSize);
      this.pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    });
  }
  
}

