# Donnchad

This project contains the backend for our social management app (https://github.com/aavsss/FindComplement).

# Description

- This project consists of a monolithic express server with PostgreSQL as its database server and Redis as its caching layer and frontend session manager.
- Link to learn more about express and Nodejs (https://www.youtube.com/watch?v=Oe421EPjeBE).
- Link to learn more about postgresql (https://www.youtube.com/watch?v=-VO7YjQeG6Y).

# Setup procedue:

1. run ' git clone https://github.com/Apahadi73/Donnchad.git'
2. Go to the terminal and install all required npm packages using command 'npm i'
3. Create a .env file and create all the required key-value pairs. Note: Team member will find them in our database work channel.
4. Setup postgres local server by following steps described in https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/.
5. After initial setup, run command 'npm run start' to start the express server.
6. Use command 'npm run test:watch' to run all the test suites.
7. Make sure to run server and postgres server on two different terminals for convenience

# Tools used: Express, Nodejs, Postgresql, and Redis
