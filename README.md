# Express Demo
This project is for demonstration purpose for the Express.js development with vanilla JS project
- API Design: Restful, CRUD in general (users, games, game accounts)
  - Gateway separation: just system-apis, user-gateway, admin-gateway, public-gateway routes for simple demonstration in one project
  - Role-based authorization: included by gateway separation (Eg: only user role can access user-gateway APIs, only admin role can access admin-gateway APIs)
  - Resource-based authorization: only user or admin with appropriate ownership can manipulate his own resource data
- Database: Postgresql with MikroORM, knex-migrations

## Setup
- Suggested environment: 
  - Use Docker: Intel-based operating systems (Windows, MacOS, Linux)
  - Run project locally without Docker: Ubuntu LTS (22.04/24.04)
### Install Docker
in-progress, will available here soon
### Install nvm and NodeJS
### Install Postgresql
### Setup Postgresql admin user
### Database migrations
- For current source code
```shell
# change development with desire env name
$ ./init_env.sh development
$ export DB_CONNECTION_STRING=postgresql://sample_admin:sampleAdmin2024@localhost:5432/postgres
$ yarn migrate:latest
```
- For further additional database update
```shell
$ yarn migrate:make your_migration_script_name
```
- To roll back last batch of migration
```shell
$ yarn migrate:rollback
```
- To run the next migration that has not yet been run
```shell
$ yarn migrate:up
```
- To run the specified migration that has not yet been run
```shell
$ yarn migrate:up your_migration_script_name.js
```
- To undo the last migration that was run
```shell
$ yarn migrate:down
```
- To undo the specified migration that was run
```shell
$ yarn migrate:down your_migration_script_name.js
```
- For first time migration (create_app_schema.js), the migration will use the exported admin user credential to set up new user and password along with the schema creation (the new user and password given in env.yaml file)
### Run project
- Without Docker
```shell
# replace development with the desire env to run (production for server)
$ ./run_service.sh development
```
- With Docker: in-progress, will available here soon