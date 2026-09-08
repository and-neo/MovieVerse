# MovieVerse

MovieVerse is a full-stack web application for discovering, exploring, and organizing movies and TV shows. It was developed as part of a Bachelor's dissertation and combines the TMDb API with a custom backend to provide authentication, personal libraries, reviews, search functionality, and a responsive user interface.

---

## Highlights

- MERN stack architecture
- TMDb API integration
- JWT authentication
- Universal search
- Personal Library with Favorites and Watchlist
- User review system
- Responsive user interface
- RESTful backend API
- Layered backend architecture

---

## Technologies

### Frontend

- React
- React Router
- Vite
- Axios
- Context API

### Backend

- Node
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- Helmet
- CORS
- Morgan

### External Services

- TMDb API

---

## Requirements

Before running the application, make sure the following are installed or available:

- Node
- npm
- MongoDB
- TMDb API key

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/and-neo/MovieVerse.git
cd MovieVerse
```

### 2. Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd ../frontend
npm install
```

### 3. Configure environment variables

#### Backend

Create a `.env` file inside the `backend` directory based on the provided `env.example`.

Configure the following values:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
```

#### Frontend

Create a `.env` file inside the `frontend` directory.

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Adjust the URL if the backend is running on a different host or port.

### 4. Run the application

The backend and frontend must be started separately.

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Open the application using the URL provided by Vite, typically:

```text
http://localhost:5173
```

---

## Project Structure

```text
MovieVerse/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   └── ...
│
└── README.md
```

---

## Architecture

```text
React Components
        │
        ▼
Hooks / Context
        │
        ▼
Frontend Services
        │
        ▼
Axios
        │
        ▼
Express Routes
        │
        ▼
Controllers
        │
        ▼
Services
        │
        ▼
Models
        │
        ▼
MongoDB
```

Movie and TV data are retrieved through the backend from the TMDb API, while MovieVerse stores only application-specific user data such as accounts, personal lists, and reviews.

---

## Application Features

### Media Discovery

- Browse trending and popular movies and TV shows
- Universal search across movies and TV shows
- Search suggestions
- Dedicated search results page
- Movie and TV show detail pages
- Cast information
- Similar titles
- Loading and error states

### Authentication and Profile

- User registration
- User login and logout
- JWT-based authentication
- Protected routes
- Persistent login
- Profile management
- Edit username
- Change password
- Change avatar
- Delete account

### Personal Library

- Favorites
- Watchlist
- Personal Library page
- Shared library state
- Live synchronization of library changes

### Reviews

- Create reviews containing a rating and written comment
- Edit own reviews
- Delete own reviews
- View MovieVerse reviews
- View available TMDb reviews
- Review validation
- Ownership protection
- One review per user and media item
- Live review updates

---

## API Endpoints

### Authentication

```http
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
PATCH  /api/auth/profile
DELETE /api/auth/profile
PATCH  /api/auth/password
```

### Favorites

```http
GET    /api/favorites
POST   /api/favorites
DELETE /api/favorites/:contentType/:tmdbId
```

### Watchlist

```http
GET    /api/watchlist
POST   /api/watchlist
DELETE /api/watchlist/:contentType/:tmdbId
```

### Reviews

```http
POST   /api/reviews
GET    /api/reviews/:contentType/:tmdbId
PATCH  /api/reviews/:reviewId
DELETE /api/reviews/:reviewId
```

### Movies

```http
GET /api/movies/trending
GET /api/movies/popular
GET /api/movies/:movieId
```

### TV Shows

```http
GET /api/tv/trending
GET /api/tv/popular
GET /api/tv/:tvId
```

### Search

```http
GET /api/search?query={searchTerm}
```

### System

```http
GET /api/health
```

---

## TMDb Attribution

Movie and TV show information, images, and related media used by MovieVerse are provided through The Movie Database (TMDb) API.

This product uses the TMDB API but is not endorsed or certified by TMDB.

---

## Project Status

MovieVerse was developed as part of a Bachelor's dissertation and the planned core functionality has been completed.
