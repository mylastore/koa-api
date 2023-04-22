
# koa API
KoaJS backend has a fleshed-out user login, signup, forgot password, email verification, with refresh token using JWT, includes example seed data for users.

## Technologies
- Koa 2.13.0
- Fully written using async/await & Classes
- Koa-Router
- Koa-Body-parser
- KCors
- Koa-Json-Error for JSON requests/responses
- Bcrypt
- Sendgrid for emails
- Nodemon for running in development
- Babel 
- Use PM2 to run on production
- MongoDB with Mongoose (mongoose validation)
- Seed users data for testing app
- Password recover system with token
- Authentication with JWT token and refreshToken stored in secure cookies

## Installing / Getting started
- Important! rename example.env to .env and enter your credentials & make sure you have mongoDB running.
- Create certs & keys directories inside the secrets directory and generate local certs and key inside. Secure cookie are used on local development (to simulate production issue).

``` bash
# Install dependencies
npm i

# Development with nodemon with hot reload
npm start

# Builds for production with prettier (formats the code), babel (ES5 conpatible) and createss a build directory.
npm run build

# Run the following in production using pm2
npm run live

# Formats the code for readability using prettier
npm run format

# Runs tests TODO
npm run test

# TODO need to refactor. But for now add type: module on the package.json before you run the following to seed users
# for testing the app. !important it will rewrite MongoDB data & remove type: module from package.json after.
npm run seed
```

## General Information

### User Authentication Process

User authentication process:

- User creates an account
- User verifies the email
- User logs in
- The server sets both `token` and `refreshToken` on a secure cookie
- We take the `token` and decode it using `jwt-decode`. This gets us the logged-in user's information
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
