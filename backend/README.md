# MovieVerse Backend

Backend implementation of the MovieVerse application.

The backend provides user authentication, user-generated content management and a REST API for retrieving movie and TV show information through the TMDb API.

---

# Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Axios

---

# Folder Structure

```
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
└── utils/
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
```

The `.env` file must not be committed to Git.

---

# Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

---

# Features

## Authentication

- User registration
- User login
- JWT authentication
- Protected routes

## User Features

- Favorites management
- Watchlist management
- Reviews and ratings

## TMDb Integration

MovieVerse retrieves movie and TV show information directly from the TMDb API.

Supported functionality:

- Weekly trending movies
- Popular movies
- Movie details
- Weekly trending TV shows
- Popular TV shows
- TV show details
- Multi-search (movies & TV shows)

Movie and TV detail endpoints automatically include:

- Cast
- Crew
- Similar content
- Videos

The frontend never communicates directly with TMDb. All requests are performed through the backend.

---

# Public API Endpoints

## Movies

| Method | Endpoint               | Description            |
| ------ | ---------------------- | ---------------------- |
| GET    | `/api/movies/trending` | Weekly trending movies |
| GET    | `/api/movies/popular`  | Popular movies         |
| GET    | `/api/movies/:movieId` | Movie details          |

Pagination:

```
/api/movies/popular?page=2
```

---

## TV Shows

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| GET    | `/api/tv/trending` | Weekly trending TV shows |
| GET    | `/api/tv/popular`  | Popular TV shows         |
| GET    | `/api/tv/:tvId`    | TV show details          |

Pagination:

```
/api/tv/popular?page=2
```

---

## Search

| Method | Endpoint                         | Description                |
| ------ | -------------------------------- | -------------------------- |
| GET    | `/api/search?query=value&page=1` | Search movies and TV shows |

Person results returned by TMDb are automatically excluded.

---

# Error Handling

The backend converts TMDb errors into standardized API responses.

Handled cases include:

- Invalid media IDs
- Invalid TMDb credentials
- Network failures
- Request timeouts
- Rate limiting
- External service failures

Example:

```json
{
    "status": "fail",
    "message": "The requested media could not be found."
}
```

---

# Backend Architecture

```
Client
   │
   ▼
Express Routes
   │
   ▼
Controllers
   │
   ▼
Services
   ├── MongoDB
   └── TMDb API
```

---

# Current Status

✅ User authentication

✅ Favorites API

✅ Watchlist API

✅ Reviews API

✅ TMDb Movie API

✅ TMDb TV API

✅ TMDb Search API

✅ Centralized error handling

⏳ Frontend integration (next sprint)
