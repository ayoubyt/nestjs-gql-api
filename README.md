# content

this repo contains a Graphql API that represents an employees management system, where each employer can add, update and delete employees.

It's a Nest.js project with GraphQl API, connecting to a Mongodb database.

## installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

but before running the program, it must be a "*.env*" file in the root directory containing the following environment variables

    MONGO_CONNECTION_STRING

    ACCESS_TOKEN_SECRET

example:

![.env file in vscode](.github/media/env.png)

---------

after running, visit **/graphql** path, you'll start a Graphql playground to start experimenting with the api.


![GraphQl playground](.github/media/gql.png)


## seeding the database


to seed users (employers) and employees tap :
```bash
ts-node scripts/seed.ts
```
to clear users (employers) and employees :
```bash
ts-node scripts/seed.ts --clear
```
tap the following command :
```bash
ts-node scripts/seed.ts -h
```

> default password for "init admin" and any seeded user is "123456789"
## authentication

the API uses a JWT authentication mechanism, so in every request (except in "register" and "login" mutations) a header "Authorization" must be set with JWT received as a bearer token with the following format:
```
"Authorization" : "Bearer <JWT>"
```
## usage examples

![GraphQl playground register mutation](.github/media/ex1.png)

![GraphQl playground login mutation](.github/media/ex2.png)

![GraphQl playground employees query](.github/media/ex4.png)


