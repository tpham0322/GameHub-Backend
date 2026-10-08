# GameHub Backend

The GameHub backend is a RESTful Express and Node.js API that powers the GameHub game discovery and collection platform.

The backend handles authentication, game data, user collections, reviews, ownership authorization, MongoDB operations, and communication with the RAWG Video Games Database API.

## Live API

Backend API:

https://gamehub-backend-3cjd.onrender.com

## Features

### Authentication

- User registration
- User login
- JWT authentication
- Password hashing with bcrypt
- Protected API routes
- Token-based authorization
- User ownership verification

### Game Discovery

- Search for games through RAWG
- Retrieve detailed game information
- Synchronize RAWG game data with MongoDB
- Store game information used by collections and reviews
- Keep the RAWG API key on the backend

### Game Collection

Authenticated users can:

- Add games to their collection
- View their collection
- Change game status
- Remove games
- Prevent duplicate games
- Only modify their own collection entries

Available statuses:

- Want to Play
- Playing
- Completed

The collection system provides full CRUD functionality.

### Reviews

Authenticated users can:

- Create reviews
- View reviews for a game
- Edit their own reviews
- Delete their own reviews
- Rate games from 1–5
- Add comments

The review system provides full CRUD functionality.

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Axios
- CORS
- dotenv
- RAWG Video Games Database API

## Backend Architecture

The backend follows a modular structure that separates routes, controllers, models, middleware, and database configuration.

The main structure is:

- `config/`
  - `db.js`
- `controllers/`
  - `authController.js`
  - `gameController.js`
  - `collectionController.js`
  - `reviewController.js`
- `middleware/`
  - `authMiddleware.js`
- `models/`
  - `User.js`
  - `Game.js`
  - `Collection.js`
  - `Review.js`
- `routes/`
  - `authRoutes.js`
  - `gameRoutes.js`
  - `collectionRoutes.js`
  - `reviewRoutes.js`
- `server.js`

## API Architecture

The overall backend flow is:

Client → Express Route → Controller → Model/API → MongoDB/RAWG → Response

The React frontend communicates with the backend using REST API requests.

The backend communicates with:

- MongoDB Atlas for application data
- RAWG for external game data

## API Endpoints

### Authentication

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/auth/register` | Register a user | No |
| POST | `/api/auth/login` | Login a user | No |

### Games

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/api/games?search=minecraft` | Search for games | No |
| GET | `/api/games/:id` | Get game details | No |

Game data is retrieved from RAWG.

When detailed game information is requested, the backend synchronizes the game with MongoDB so that the game can be referenced by collections and reviews.

### Collection

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/api/collection` | Get user's collection | Yes |
| POST | `/api/collection` | Add game to collection | Yes |
| PUT | `/api/collection/:id` | Update collection status | Yes |
| DELETE | `/api/collection/:id` | Remove game from collection | Yes |

The collection endpoints provide full CRUD functionality.

### Reviews

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/api/games/:gameId/reviews` | Get reviews for a game | No |
| POST | `/api/games/:gameId/reviews` | Create a review | Yes |
| PUT | `/api/games/:reviewId` | Update a review | Yes |
| DELETE | `/api/games/:reviewId` | Delete a review | Yes |

The review endpoints provide full CRUD functionality.

## Authentication

GameHub uses JSON Web Tokens for authentication.

When a user successfully logs in, the backend generates a JWT containing the user's ID.

Authenticated requests send the token using the Authorization header:

`Authorization: Bearer TOKEN`

The `authMiddleware` verifies the token before allowing access to protected routes.

The decoded user ID is stored on the request:

`req.user = decoded`

Controllers use this ID to determine which resources belong to the authenticated user.

## Password Security

Passwords are never stored as plain text.

The `User` model uses bcryptjs to hash passwords before they are saved to MongoDB.

During login, the submitted password is compared with the stored hashed password.

This protects user passwords even if the database contents are exposed.

## Ownership Authorization

GameHub uses ownership-based authorization for user-owned resources.

For example, when updating a collection item, the backend checks both the collection item's ID and the authenticated user's ID.

This prevents one user from modifying another user's collection.

The same authorization pattern is used for reviews.

For example:

`Collection.findOne({ _id: id, user: req.user.id })`

and:

`Review.findOne({ _id: id, user: req.user.id })`

If the resource does not belong to the authenticated user, the backend returns a `404` response.

## MongoDB Models

### User

The User model stores account information.

Fields include:

- `username`
- `email`
- `password`
- `createdAt`
- `updatedAt`

### Game

The Game model stores game information synchronized from RAWG.

Fields include:

- `rawgId`
- `title`
- `description`
- `image`
- `genres`
- `platforms`
- `releaseDate`
- `createdAt`
- `updatedAt`

### Collection

The Collection model connects a user to a game.

Fields include:

- `user`
- `game`
- `status`
- `addedAt`
- `createdAt`
- `updatedAt`

