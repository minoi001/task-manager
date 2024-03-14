# task-manager

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have npm installed on your system. If not, please follow the instructions [here](https://www.npmjs.com/get-npm).
- You have Docker installed on your system. If not, please follow the instructions [here](https://docs.docker.com/get-docker/).

## Getting Started

To get started with this project, follow these steps:

1. Fork or clone the repository to your local machine.

   ```bash
   git clone https://github.com/your-username/project-name.git
   ```

2. Navigate to the project's root folder.

   ```bash
   cd task-manager
   ```

3. Install dependencies both in the root folder and the client folder.

   ```bash
   npm install
   cd client
   npm install
   ```

4. Create a `.env` file in the root folder and add the following variables:

   ```
   MONGO_DB_USER=your-mongodb-user
   MONGO_DB_PASSWORD=your-mongodb-password
   ```

## Setting up MongoDB

To set up MongoDB, follow these steps:

1. Create a MongoDB account if you haven't already.

2. Create a MongoDB Atlas project called `taskmanager`.

3. Within the `taskmanager` project, create a database called `tasks`.

4. Within the `tasks` database, create a cluster collection called `tasks` that uses ObjectIds.

## Running the Application

To run the application, follow these steps:

1. Ensure Docker is running on your system.

2. Navigate to the project's root folder.

   ```bash
   cd project-name
   ```

3. Run the following command to start the application using Docker:

   ```bash
   npm run build:client
   ```

4. Once the containers are up and running, you can access the react application at `http://localhost:3000` and the express application at `http://localhost:3002`.

## Additional Information

For more information on Docker, visit the [Docker documentation](https://docs.docker.com/).

For more information on npm, visit the [npm documentation](https://docs.npmjs.com/).

For more information on MongoDB Atlas, visit the [MongoDB Atlas documentation](https://docs.atlas.mongodb.com/).
