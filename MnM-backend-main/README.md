
# Node.js Backend Project for Spotify Integration

This Node.js project provides backend functionality for handling user authentication and Spotify API integration. It features user login/signup and Spotify services to get recommendations. The project is structured in a modular fashion with routes and controllers for easier scalability and maintainability.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [API Endpoints](#api-endpoints)
4. [Environment Variables](#environment-variables)
5. [Running the Project](#running-the-project)

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm (Node package manager)

### Installation
1. Install the dependencies:
    ```bash
    npm install
    ```

2. Configure environment variables by creating a `.env` file in the project root directory. The required variables are:
    ```plaintext
    SPOTIFY_CLIENT_ID=<your_spotify_client_id>
    SPOTIFY_CLIENT_SECRET=<your_spotify_client_secret>
    FRONTEND_URL=<your_frontend_url>
    ```

### Running the Project
To start the server, run:
```bash
npm start
```

This will start the server on `http://localhost:3000`.

## Project Structure

The project follows an MVC (Model-View-Controller) pattern to separate concerns and organize the code effectively.

- **index.js**: The entry point of the application, which sets up middleware and registers routes.
- **routes/**: Contains route handlers for various services. Routes are divided based on functionality.
    - **auth.js**: Routes related to user authentication (signup, login).
    - **spotify.js**: Routes related to Spotify API interactions (recommendations).
- **controllers/**: Contains the logic for handling different requests.
    - **authController.js**: Manages user authentication.
    - **spotifyController.js**: Manages Spotify API requests, including access token retrieval.
- **node_modules/**: Contains all dependencies installed via npm.
- **database.json/**: Contains all the users list.
  
## API Endpoints

- **/auth** - Authentication routes
  - **POST /auth/signup** - User signup
  - **POST /auth/login** - User login
  
- **/spotify** - Spotify API routes
  - **GET /spotify/recommendations** - Fetch Spotify music recommendations
  - **GET /spotify/token** - Retrieve the Spotify access token

## Environment Variables

- `SPOTIFY_CLIENT_ID`: Your Spotify app client ID
- `SPOTIFY_CLIENT_SECRET`: Your Spotify app client secret
- `FRONTEND_URL`: Your Front-end app URL (http://localhost:5173)

---
