# chatxyz-api

## About

This is a simple API for a chat application i'm working on for funs and to learn more about express and websites in general.

## basic api structure (planned out for now and not fully implemented yet)

/api

- /auth
  - [post /login](####post-/login)
  - post /signup
  - post /logout
  - get /status
- /user
  - get /:id
  - get /:id/sharedFriends
  - put /update/username
  - put /update/password
  - put /update/email
  - put /update/profilePicture
  - get /friends/requests
  - post /friends/requests
  - post /friends/requests/:id/accept
  - post /friends/requests/:id/decline
  - delete /friends/requests/:id
  - post /friends/:id/remove
  - get /friends
- /chats
  - post /create
  - get /:id
    - get /:id/messages
    - post /:id/messages
    - put /:id/messages/:id
    - delete /:id/messages/:id
    - get /:id/members
    - post /:id/members
    - post /:id/members/:id/remove
    - post /:id/members/:id/makeAdmin
    - post /:id/members/:id/removeAdmin
    - post /:id/members/:id/makeOwner
    - get /:id/admins
    - put /:id/update/name
    - put /:id/update/description
    - put /:id/update/picture
    - delete /:id
    - get /:id/invites
    - post /:id/invites
    - delete /:id/invites/:id
    - post /:id/leave
- /invites
  - get /:id
  - post /:id/accept
  - post /:id/decline

## **Routes**

- ## **/api/auth**

  - ## **post /api/auth/signup**

    - [x] done
    - [ ] secure

    > Create a new account

    ### **Request**

    ```json
    {
    	"username": String,
    	"password": String,
    	"email": String
    }
    ```

    ### **Response**

    #### Successful signup:

    ```json
    {
    	"status": 200,
    	"message": "Account created successfully"
    }
    ```

    #### Failed signup:

    > Username is allready in use:

    ```json
    {
    	"status": 400,
    	"message": "Username already in use"
    }
    ```

    > Email is allready in use:

    ```json
    {
    	"status": 400,
    	"message": "Email already in use"
    }
    ```

    #### Internal server error:

    ```json
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **post /api/auth/login**

    - [x] done
    - [ ] secure

    > Login with username or email

    ### **Request**

    <br> using username:

    ```js
    {
      "username": String,
      "password": String
    }
    ```

    <br>using email:

    ```js
    {
      "email": String,
      "password": String
    }
    ```

    ### **Response**

    <br> Successful login:

    ```json
    {
      "status": 200,
      "message": "Logged in successfully",
      "token": String,
    }
    ```

    > token is a JWT token with a lifetime of 14 days that is required for all secured routes

    <br> Failed login:

    ```json
    {
    	"status": 401,
    	"message": "Incorrect credentials"
    }
    ```

    <br> Internal server error:

    ```json
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **post /api/auth/logout**

    - [x] done
    - [x] secure

    > Logout

    ### **Request**

    <br> No request body

    ### **Response**

    <br> Successful logout:

    ```json
    {
    	"status": 200,
    	"message": "Logged out successfully"
    }
    ```

    <br> Internal server error:

    ```json
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>
