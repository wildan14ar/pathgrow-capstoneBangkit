# PathGrow API

This is a backend server for PathGrow web applicataion using Express.js and MySQL.

#### Install dependencies

```bash
  npm install
```

#### `.env` File
Create a `.env` file in the root directory of your project. This file will hold all the environment-specific configurations for the application.

| Name          | Variable                                                                          |
| :------------ | :-------------------------------------------------------------------------------- |
| PORT          | `PORT`                                                                            |
| MySQL         | `DB_HOST` `DB_USER` `DB_PASSWORD` `DB_NAME`                                   |

#### Example `.env` File

You can use the following as a template for your `.env` file:

```env
PORT=xxxx

# MySQL Database Configuration
DB_HOST=xxxx
DB_USER=xxxx
DB_PASSWORD=xxxx
DB_NAME=xxxx

```
**Note**: Replace the placeholder values (`xxxx`) with your actual configuration details. Make sure not to commit your `.env` file to version control to keep your credentials secure.

- `PORT`: your server to listening to `PORT` you specify in here
- `DB_HOST`: your Database IP Address
- `DB_USER`: your database user name
- `DB_PASSWORD`: your database password
- `DB_NAME`: your database name

You can see the example of the `.env` file in the `env.example` file included in the root folder of the project.

## Run Local

After you install the dependencies and set the environment variables, you can start the server by running

```bash
  npm run start
```

## API Documentation📝

[API Documentation](https://documenter.getpostman.com/view/28687808/2sAYHzFNdV)

## Author 👥

- [@grnyoel](https://www.github.com/grnyoel)