The model uses a compound unique index on `user` and `game` to prevent the same user from adding the same game multiple times.

### Review

The Review model connects a user to a game.

Fields include:

- `user`
- `game`
- `rating`
- `comment`
- `createdAt`
- `updatedAt`

Ratings are restricted to values between 1 and 5.

## Database Relationships

The MongoDB relationships are:

User → Collection → Game

User → Review → Game

A user can have multiple collection entries and multiple reviews.

A game can appear in multiple users' collections and have multiple reviews.

Mongoose references are used to connect these documents.

The backend also uses `populate()` to retrieve related game and user information.

## RAWG API Integration

GameHub uses the RAWG Video Games Database API for game discovery.

The RAWG API key is stored in the backend environment variables.

The frontend never receives the RAWG API key.

The backend uses Axios to make requests to RAWG.

The game search endpoint retrieves results from RAWG.

The game details endpoint also synchronizes the selected game with MongoDB.

This allows the MongoDB Game document to be referenced by Collection and Review documents.

## Environment Variables

Create a `.env` file in the backend project.

Required variables include:

`PORT=5000`

`MONGO_URI=YOUR_MONGODB_CONNECTION_STRING/gamehub`

`JWT_SECRET=YOUR_SECRET_KEY`

`RAWG_API_KEY=YOUR_RAWG_API_KEY`

Do not commit `.env` to GitHub.

The `.gitignore` file includes:

`node_modules/`

`.env`

## Installation

Clone the repository:

`git clone YOUR_BACKEND_REPOSITORY_URL`

Move into the project directory:

`cd gamehub-backend`

Install dependencies:

`npm install`

Create a `.env` file and configure the required environment variables.

Start the development server:

`npm run dev`

The API will run on the configured port.

By default:

`http://localhost:5000`

## Production

The backend is deployed as a Render Web Service.

Production API:

https://gamehub-backend-3cjd.onrender.com

The production environment variables are configured through Render.

MongoDB Atlas is used as the production database.

## Production Architecture

The deployed application follows this architecture:

React Frontend
→
GameHub Express Backend
→
MongoDB Atlas

The backend also communicates with:

RAWG API

The frontend does not communicate directly with MongoDB or RAWG.

## Testing

The backend has been tested with the following workflows.

### Authentication

- User registration
- User login
- Password hashing
- JWT generation
- Invalid login handling
- Missing token handling
- Invalid token handling
- Protected routes

### Games

- RAWG game search
- RAWG game details
- Game synchronization with MongoDB
- MongoDB game references

### Collection

- Create collection entry
- Read collection
- Update collection status
- Delete collection entry
- Duplicate prevention
- Protected collection routes
- Collection ownership authorization

### Reviews

- Create review
- Read reviews
- Update review
- Delete review
- Rating validation
- Protected review routes
- Review ownership authorization

## CRUD Implementation

GameHub implements full CRUD functionality for two major resources.

### Collection CRUD

Create:

`POST /api/collection`

Read:

`GET /api/collection`

Update:

`PUT /api/collection/:id`

Delete:

`DELETE /api/collection/:id`

### Review CRUD

Create:

`POST /api/games/:gameId/reviews`

Read:

`GET /api/games/:gameId/reviews`

Update:

`PUT /api/games/:reviewId`

Delete:

`DELETE /api/games/:reviewId`

Game discovery is read-only because game information originates from the RAWG API.

## Error Handling

The backend returns appropriate HTTP status codes for common errors.

Examples include:

- `200` — Successful request
- `201` — Resource created
- `400` — Invalid request
- `401` — Authentication required or invalid authentication
- `404` — Resource not found
- `500` — Server error

Controllers return JSON responses containing error messages when requests fail.

## Security

GameHub includes several security measures:

- Password hashing with bcryptjs
- JWT authentication
- Protected routes
- Ownership authorization
- Environment variables for secrets
- Backend-only RAWG API key
- Duplicate collection prevention
- Mongoose validation
- Rating validation
- CORS support

## Project Structure

The complete backend structure is:

gamehub-backend/

- config/
  - db.js
- controllers/
  - authController.js
  - gameController.js
  - collectionController.js
  - reviewController.js
- middleware/
  - authMiddleware.js
- models/
  - User.js
  - Game.js
  - Collection.js
  - Review.js
- routes/
  - authRoutes.js
  - gameRoutes.js
  - collectionRoutes.js
  - reviewRoutes.js
- .env
- .gitignore
- package.json
- package-lock.json
- server.js

## Future Improvements

Possible future backend improvements include:

- Refresh tokens
- Password reset functionality
- Email verification
- Rate limiting
- Request validation middleware
- Pagination for game searches
- Advanced RAWG filtering
- Game recommendations
- User statistics
- Average community ratings
- Additional social features
- Improved API documentation

## Author

Truong Pham
