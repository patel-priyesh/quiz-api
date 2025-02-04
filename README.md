# Quiz API

## Description

Quiz API is a RESTful API built using **Node.js**, **Express.js**, and **MongoDB**. It allows users to manage quizzes and categories, supports user authentication and authorization, integrates email functionality, and ensures security through password hashing.

## Features

- **User Authentication & Authorization** (JWT-based login & signup)
- **Secure Password Hashing** (bcrypt)
- **Quiz & Category Management** (CRUD operations)
- **Email Notifications** (Nodemailer for automated emails)
- **Error Handling & Logging**
- **MongoDB Integration** (Mongoose for data modeling)

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **JWT (JSON Web Token)** for authentication
- **Bcrypt** for password security
- **Nodemailer** for email notifications

## API Endpoints

### Authentication

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| POST   | /auth/signup | Register a user |
| POST   | /auth/login  | User login      |

### User Management

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | /users     | Get all users  |
| GET    | /users/:id | Get user by ID |

### Quiz Management

| Method | Endpoint             | Description                   |   |
| ------ | -------------------- | ----------------------------- | - |
| GET    | /read                | Get all quizzes               |   |
| POST   | /create              | Create a new quiz             |   |
| GET    | /read/:id            | Get quiz by ID                |   |
| PUT    | /update/:id          | Update a quiz                 |   |
| DELETE | /deletequiz/:id      | Delete a quiz                 |   |
| POST   | /playquiz/:id        | Start playing a quiz          |   |
| POST   | /submit/:id          | Submit quiz answers           |   |
| POST   | /addquestion/:id     | Add a question to a quiz      |   |
| DELETE | /deletequestion/:id  | Delete a question from a quiz |   |

### Category Management

| Method | Endpoint     | Description           |
| ------ | ------------ | --------------------- |
| GET    | /read        | Get all categories    |
| POST   | /create      | Create a new category |
| GET    | /read/:id    | Get category by ID    |
| PUT    | /update/:id  | Update a category     |
| DELETE | /delete/:id  | Delete a category     |

## Security Measures

- **JWT Authentication** for secure access.
- **Bcrypt Password Hashing** for storing passwords safely.
- **Input Validation & Error Handling** to prevent attacks.

## Email Integration

- Sends confirmation emails on user registration.
- Notifies users about quiz updates.

