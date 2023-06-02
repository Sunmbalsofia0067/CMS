# Node.js PostgreSQL CRUD example with Express Rest APIs

Full Article with implementation:
> [Node.js PostgreSQL CRUD example with Express Rest APIs](https://www.bezkoder.com/node-express-sequelize-postgresql/)

We will build Rest Apis that can create, retrieve, update, delete and find Articles by title.

The following table shows overview of the Rest APIs that will be exported:

- GET     `api/articles`	            get all Articles
- GET     `api/articles/:id`         get Article by id
- POST    `api/articles`             add new Article
- PUT     `api/articles/:id`         update Article by id
- DELETE  `api/articles/:id`         remove Article by id
- DELETE  `api/articles`             remove all Articles
- GET     `api/articles/published`   find all published Articles
- GET     `api/articles?title=[kw]`  find all Articles which title contains 'kw'

## Demo Video
This is our Node.js PostgreSQL CRUD example using Express & Sequelize application demo, test Rest Apis with Postman.

[![Node.js PostgreSQL CRUD example Github](http://img.youtube.com/vi/x1pZHN_sjGk/0.jpg)](http://www.youtube.com/watch?v=x1pZHN_sjGk "Node.js PostgreSQL CRUD example Github")

### Test the APIs
Run our Node.js application with command: `node server.js`.

Using Postman, we're gonna test all the Apis above.

- Create a new Article using `POST /articles` Api

![node-js-postgresql-crud-example-create](https://dev-to-uploads.s3.amazonaws.com/i/hqvz8ra9p21z927iwzph.png)

After creating some new Articles, you can check PostgreSQL table:
```testdb=# select * from articles;
 id |    title    |    description    | published |         createdAt          |         updatedAt
----+-------------+-------------------+-----------+----------------------------+----------------------------
  1 | Node Tut #1 | Tut#1 Description | f         | 2020-01-29 10:42:57.121+07 | 2020-01-29 10:42:57.121+07
  2 | Node Tut #2 | Tut#2 Description | f         | 2020-01-29 10:43:05.131+07 | 2020-01-29 10:43:05.131+07
  3 | Node Tut #3 | Tut#3 Description | f         | 2020-01-29 10:43:48.028+07 | 2020-01-29 10:43:48.028+07
  4 | Js Tut #4   | Tut#4 Desc        | f         | 2020-01-29 10:45:40.016+07 | 2020-01-29 10:45:40.016+07
  5 | Js Tut #5   | Tut#5 Desc        | f         | 2020-01-29 10:45:44.289+07 | 2020-01-29 10:45:44.289+07
```

- Retrieve all Articles using `GET /articles` Api

![node-js-postgresql-crud-example-retrieve-all](https://dev-to-uploads.s3.amazonaws.com/i/m9razjm1njgww58er3as.png)

- Retrieve a single Article by id using `GET /articles/:id` Api

![node-js-postgresql-crud-example-retrieve-one](https://dev-to-uploads.s3.amazonaws.com/i/0kuojvc596i5u423od2b.png)

- Update a Article using `PUT /articles/:id` Api

![node-js-postgresql-crud-example-update](https://dev-to-uploads.s3.amazonaws.com/i/3buqfz0by0lu2z4kf3uq.png)

Check `articles` table after some rows were updated:
```testdb=# select * from articles;
 id |     title      |    description    | published |         createdAt          |         updatedAt
----+----------------+-------------------+-----------+----------------------------+----------------------------
  1 | Node Tut #1    | Tut#1 Description | f         | 2020-01-29 10:42:57.121+07 | 2020-01-29 10:42:57.121+07
  3 | Node Tut #3    | Tut#3 Description | f         | 2020-01-29 10:43:48.028+07 | 2020-01-29 10:43:48.028+07
  2 | Node Js Tut #2 | Tut#2 Description | t         | 2020-01-29 10:43:05.131+07 | 2020-01-29 10:51:55.235+07
  4 | Js Tut #4      | Tut#4 Desc        | t         | 2020-01-29 10:45:40.016+07 | 2020-01-29 10:54:17.468+07
  5 | Js Tut #5      | Tut#5 Desc        | t         | 2020-01-29 10:45:44.289+07 | 2020-01-29 10:54:20.544+07
```

- Find all Articles which title contains 'js': `GET /articles?title=js`

![node-js-postgresql-crud-example-search](https://dev-to-uploads.s3.amazonaws.com/i/u2hbmz5r35o7uo09y3z5.png)

- Find all published Articles using `GET /articles/published` Api

![node-js-postgresql-crud-example-search-status](https://dev-to-uploads.s3.amazonaws.com/i/dbo753wfqibt0b93d82d.png)

- Delete a Article using `DELETE /articles/:id` Api

![node-js-postgresql-crud-example-delete-one](https://dev-to-uploads.s3.amazonaws.com/i/pyos3wq4tchb8ixuyj1c.png)

Article with id=4 was removed from `articles` table:
```testdb=# select * from articles;
 id |     title      |    description    | published |         createdAt          |         updatedAt
----+----------------+-------------------+-----------+----------------------------+----------------------------
  1 | Node Tut #1    | Tut#1 Description | f         | 2020-01-29 10:42:57.121+07 | 2020-01-29 10:42:57.121+07
  3 | Node Tut #3    | Tut#3 Description | f         | 2020-01-29 10:43:48.028+07 | 2020-01-29 10:43:48.028+07
  2 | Node Js Tut #2 | Tut#2 Description | t         | 2020-01-29 10:43:05.131+07 | 2020-01-29 10:51:55.235+07
  5 | Js Tut #5      | Tut#5 Desc        | t         | 2020-01-29 10:45:44.289+07 | 2020-01-29 10:54:20.544+07
```

- Delete all Articles using `DELETE /articles` Api

![node-js-postgresql-crud-example-delete-all](https://dev-to-uploads.s3.amazonaws.com/i/ga42747jorssl20ywyug.png)

Now there are no rows in `articles` table:
```testdb=# select * from articles;
 id | title | description | published | createdAt | updatedAt
----+-------+-------------+-----------+-----------+-----------
```

For more detail, please visit:
> [Node.js PostgreSQL CRUD example with Express Rest APIs](https://www.bezkoder.com/node-express-sequelize-postgresql/)

> [Node.js Express Pagination with PostgreSQL example](https://www.bezkoder.com/node-js-pagination-postgresql/)

Security:
> [Node.js JWT Authentication & Authorization with PostgreSQL example](https://www.bezkoder.com/node-js-jwt-authentication-postgresql/)

Associations:
> [Sequelize Associations: One-to-Many Relationship example](https://www.bezkoder.com/sequelize-associate-one-to-many/)

> [Sequelize Associations: Many-to-Many Relationship example](https://www.bezkoder.com/sequelize-associate-many-to-many/)

Fullstack:
> [Vue + Node.js + Express + PostgreSQL example](https://www.bezkoder.com/vue-node-express-postgresql/)

> [React + Node.js + Express + PostgreSQL example](https://www.bezkoder.com/react-node-express-postgresql/)

> [Angular 8 + Node.js + Express + PostgreSQL example](https://www.bezkoder.com/angular-node-express-postgresql/)

> [Angular 10 + Node.js + Express + PostgreSQL example](https://www.bezkoder.com/angular-10-node-express-postgresql/)

> [Angular 11 + Node.js + Express + PostgreSQL example](https://www.bezkoder.com/angular-11-node-js-express-postgresql/)

> [Angular 12 + Node.js + Express + PostgreSQL example](https://www.bezkoder.com/angular-12-node-js-express-postgresql/)

> [Angular 13 + Node.js + Express + PostgreSQL example](https://www.bezkoder.com/angular-13-node-js-express-postgresql/)

> [Angular 14 + Node.js + Express + PostgreSQL example](https://www.bezkoder.com/angular-14-node-js-express-postgresql/)

Integration (run back-end & front-end on same server/port):
> [Integrate React with Node.js Restful Services](https://www.bezkoder.com/integrate-react-express-same-server-port/)

> [Integrate Angular with Node.js Restful Services](https://www.bezkoder.com/integrate-angular-12-node-js/)

> [Integrate Vue with Node.js Restful Services](https://www.bezkoder.com/serve-vue-app-express/)

## Project setup
```
npm install
```

### Run
```
node server.js
```
