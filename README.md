# User Management Microservice

## Overview
This project is a Node.js-based microservice for managing users. It provides APIs for creating, retrieving, and deleting users. The application uses **Express** for routing, **Sequelize** for database interactions, and **Joi** for data validation.

## Features
- **Add User**: Add a new user with name, email, and role (Admin, Editor, Viewer).
- **Fetch Users**: Retrieve a list of all users, with optional filtering by role.
- **Delete User**: Delete a user by their unique ID.

## Technologies Used
- **Node.js**
- **Express**
- **Sequelize** (ORM)
- **MySQL** (default database, configurable)
- **Joi** (input validation)
- **Jest** (unit testing)

## Folder Structure
```
project/
  src/
    controllers/    # API request handlers
    models/         # Sequelize models
    services/       # Business logic
  tests/            # Unit tests
  index.js          # Application entry point
```

## Prerequisites
- Node.js (>=14.x)
- MySQL (or another supported SQL database)
- npm (Node Package Manager)

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone https://github.com/Gazuma/OS_Microservices_Assignment
   cd OS_Microservices_Assignment
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Database**
   In `database.json` file in the `src` directory and add the following:
   ```bash
    const sequelize = new Sequelize('DATABASE_NAME','DATABASE_USER','DATABASE_PASSWORD',{
    host: `hostname`,
    dialect: 'mysql',
    port: PORT_NUMBER
    })
   ```

4. **Start the Application**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000/` by default.

## API Endpoints
### 1. Add User
**POST** `/users`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "Admin"
  }
  ```
- **Response**:
  - `201 Created`: User created successfully.
  - `400 Bad Request`: Invalid input.

### 2. Fetch Users
**GET** `/users`
- **Query Parameters** (optional):
  - `role`: Filter users by role.
- **Response**:
  ```json
  [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "Admin"
    }
  ]
  ```

### 3. Delete User
**DELETE** `/users/:id`
- **Response**:
  - `204 No Content`: User deleted successfully.
  - `404 Not Found`: User not found.

## Testing
Run unit tests using Jest:
```bash
npm test
```

## Assumptions
- The roles are predefined as `Admin`, `Editor`, and `Viewer`.
- Email addresses must be unique and valid.

## Github Co-Pilot Usage
- This project used Github Co-pilot for generating parts of some test cases, as well as for using helper function.

## License
This project is licensed under the MIT License.

