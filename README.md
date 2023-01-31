# chatxyz-api

## Description

This is a simple API for a chat application i'm working on for funs and to learn more about express and websites in general.

## basic api structure (planned out for now and not fully implemented yet)

/api

- /auth
  - post /login
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
