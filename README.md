# gtk-rest-nodejs-mysql

A simple REST API backend service to execute CRUD operations on MySQL database.

## Libraries

This project uses the following libraries and its dependencies:

* [express](https://www.npmjs.com/package/express)
* [cors](https://www.npmjs.com/package/cors)
* [mysql](https://www.npmjs.com/package/mysql)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)

## Database

This service performs the CRUD operations on MySQL database with the following DDL:

```
CREATE TABLE `person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

```