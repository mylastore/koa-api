
# koa API
Koa API has a fleshed-out user login, signup, forgot password, email verification, with token refresh system using JWT, includes example seed data for users, and the following technologies listed below.

## Technologies
- Koa 2.13.0
- Fully written using async/await & Classes
- Koa-Router
- Koa-Bodyparser
- KCors
- Koa-Json-Error for JSON requests/responses
- Bcrypt
- Sendgrid for emails
- Nodemon for running in development
- Babel
- PM2 for running in production
- MongoDB with Mongoose (mongoose validation)
- Seed users data for testing app
- Password recover system with token
- *UPDATED Authentication with JWT token and refreshToken stored in secure cookies

## Installing / Getting started
###Important! rename example.env to .env and enter your credentials also make sure you have mongoDB running.

``` bash
# install dependencies
npm install

# Development with nodemon with hot reload
npm start

# build for production with prettier and babel
npm run build

# serve in production using pm2
npm run live

# run prettier on the project
npm run pretty

# run tests
npm run test

# Rund seed users data !important will rewrite MongoDB data ##
npm run seed
```

## General Information

### User Authentication Process

User authentication process:

- User creates an account
- User verifies email
- User logs in
- The server sets both `token` and `refreshToken` on a secure cookie
- We take the `token` and decode it using `jwt-decode`. This gets us the logged-in user's information`
- If the token expires and the refreshToken is still valid we issue a new token. 

### PM2

Yep, PM2 is awesome on production.

The `src` folder is the heart of the program.

### Controllers

We use controllers to keep our router thin. 

The controller's responsibility is to manage the request body and make sure it's nice and clean when it eventually

gets sent to a `model` to make database calls.

### db

MongoDB with Mongoose for speed and fairly easy to used.

### middleware

The custom middleware we're using is based on the `koa-jwt` library.

### models

Our models folder where database calls are made and validation is performed

### routes

This is where we do authentication for restricted URL

### index.js

index.js it's the brain of the app.

## License

copyright 2001 Oscar Quinteros


[MIT](http://opensource.org/licenses/MIT)
