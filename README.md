# Donnchad

This project contains the backend for our social management app (https://github.com/aavsss/FindComplement).

# Description

- This project consists of a monolithic express server with PostgreSQL as its database server and Redis as its caching layer and frontend session manager.
- Link to learn more about express and Nodejs (https://www.youtube.com/watch?v=Oe421EPjeBE).
- Link to learn more about postgresql (https://www.youtube.com/watch?v=-VO7YjQeG6Y).

# Setup procedue:

1. run ' git clone https://github.com/Apahadi73/Donnchad.git'
2. Go to the terminal and install all required npm packages using command 'npm i'
3. Run command "docker-compose up" to start the containers.
4. remote api: https://donnchad-server.herokuapp.com/

# Description

- Users:

  - Register new user: `POST /api/users/signup`
  - Login existing user: `POST /api/users/login`
  - Get a list of users: `GET /api/users`
  - Get an user by id: `GET /api/users/:uid`
  - Update user info: `PUT /api/users/:uid`
  - Delete a user: `DELETE /api/users/:uid`
  - Reset Password: `POST /api/users/:uid/forgot-password`

- Events:

  - Create a new event: `POST /api/events/`
  - Get a list of evenets: `GET /api/events`
  - Get an event by id: `GET /api/events/:eid`
  - Update user info: `PUT /api/events/:eid`
  - Delete a user: `DELETE /api/events/:eid`

# Tools used: Express, Nodejs, Postgresql, Docker, and Redis
