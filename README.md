# Express Demo
This project is for demonstration purpose for the Express.js development with vanilla JS project
- API Design: Restful, CRUD in general (users, games, game accounts)
  - Gateway separation: just system-apis, user-gateway, admin-gateway, public-gateway routes for simple demonstration in one project
  - Role-based authorization: included by gateway separation (Eg: only user role can access user-gateway APIs, only admin role can access admin-gateway APIs)
  - Resource-based authorization: only user or admin with appropriate ownership can manipulate his own resource data
  - Note about system-apis: Better if only system apis contains service logic, other gateways (user, admin, public) will manipulate their requests by calling upstream system apis (SYSTEM internal auth)
- Database: Postgresql with MikroORM, knex-migrations

## Setup
- Suggested environment: 
  - Use Docker: Intel-based operating systems (Windows, MacOS, Linux)
  - Run project locally without Docker: Ubuntu LTS (22.04/24.04)
- The project guide will be primary focus on Linux env (specially Ubuntu). For Windows env, please install Docker for easier pipe
### Install Docker
- Follow the guide at: https://docs.docker.com/engine/install/#supported-platforms
- For example, ubuntu guide is at: https://docs.docker.com/engine/install/ubuntu/
- Linux post installation: https://docs.docker.com/engine/install/linux-postinstall/
### Easy installation for Ubuntu LTS (Include both NodeJS and Postgresql)
- Install git:
```shell
$ sudo apt-get install git curl
$ git clone https://github.com/ledaihoan/common-dev
$ cd common-dev/0-setup-base
$ ./install_env.sh
```
### Install nvm and NodeJS
- Install git and curl
```shell
$ sudo apt-get install -y git curl
```
- Install nvm
```shell
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```
- Install NodeJS: at the time of writing, the latest LTS version is 20.13.1
```shell
$ source ~/.nvm/nvm.sh
# at the time of writing, the latest LTS version is 20.13.1
$ nvm install --lts
$ npm i -g yarn pm2
```
### Install Postgresql
- Follow the guide at: https://www.postgresql.org/download/

### Setup Postgresql admin user
```shell
# start and enable postgresql
$ sudo sytemctl start postgresql && sudo systemctl enable postgresql
# login as postgres
$ sudo su - postgresql
~$ psql
postgres=~# CREATE USER sample_admin WITH LOGIN SUPERUSER PASSWORD 'sampleAdmin2024';
postgres=~# CREATE DATABASE express_demo;
```
### Database migrations
- If run without Docker, please install and start postgresql service follow the guide mentioned above
- With Docker installed:
```shell
./start_postgres_docker.sh
```
- For current source code
```shell
# change development with desire env name
$ . init_env.sh development
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
- With Docker:
```shell
# replace development with the desire env to run (production for server)
$ ./run_service.sh development docker
```
### Note
- Function included but just a simple & small mock-implemented stuff for concept demonstration:
  - KMS: service & cron & cli
  - Env vault: put in .env.yaml file
  - KMS rotation (force when needed for service operator):
```shell
# replace development with appropriate env
$ . init_env.sh development
$ node src/cli/force-rotate-super-user-token
```