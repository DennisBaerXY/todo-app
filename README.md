# Todo Application with React, Express, MongoDB and Docker (MERN Stack)

This is a Todo Application built using React for the frontend, Express.js for the backend, and MongoDB for the database. The application is containerized using Docker.

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

### Installation

1. Clone the repository:

```
git clone https://github.com/DennisBaerXY/todo-app.git
```

2. Navigate to the project directory:

```
cd todo-app
```

3. Install the dependencies for the frontend:

```
cd frontend
npm install or yarn install
```

4. Install the dependencies for the backend:

```
cd ../backend
npm install or yarn install
```

### Configuration

You can use a .env file to configure the application. Create a .env file in the root directory and add the following:

```
MONGO_URI=<your-mongodb-uri>
VITE_APP_PORT=<your-frontend-port>
JWT_SECRET=<your-jwt-secret>
PORT=<your-backend-port>
```

you can also use the environment variables defined in the docker-compose.yml file.


### Running the Application

To start the application, run the following command from the root directory:
```
docker-compose up --build
```

This will start the frontend, backend and the database.
The Database will start on port 27017, the backend on port 8080 and the frontend on port 3000.

## Built With

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
  
- [Docker](https://www.docker.com/)

MERN Stack