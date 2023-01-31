# chatxyz-api

## About

This is a simple API for a chat application i'm working on for funs and to learn more about express and websites in general.

## API Reference

### [**/api**](#api)

### [**/api/auth**](#api/auth)

**POST** - [**/api/auth/signup**](#post-apiauthsignup)<br>
**POST** - [**/api/auth/login**](#post-apiauthlogin)<br>
**POST** - [**/api/auth/logout**](#post-apiauthlogout)<br>
**GET** - [**/api/auth/status**](#get-apiauthstatus)<br>

#### [**/api/users**](#api/users)

##### [**/api/users/@me**](#get-apiusersme)

**GET** - [**/api/users/@me**](#get-apiusersme)<br>
**PUT** - [**/api/users/@me/username**](#post-apiusersmeusername)<br>
**PUT** - [**/api/users/@me/email**](#post-apiusersmeemail)<br>
**PUT** - [**/api/users/@me/password**](#post-apiusersmepassword)<br>
**PUT** - [**/api/users/@me/avatar**](#post-apiusersmeavatar)<br>

##### [**/api/users/:userId**](#get-apiusersuserid)

**GET** - [**/api/users/:userId**](#get-apiusersuserid)<br>
**GET** - [**/api/users/:userId/relationships**](#get-apiusersuseridrelationships)<br>

#### [**/api/friends**](#api/friends)

**GET** - [**/api/friends**](#get-apifriendsme)<br>
**POST** - [**/api/friends/:userId**](#post-apifriendsuserid)<br>
**DELETE** - [**/api/friends/:userId**](#delete-apifriendsuserid)<br>
**GET** - [**/api/friends/requests**](#get-apifriendsrequests)<br>

##### [**/api/friends/requests/:id**](#post-apifriendsrequestsid)

**DELETE** - [**/api/friends/requests/:id**](#post-apifriendsrequestsid)<br>
**POST** - [**/api/friends/requests/:id/accept**](#post-apifriendsrequestsidaccept)<br>
**POST** - [**/api/friends/requests/:id/decline**](#post-apifriendsrequestsiddecline)<br>

#### [**/api/chats**](#api/chats)

**GET** - [**/api/chats**](#get-apichats)<br>
**POST** - [**/api/chats**](#post-apichats)<br>

##### [**/api/chats/:chatId**](#get-apichatschatid)

**GET** - [**/api/chats/:chatId**](#get-apichatschatid)<br>
**DELETE** - [**/api/chats/:chatId**](#delete-apichatschatid)<br>
**POST** - [**/api/chats/:chatId/leave**](#post-apichatschatidleave)<br>

##### [**/api/chats/:chatId/messages**](#get-apichatschatidmessages)

**GET** - [**/api/chats/:chatId/messages**](#get-apichatschatidmessages)<br>
**POST** - [**/api/chats/:chatId/messages**](#post-apichatschatidmessages)<br>

##### [**/api/chats/:chatId/messages/:messageId**](#get-apichatschatidmessagesmessageid)<br>

**GET** - [**/api/chats/:chatId/messages/:messageId**](#get-apichatschatidmessagesmessageid)<br>
**PUT** - [**/api/chats/:chatId/messages/:messageId**](#put-apichatschatidmessagesmessageid)<br>
**DELETE** - [**/api/chats/:chatId/messages/:messageId**](#delete-apichatschatidmessagesmessageid)<br>

##### [**/api/chats/:chatId/members**](#get-apichatschatidmembers)

**GET** - [**/api/chats/:chatId/members**](#get-apichatschatidmembers)<br>

##### [**/api/chats/:chatId/members/:userId**](#get-apichatschatidmembersmemberid)

**PUT** - [**/api/chats/:chatId/members/:userId/role**](#put-apichatschatidmembersmemberid)<br>
**DELETE** - [**/api/chats/:chatId/members/:userId**](#delete-apichatschatidmembersmemberid)<br>

##### [**/api/chats/:chatId/invites**](#get-apichatschatidinvites)

**GET** - [**/api/chats/:chatId/invites**](#get-apichatschatidinvites)<br>
**POST** - [**/api/chats/:chatId/invites**](#post-apichatschatidinvites)<br>

##### [**/api/chats/:chatId/invites/:inviteId**](#get-apichatschatidinvitesinviteid)

**DELETE** - [**/api/chats/:chatId/invites/:inviteId**](#delete-apichatschatidinvitesinviteid)<br>

#### [**/api/invites**](#api/invites)

##### [**/api/invites/:inviteId**](#get-apiinvitesinviteid)

**GET** - [**/api/invites/:inviteId**](#get-apiinvitesinviteid)<br>
**POST** - [**/api/invites/:inviteId/accept**](#post-apiinvitesinviteidaccept)<br>
**POST** - [**/api/invites/:inviteId/decline**](#post-apiinvitesinviteiddecline)<br>

## **api**

- ## **/api/auth**

  - ## **post /api/auth/signup**

    - [x] done
    - [ ] secure

    > Creates a new account

    ### **Request**

    ```js
    {
    	"username": String,
    	"password": String,
    	"email": String
    }
    ```

    ### **Response**

    #### Successful signup:

    ```js
    {
    	"status": 200,
    	"message": "Account created successfully"
    }
    ```

    #### Failed signup:

    > Username is allready in use:

    ```js
    {
    	"status": 400,
    	"message": "Username already in use"
    }
    ```

    > Email is allready in use:

    ```js
    {
    	"status": 400,
    	"message": "Email already in use"
    }
    ```

    #### Internal server error:

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **post /api/auth/login**

    - [x] done
    - [ ] secure

    > Logs in and creates new session and JWT token

    ### **Request**

    #### **using username:**

    ```js
    {
      "username": String,
      "password": String
    }
    ```

    #### **using email:**

    ```js
    {
      "email": String,
      "password": String
    }
    ```

    ### **Response**

    #### **Successful login:**

    ```js
    {
      "status": 200,
      "message": "Logged in successfully",
      "token": String,
    }
    ```

    > token is a JWT token with a lifetime of 14 days that is required for all secured routes

    #### **Failed login:**

    ```js
    {
    	"status": 401,
    	"message": "Incorrect credentials"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **post /api/auth/logout**

    - [x] done
    - [x] secure

    > Logs out of the current session and invalidates the JWT token

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful logout:**

    ```js
    {
    	"status": 200,
    	"message": "Logged out successfully"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **get /api/auth/status**

    - [x] done
    - [x] secure

    > Returns the current authentification status

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
    	"status": 200,
    	"message": "Authenticated",
    	"userId": String
    }
    ```

    #### **Not authenticated:**

    ```js
    {
    	"status": 401,
    	"message": "Not authenticated"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

- ## **/api/users**

  - ## **get /api/users/@me**

    - [x] done
    - [x] secure

    > Returns the current user

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
    	"status": 200,
    	"message": "User found",
    	"user": {
        "id": String,
    		"username": String,
    		"email": String,
    		"avatar": String,
    	}
    }
    ```

    #### **User not found:**

    ```js
    {
    	"status": 404,
    	"message": "User not found"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **get /api/users/:userId**

    - [x] done
    - [x] secure

    > Returns the user with the given id

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
    	"status": 200,
    	"message": "User found",
    	"user": {
        "id": String,
    		"username": String,
    		"avatar": String,
    	}
    }
    ```

    #### **User not found:**

    ```js
    {
    	"status": 404,
    	"message": "User not found"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **get /api/users/:userId/relationships**

    - [ ] done

    - [x] secure

    > Returns all ids of users that are sharing a friendship with the given user and the current user

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Relationships found",
      "relationships": [
        {
          "id": String,
          "username": String,
          "avatar": String
        }
      ]
    }
    ```

    #### **User not found:**

    ```js
    {
    	"status": 404,
    	"message": "User not found"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

      <br>

  - ## **put /api/users/@me/username**

    - [x] done
    - [x] secure

    > Updates the current user's username

    ### **Request**

    ```js
    {
      "username": String
    }
    ```

    ### **Response**

    #### **Successful request:**

    ```js
    {
    	"status": 200,
    	"message": "Username updated successfully"
    }
    ```

    #### **Username already in use:**

    ```js
    {
    	"status": 400,
    	"message": "Username already in use"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **put /api/users/@me/email**

    - [x] done
    - [x] secure

    > Updates the current user's email

    ### **Request**

    ```js
    {
      "email": String
    }
    ```

    ### **Response**

    #### **Successful request:**

    ```js
    {
    	"status": 200,
    	"message": "Email updated successfully"
    }
    ```

    #### **Email already in use:**

    ```js
    {
    	"status": 400,
    	"message": "Email already in use"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **put /api/users/@me/password**

    - [x] done
    - [x] secure

    > Updates the current user's password

    ### **Request**

    ```js
    {
      "password": String
    }
    ```

    ### **Response**

    #### **Successful request:**

    ```js
    {
    	"status": 200,
    	"message": "Password updated successfully"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **put /api/users/@me/avatar**

    - [ ] done
    - [x] secure

    > Updates the current user's avatar

    ### **Request**

    ```js
    {
      "avatar": String
    }
    ```

    ### **Response**

    #### **Successful request:**

    ```js
    {
    	"status": 200,
    	"message": "Avatar updated successfully"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

- ## **/api/friends**

  - ## **get /api/friends**

    - [] done
    - [x] secure

    > Returns all ids of users that the current user is friends with

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Friends found",
      "friends": [
        {
          "id": String,
          "username": String,
          "avatar": String
        }
      ]
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **post /api/friends/:userId**

    - [ ] done
    - [x] secure

    > Sends a friend request to the given user or accepts a friend request if the given user sent a friend request to the current

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
    	"status": 200,
    	"message": "Friend request sent successfully"
    }
    ```

    #### **Accepted friend request:**

    ```js
    {
    	"status": 200,
    	"message": "Friend added successfully"
    }
    ```

    #### **Friend request already sent:**

    ```js
    {
    	"status": 400,
    	"message": "Friend request already sent"
    }
    ```

    #### **User not found:**

    ```js
    {
    	"status": 404,
    	"message": "User not found"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **delete /api/friends/:userId**

    - [ ] done
    - [x] secure

    > Removes the given user from the current user's friends list

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
    	"status": 200,
    	"message": "Friend removed successfully"
    }
    ```

    #### **Not a friend with this user**

    ```js
    {
    	"status": 400,
    	"message": "Not a friend with this user"
    }
    ```

    #### **User not found:**

    ```js
    {
    	"status": 404,
    	"message": "User not found"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **get /api/friends/requests**

    - [ ] done
    - [x] secure

    > Returns all received and sent friend requests

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Friend requests found",
      "requests": [
        {
          "id": String,
          "user": String,
          "friend": String,
          "accepted": Boolean,
          "rejected": Boolean,
          "createdAt": Date,
        }
      ]
    }
    ```

    #### **No friend requests found:**

    ```js
    {
    	"status": 200,
    	"message": "No friend requests found",
      "requests": []
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **delete /api/friends/requests/:id**

    - [ ] done
    - [x] secure

    > Deletes the given friend request

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
    	"status": 200,
    	"message": "Friend request deleted successfully"
    }
    ```

    #### **Not sent by current user:**

    ```js
    {
    	"status": 400,
    	"message": "Not sent by current user"
    }
    ```

    #### **Friend request not found:**

    ```js
    {
    	"status": 404,
    	"message": "Friend request not found"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

      <br>

  - ## **post /api/friends/requests/:id/accept**

    - [ ] done
    - [x] secure

    > Accepts the given friend request

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
    	"status": 200,
    	"message": "Friend request accepted successfully"
    }
    ```

    #### **Not sent to current user:**

    ```js
    {
    	"status": 400,
    	"message": "Not sent to current user"
    }
    ```

    #### **Friend request not found:**

    ```js
    {
    	"status": 404,
    	"message": "Friend request not found"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

      <br>

  - ## **post /api/friends/requests/:id/reject**

    - [ ] done
    - [x] secure

    > Rejects the given friend request

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
    	"status": 200,
    	"message": "Friend request rejected successfully"
    }
    ```

    #### **Not sent to current user:**

    ```js
    {
    	"status": 400,
    	"message": "Not sent to current user"
    }
    ```

    #### **Friend request not found:**

    ```js
    {
    	"status": 404,
    	"message": "Friend request not found"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

      <br>

- ## **/api/chats**

  - ## **get /api/chats**

    - [ ] done
    - [x] secure

    > Returns all chats the current user is a part of

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Chats found",
      "chats": [
        {
          "id": String,
          "name": String,
          "type": Number,
          "users": [
            {
              "id": String,
              "username": String,
              "avatar": String,
            }
          ],
          "createdAt": Date,
        }
      ]
    }
    ```

    #### **No chats found:**

    ```js
    {
    	"status": 200,
    	"message": "No chats found",
      "chats": []
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **post /api/chats**

    - [ ] done
    - [x] secure

    > Creates a new chat

    ### **Request**

    ```js
    {
      "name": String,
      "type": Number,
      "users": [String],
    }
    ```

    > `type` can be 0 for private chat or 1 for group chat

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Chat created successfully",
      "chat": {
        "id": String,
        "name": String,
        "type": Number,
        "users": [
          {
            "id": String,
            "username": String,
            "avatar": String,
          }
        ],
        "createdAt": Date,
      }
    }
    ```

    #### **Invalid chat type:**

    ```js
    {
    	"status": 400,
    	"message": "Invalid chat type"
    }
    ```

    #### **Invalid user id:**

    ```js
    {
    	"status": 400,
    	"message": "Invalid user id"
    }
    ```

    #### **User not found:**

    ```js
    {
    	"status": 404,
    	"message": "User not found"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **get /api/chats/:chatId**

    - [ ] done
    - [x] secure

    > Returns the chat with the given id

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Chat found",
      "chat": {
        "id": String,
        "name": String,
        "type": Number,
        "owner": String,
        "users": [
          {
            "id": String,
            "username": String,
            "avatar": String,
          }
        ],
        "createdAt": Date,
      }
    }
    ```

    #### **Chat not found:**

    ```js
    {
    	"status": 404,
    	"message": "Chat not found"
    }
    ```

    #### **Forbidden:**

    ```js
    {
    	"status": 403,
    	"message": "Forbidden"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **get /api/chats/:chatId/messages**

    - [ ] done
    - [x] secure

    > Returns all messages in the chat with the given id

    ### **Request**

    ```js
    {
      "limit": Number,
      "before": String,
      "after": String,
      "around": String,
    }
    ```

    > only use one of `before`, `after` or `around` at a time and are optional
    > `limit` is optional and defaults and maxes out at 100
    > `before`, `after` and `around` take a message id

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Messages found",
      "messages": [
        {
          "id": String,
          "content": String,
          "author": {
            "id": String,
            "username": String,
            "avatar": String,
          },
          "createdAt": Date,
        }
      ]
    }
    ```

    #### **Chat not found:**

    ```js
    {
    	"status": 404,
    	"message": "Chat not found"
    }
    ```

    #### **Forbidden:**

    ```js
    {
    	"status": 403,
    	"message": "Forbidden"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **get /api/chats/:chatId/messages/:messageId**

    - [ ] done
    - [x] secure

    > Returns the message with the given id in the chat with the given id

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Message found",
      "message": {
        "id": String,
        "content": String,
        "author": {
          "id": String,
          "username": String,
          "avatar": String,
        },
        "createdAt": Date,
      }
    }
    ```

    #### **Chat not found:**

    ```js
    {
    	"status": 404,
    	"message": "Chat not found"
    }
    ```

    #### **Message not found:**

    ```js
    {
    	"status": 404,
    	"message": "Message not found"
    }
    ```

    #### **Forbidden:**

    ```js
    {
    	"status": 403,
    	"message": "Forbidden"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **post /api/chats/:chatId/messages**

    - [ ] done
    - [x] secure

    > Creates a new message in the chat with the given id

    ### **Request**

    ```js
    {
      "content": String,
    }
    ```

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Message created successfully",
      "message": {
        "id": String,
        "content": String,
        "author": {
          "id": String,
          "username": String,
          "avatar": String,
        },
        "createdAt": Date,
      }
    }
    ```

    #### **Chat not found:**

    ```js
    {
    	"status": 404,
    	"message": "Chat not found"
    }
    ```

    #### **Forbidden:**

    ```js
    {
    	"status": 403,
    	"message": "Forbidden"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **put /api/chats/:chatId/messages/:messageId**

    - [ ] done
    - [x] secure

    > Updates the message with the given id in the chat with the given id

    ### **Request**

    ```js
    {
      "content": String,
    }
    ```

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Message updated successfully",
      "message": {
        "id": String,
        "content": String,
        "author": {
          "id": String,
          "username": String,
          "avatar": String,
        },
        "createdAt": Date,
      }
    }
    ```

    #### **Chat not found:**

    ```js
    {
    	"status": 404,
    	"message": "Chat not found"
    }
    ```

    #### **Message not found:**

    ```js
    {
    	"status": 404,
    	"message": "Message not found"
    }
    ```

    #### **Forbidden:**

    ```js
    {
    	"status": 403,
    	"message": "Forbidden"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

      <br>

  - ## **delete /api/chats/:chatId/messages/:messageId**

    - [ ] done
    - [x] secure

    > Deletes the message with the given id in the chat with the given id

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Message deleted successfully",
    }
    ```

    #### **Chat not found:**

    ```js
    {
    	"status": 404,
    	"message": "Chat not found"
    }
    ```

    #### **Message not found:**

    ```js
    {
    	"status": 404,
    	"message": "Message not found"
    }
    ```

    #### **Forbidden:**

    ```js
    {
    	"status": 403,
    	"message": "Forbidden"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

      <br>

  - ## **get /api/chats/:chatId/members**

    - [ ] done
    - [x] secure

    > Returns the members of the chat with the given id

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Members found",
      "members": [
        {
          "id": String,
          "username": String,
          "avatar": String,
          "admin": Boolean,
        },
      ],
    }
    ```

    #### **Chat not found:**

    ```js
    {
    	"status": 404,
    	"message": "Chat not found"
    }
    ```

    #### **Forbidden:**

    ```js
    {
    	"status": 403,
    	"message": "Forbidden"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

      <br>

  - ## **put /api/chats/:chatId/members/:memberId**

    - [ ] done
    - [x] secure

    > Updates the member with the given id in the chat with the given id

    ### **Request**

    ```js
    {
      "admin": Boolean,
    }
    ```

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Member updated successfully",
      "member": {
        "id": String,
        "username": String,
        "avatar": String,
        "admin": Boolean,
        "owner": Boolean,
      },
    }
    ```

    #### **Chat not found:**

    ```js
    {
    	"status": 404,
    	"message": "Chat not found"
    }
    ```

    #### **Member not found:**

    ```js
    {
    	"status": 404,
    	"message": "Member not found"
    }
    ```

    #### **Forbidden:**

    ```js
    {
    	"status": 403,
    	"message": "Forbidden"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

  - ## **delete /api/chats/:chatId/members/:memberId**

    - [ ] done
    - [x] secure

    > Removes the member with the given id from the chat with the given id

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Member removed successfully",
    }
    ```

    #### **Chat not found:**

    ```js
    {
    	"status": 404,
    	"message": "Chat not found"
    }
    ```

    #### **Member not found:**

    ```js
    {
    	"status": 404,
    	"message": "Member not found"
    }
    ```

    #### **Forbidden:**

    ```js
    {
    	"status": 403,
    	"message": "Forbidden"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

      <br>

  - ## **post /api/chats/:chatId/invites**

    - [ ] done
    - [x] secure

    > Creates an invite for the chat with the given id

    ### **Request**

    ```js
    {
      "memberId": String,
    }
    ```

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Invite created successfully",
      "invite": {
        "id": String,
        "chat": {
          "id": String,
          "name": String,
          "avatar": String,
        },
       "createdAt": Date,
      },
    }
    ```

    #### **Chat not found:**

    ```js
    {
    	"status": 404,
    	"message": "Chat not found"
    }
    ```

    #### **Forbidden:**

    ```js
    {
    	"status": 403,
    	"message": "Forbidden"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

      <br>

  - ## **get /api/chats/:chatId/invites**

    - [ ] done
    - [x] secure

    > Returns the invites of the chat with the given id

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Invites found",
      "invites": [
        {
          "id": String,
          "chat": {
            "id": String,
            "name": String,
            "avatar": String,
          },
          "createdAt": Date,
        },
      ],
    }
    ```

    #### **Chat not found:**

    ```js
    {
    	"status": 404,
    	"message": "Chat not found"
    }
    ```

    #### **Forbidden:**

    ```js
    {
    	"status": 403,
    	"message": "Forbidden"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

      <br>

  - ## **delete /api/chats/:chatId/invites/:inviteId**

    - [ ] done
    - [x] secure

    > Removes the invite with the given id from the chat with the given id

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Invite removed successfully",
    }
    ```

    #### **Chat not found:**

    ```js
    {
    	"status": 404,
    	"message": "Chat not found"
    }
    ```

    #### **Invite not found:**

    ```js
    {
    	"status": 404,
    	"message": "Invite not found"
    }
    ```

    #### **Forbidden:**

    ```js
    {
    	"status": 403,
    	"message": "Forbidden"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

      <br>

  - ## **post /api/chats/:chatId/leave**

    - [ ] done
    - [x] secure

    > Removes the current user from the chat with the given id

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Left chat successfully",
    }
    ```

    #### **Chat not found:**

    ```js
    {
    	"status": 404,
    	"message": "Chat not found"
    }
    ```

    #### **User not a member:**

    ```js
    {
    	"status": 404,
    	"message": "User not a member"
    }
    ```

    #### **User is owner:**

    ```js
    {
    	"status": 403,
    	"message": "User is owner"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

      <br>

  - ## **get /api/invites/:inviteId**

    - [ ] done
    - [x] secure

    > Returns the invite with the given id

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Invite found",
      "invite": {
        "id": String,
        "chat": {
          "id": String,
          "name": String,
          "avatar": String,
        },
        "createdAt": Date,
      },
    }
    ```

    #### **Invite not found:**

    ```js
    {
    	"status": 404,
    	"message": "Invite not found"
    }
    ```

    #### **Forbidden:**

    ```js
    {
    	"status": 403,
    	"message": "Forbidden"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

  - ## **post /api/invites/:inviteId/accept**

    - [ ] done
    - [x] secure

    > Accepts the invite with the given id

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Invite accepted successfully",
    }
    ```

    #### **Invite not found:**

    ```js
    {
    	"status": 404,
    	"message": "Invite not found"
    }
    ```

    #### **User already a member:**

    ```js
    {
    	"status": 403,
    	"message": "User already a member"
    }
    ```

    #### **Invite already used:**

    ```js
    {
    	"status": 403,
    	"message": "Invite already used"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

      <br>

  - ## **post /api/invites/:inviteId/decline**

    - [ ] done
    - [x] secure

    > Declines the invite with the given id

    ### **Request**

    > No request body

    ### **Response**

    #### **Successful request:**

    ```js
    {
      "status": 200,
      "message": "Invite declined successfully",
    }
    ```

    #### **Invite not found:**

    ```js
    {
    	"status": 404,
    	"message": "Invite not found"
    }
    ```

    #### **Invite already used:**

    ```js
    {
    	"status": 403,
    	"message": "Invite already used"
    }
    ```

    #### **Internal server error:**

    ```js
    {
    	"status": 500,
    	"message": "Internal server error"
    }
    ```

    <br>

# Paths

[**/api**](#api)

- [**/auth**](#api/auth)

  - **POST** - [**/signup**](#post-apiauthsignup)
  - **POST** - [**/login**](#post-apiauthlogin)
  - **POST** - [**/logout**](#post-apiauthlogout)
  - **GET** - [**/status**](#get-apiauthstatus)

- [**/users**](#api/users)

  - [**/@me**](#get-apiusersme)
    - **GET** - [**/**](#get-apiusersme)
    - **PUT** - [**/username**](#post-apiusersmeusername)
    - **PUT** - [**/email**](#post-apiusersmeemail)
    - **PUT** - [**/password**](#post-apiusersmepassword)
    - **PUT** - [**/avatar**](#post-apiusersmeavatar)
  - [**/:userId**](#get-apiusersuserid)
    - **GET** - [**/**](#get-apiusersuserid)
    - **GET** - [**/relationships**](#get-apiusersuseridrelationships)

- [**/friends**](#api/friends)

  - **GET** - [**/**](#get-apifriendsme)
  - **POST** - [**/:userId**](#post-apifriendsuserid)
  - **DELETE** - [**/:userId**](#delete-apifriendsuserid)
  - **GET** - [**/requests**](#get-apifriendsrequests)
    - [**/:id**](#post-apifriendsrequestsid)
      - **DELETE** - [**/**](#post-apifriendsrequestsid)
      - **POST** - [**/accept**](#post-apifriendsrequestsidaccept)
      - **POST** - [**/decline**](#post-apifriendsrequestsiddecline)

- [**/chats**](#api/chats)

  - **GET** - [**/**](#get-apichats)
  - **POST** - [**/**](#post-apichats)
  - [**/:chatId**](#get-apichatschatid)
    - **GET** - [**/**](#get-apichatschatid)
    - **DELETE** - [**/**](#delete-apichatschatid)
    - **POST** - [**/leave**](#post-apichatschatidleave)
    - [**/messages**](#get-apichatschatidmessages)
      - **GET** - [**/**](#get-apichatschatidmessages)
      - **POST** - [**/**](#post-apichatschatidmessages)
      - [**/:messageId**](#get-apichatschatidmessagesmessageid)
        - **GET** - [**/**](#get-apichatschatidmessagesmessageid)
        - **PUT** - [**/**](#put-apichatschatidmessagesmessageid)
        - **DELETE** - [**/**](#delete-apichatschatidmessagesmessageid)
    - [**/members**](#get-apichatschatidmembers)
      - **GET** - [**/**](#get-apichatschatidmembers)
      - [**/:userId**](#get-apichatschatidmembersmemberid)
        - **PUT** - [**/role**](#put-apichatschatidmembersmemberid)
        - **DELETE** - [**/**](#delete-apichatschatidmembersmemberid)
    - [**/invites**](#get-apichatschatidinvites)
      - **GET** - [**/**](#get-apichatschatidinvites)
      - **POST** - [**/**](#post-apichatschatidinvites)
      - [**/:inviteId**](#get-apichatschatidinvitesinviteid)
        - **DELETE** - [**/**](#delete-apichatschatidinvitesinviteid)

- [**/invites**](#api/invites)
  - [**/:inviteId**](#get-apiinvitesinviteid)
    - **GET** - [**/**](#get-apiinvitesinviteid)
    - **POST** - [**/accept**](#post-apiinvitesinviteidaccept)
    - **POST** - [**/decline**](#post-apiinvitesinviteiddecline)
