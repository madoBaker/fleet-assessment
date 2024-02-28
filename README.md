# Fleet Tracking Application

## Introduction

This fleet tracking application offers a comprehensive solution for monitoring and managing fleet activities. It adopts a monolithic repository approach for seamless integration between the backend and frontend via a shared module. Leveraging Redux for state management, React for the frontend, Node.js and TypeScript for the backend, and WebSockets for real-time communication, it stands as a robust solution for fleet management.

## Features

- Real-time fleet tracking and management.
- Integrated frontend and backend through a shared module.
- State management with Redux.
- Real-time updates with WebSockets.
- Built with React, Node.js, TypeScript, and MongoDB.

## Prerequisites

- Node.js (version 14 or above)
- npm (bundled with Node.js)
- MongoDB setup locally with port 27017 open

## Project Structure

The project is structured into three main directories:

- **`/fleet-assessment/frontend`**: This directory contains the React.js application that serves as the user interface for the fleet tracking system. It is designed to be dynamic, responsive, and user-friendly, providing real-time updates to the user.

- **`/fleet-assessment/backend`**: Here lies the Express.js application, which acts as the server-side component. It handles API requests, interacts with the MongoDB database, and communicates with the frontend through WebSockets for real-time data exchange.

- **`/fleet-assessment/shared`**: This shared module directory is utilized by both the frontend and backend. It includes common utilities, interfaces, and enums, ensuring consistency and facilitating the easy exchange of information between the client and server.

## Setup Instructions

1. **Clone the Repository**

   Clone the repository to your local machine.

    ```bash
    git clone <repository-url>
    ```

2. **Setup MongoDB**

   Ensure you have MongoDB set up locally with port 27017 open. This setup requires manual configuration and is not covered in these instructions.

3. **Install Dependencies**

   Before starting both the frontend and backend, you need to install their dependencies. Navigate to each directory (`/fleet-assessment/frontend` and `/fleet-assessment/backend`) and run the following command:

    ```bash
    npm install
    ```

   This command installs all the necessary dependencies for the project.

4. **Start the Backend**

   After installing the dependencies, navigate to the backend directory at `/fleet-assessment/backend` and run the following command to start the backend server:

    ```bash
    npm start
    ```

5. **Start the Frontend**

   Similarly, navigate to the frontend directory at `/fleet-assessment/frontend` and run the following command to start the frontend application:

    ```bash
    npm start
    ```

## Accessing the Application

- **Frontend**: Access the application by visiting `http://localhost:3000` in your web browser.
- **Backend API**: The backend API is accessible at `http://localhost:4040`.
- **API Documentation**: Swagger documentation is available at `http://localhost:4040/api-docs`.

## Usage

Navigate to the frontend URL to begin tracking your fleet in real-time. The backend and WebSocket services provide live updates, eliminating the need for page refreshes.

## License

This project is open-source and available under a free use license.
