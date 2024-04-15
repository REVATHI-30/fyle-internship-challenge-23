// import { TestBed } from '@angular/core/testing';

// import { ApiService } from './api.service';

// describe('ApiService', () => {
//   let service: ApiService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(ApiService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data', () => {
    const username = 'testuser';
    const mockUserData = { login: 'testuser', id: 123, public_repos: 5 };
    
    service.getUser(username).subscribe(data => {
      expect(data.login).toBe('testuser');
      expect(data.id).toBe(123);
      expect(data.public_repos).toBe(5);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  });

  it('should return repositories data', () => {
    const username = 'testuser';
    const pageSize = 10;
    const pageNumber = 1;
    const mockReposData = [
      { name: 'repo1', description: 'description1', topics: ['topic1', 'topic2'] },
      { name: 'repo2', description: null, topics: [] }
    ];

    service.getRepos(username, pageSize, pageNumber).subscribe(data => {
      expect(data.length).toBe(2);
      expect(data[0].name).toBe('repo1');
      expect(data[0].description).toBe('description1');
      expect(data[0].topics).toEqual(['topic1', 'topic2']);
      expect(data[1].name).toBe('repo2');
      expect(data[1].description).toBeNull();
      expect(data[1].topics).toEqual([]);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}/repos?page=${pageNumber}&per_page=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReposData);
  });

  it('should return total repository count', () => {
    const username = 'testuser';
    const mockUserData = { login: 'testuser', id: 123, public_repos: 5 };

    service.getTotalRepoCount(username).subscribe(count => {
      expect(count).toBe(5);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  });

});
