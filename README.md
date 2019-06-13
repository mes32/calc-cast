# Calc Cast
Server-side calculator that broadcasts calculation history to all users via websockets. See a deployed instance of this project here: [https://fast-castle-54694.herokuapp.com/](https://fast-castle-54694.herokuapp.com/).

## Utilized Web Stack
- `User Interface` - React, CSS
- `Client` - React, socket.io-client
- `Server` - Node.js, express, pg, socket.io
- `Database` - PostgreSQL

## Requirements
- Git
- Web browser
- Node
- Nodemon
- PostgreSQL
- Heroku CLI

## Setup and Run Locally
```bash
# 1. Create PostgreSQL database named 'calc_cast'
createdb calc_cast

# 2. Create the database schema in 'calc_cast'
psql -E -f database_schema.sql -d calc_cast

# 3. Install Node dependencies/libraries using NPM
npm install

# 4. Start the server (runs on PORT 5000)
npm run server

# 5. Start the client (runs on PORT 3000)
npm run client
```
**See:** [localhost:3000](http://localhost:3000)

## Deploying to Heroku
```bash
# 1. From the project directory run the following to setup Heroku
heroku create

# 2. Push the 'master' branch to the newly created 'heroku' remote
git push heroku master

# 3. Add Heroku addon for PostgreSQL databases
heroku addons:create heroku-postgresql:hobby-dev

# 4. Create schema for deployed database
heroku pg:psql -f database_schema.sql
```

## Features

### Completed Features
- [x] User enters two arguments and an arithmetic operator
- [x] Pressing the `=` button sends entered expressions to the server for evaluation
- [x] All users accessing the website are kept up-to-date thru a socket connection
- [x] Server clock time is broadcast at one second intervals
- [x] Sockets broadcast recent history of evaluated expressions
- [x] History of evaluated expressions expressions are listed in a table
- [x] Calculation history saved in sever-side database
- [x] Basic CSS styling
- [x] Users can selectively remove entries from calculation history

### Planned Features
- [ ] Users can selectively re-run calculations in history
- [ ] Discriptive alerts shown for incomplete/invalid inputs
- [ ] Unit testing

## Authors
Michael Stockman

