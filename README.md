# BE-Coding-Challenge

# Controller Pattern:

I have have separated the business logic from the presentation logic by using a separate TaskController class to handle HTTP requests and a separate TaskService class to handle the business logic. This is a common design pattern in web development that separates concerns and makes the code more modular and maintainable.

# Repository Pattern:

I have used the InjectModel decorator from NestJS to inject an instance of the TaskModel class into the TaskService class. This is a common design pattern in web development that abstracts the data access logic from the business logic. It allows to switch out the underlying data store (e.g., MongoDB, MySQL, etc.) without changing the business logic.

# Middleware Pattern:

I have used a custom middleware function called LoggerMiddleware to log incoming HTTP requests. This is a common design pattern in web development that allows to intercept and modify incoming HTTP requests before they reach the controller.

# Interceptor Pattern:

I have used a custom interceptor function called AuthInterceptor to verify incoming JWT tokens and add the user ID to the request object. This is a common design pattern in web development that allows to intercept and modify incoming HTTP requests before they reach the controller.

# Service Pattern:

I have used a TaskService class to encapsulate the business logic for listing tasks. This is a common design pattern in web development that abstracts the business logic from the controller and makes the code more modular and maintainable.

# Offset Pagination Pattern:

I have used the skip and limit methods of the Mongoose find method to implement pagination. This is a common design pattern in web development that allows to retrieve a subset of the data from a large dataset.

# Swagger Pattern:

I have used Swagger to document my API. This is a common design pattern in web development that allows to generate documentation for your API automatically.

Here is a link to the Swagger documentation for your API:

# http://localhost:3000/api

# Node JS version

18.15.0

## Description

BE-Coding-challenge is a back-end coding challenge project aimed at demonstrating proficiency in a specific area of back-end development.

## Requirements

- Node.js (version 18.15.0 recommended)

## Installation

1. Clone the repository:

git clone [<repository-url>](https://github.com/zain-abbas-arhamsoft/BE-Coding-Challenge.git)

cd BE-Coding-challenge

2. Install dependencies:

npm install

3. To start the project, run:

npm run start

# how to Create a seeder to create the first Admin User in the database by running a command
npm run seed before starting an application

