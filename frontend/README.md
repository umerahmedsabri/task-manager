# Task Manager 

This is a simple task manager application built with a modern frontend and a robust backend. It allows users to efficiently manage their tasks with features like creation, viewing, editing, and deletion.

## Getting Started

This section provides a detailed guide on setting up and running the application. 

### Prerequisites

* **Node.js and npm:** Ensure you have Node.js and npm (Node Package Manager) installed on your system. You can download and install them from the official Node.js website [https://nodejs.org/en](https://nodejs.org/en).
* **PostgreSQL server:**  A PostgreSQL server needs to be running and accessible for the application to connect to the database. Refer to the official PostgreSQL documentation [https://www.postgresql.org/files/documentation/pdf/15/postgresql-15-A4.pdf](https://www.postgresql.org/files/documentation/pdf/15/postgresql-15-A4.pdf) for installation and configuration instructions.

### Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/task-manager.git
   ```

   Replace `https://github.com/umerahmedsabri/task-manager.git` with the actual URL of your cloned repository.

2. **Navigate to Project Directory:**

   ```bash
   cd task-manager
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```
   This command downloads and installs all the necessary libraries and dependencies required to run the application.

4. **Configure Database Connection:**

   Create a file named `.env` in the project root directory. This file will store your database connection details securely. Add the following environment variables to the `.env` file, replacing the placeholders with your actual database credentials:

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=task_manager
   ```

### Running the application

1. **Start PostgreSQL Server:**

   Ensure your PostgreSQL server is running and accessible before proceeding.

   This command executes database migrations to create the necessary tables required by the application in your PostgreSQL database.

2. **Start the Development Server:**

   ```bash
   npm start
   ```

   This command starts the development server. By default, the application runs on port `5000`. You can access the application in your web browser at [https://localhost:5000/](https://localhost:5000/).

### Features

* **Create Tasks:** Effortlessly add new tasks to your list.
* **View Tasks:** View a comprehensive list of all your tasks.
* **Edit Tasks:** Edit existing tasks, including the title and completion status.
* **Delete Tasks:** Remove tasks from your list when they're no longer needed.
