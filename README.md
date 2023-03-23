
# Local setup

  

**Prerequisites**

- Download docker

- Download node

-  **Use yarn not npm**

- **Test**

  
  

**Download**

  

git clone git@github.com:patrikstep2000/NaloziAPI.git

  

**Install packages**

- Open terminal and go to app directory

- Then run comand **yarn**

- Open app in folder or editor

- Create .env file and copy .env.example file inside

- Ask teammate for data necessary

  

**Run app**

- In terminal run command yarn start:dev

  

# Setup database

  Docker should be installed at this point

- Run `docker run --name api-pg -e POSTGRES_USER=api -e POSTGRES_PASSWORD=api -p 5432:5432 -d postgres:latest`
- Put secrets in .env file
- Run migrations `yarn db:migrate`

Local connection string example = postgres://api:api@localhost:5432/api
  

# Run tests

`yarn test` 