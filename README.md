# Fyle Frontend Challenge

## How to run the app 
Run `ng serve` for a dev server. Navigate to http://localhost:4200/.

paths: /search for search feature 
       /result for repositories and other user details 

#How to run unit tests 
ng test --code-coverage 
(We are using Angular CLI for coverage report.)

## Implemented tasks inlcude: 
1. A search bar present with a button which allows the user of the app to search by a Github username on clicking the search button. 
2. In case a user is not found by the same, an empty zero state is displayed. The search bar will be visible and a message "No user found" is displyed on template. 
3. Topics are displayed according to the API response for a particular username. 
4. Server-side pagination is implemented.
5. By default page size is 10. A drop-dowm is added that allows users to select the number of repositories/items they want in a single page. (Max-100 repositories)
6. According to the page size selected, the page numbers are calculated by retrieving the actual count of repositories data with the username and dividing it with page size to get the page numbers. 
7. Local storage caching is implemented so that the API call is not duplicated when page is refreshed or page numbers are changed. Key value pairs are generated for this purpose. 
8. Unit test for 1 component (Search Component) and 1 service (api service) is implemented. 
9. 
