# vidley 
This is the back-end of an application for renting the movies.

* Users can: 
  - Login to create account and login 
  - can rent the movie from
  - add genre 
  - only staff can add movie in the store
    

# Technologies used

 * [Node](https://www.djangoproject.com/)
 * [Express](https://expressjs.com/)
 * [Mongoose](https://mongoosejs.com/)
 * [JWT](https://jwt.io)
 * other related libraries


### Prerequisites

Please make sure python and pip  has been installed on the machine first!


### Installing
```
> clone the repo 
> npm install
> make sure that mongod (mongoDB demon is running)
> node index.js or nodemon

Now you can use the backend with postman or browser :)

```
### Deployment Link
https://vidly-movie-renting.herokuapp.com

## Api
```
 Create User
 [POST]: http://vidly-movie-renting.herokuapp.com/api/users
              
        {
            "name": "user",
            "email": "user@admin.com",
            "password": "password",
            "isAdmin" : true
        }
        
```
``` 
Login User 
[POST]: http://vidly-movie-renting.herokuapp.com/api/auth
               
        {
            "email": "user@admin.com",
            "password": "password" 
        }            
       
Header response
 x-auth-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2E0YzA3MmIyNjU0MTU0OTE1NDg4MTciLCJpc0FkbWluIjp
            0cnVlLCJpYXQiOjE1NTQzMDE5Njh9.lZ3IgHw31z2H2BwjIRtc8OVvOc1i8WgVt1wQbRJPXWs


        You will get x-auth-token in header when authentication is successful. Use this token for requestin  all route which require authentication
 }
  ```      
Genres :

```
    [GET] : http://vidly-movie-renting.herokuapp.com/api/genres         // get all genre
    [POST] : http://vidly-movie-renting.herokuapp.com/api/genres        // create new genre
            
            {"name":"Horror"}
                  
    [PUT]: http://vidly-movie-renting.herokuapp.com/api/genres/5ca4c609029cd80017faa5f9      //edit genre of given id
 
            {"name":"Comedy"}
            
    [DELETE]: http://vidly-movie-renting.herokuapp.com/api/genres/5ca4c609029cd80017faa5f9    //delete the genre of given id
```
