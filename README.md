# MovieVerse

MovieVerse is a modern full-stack movies and TV shows discovery platform, developed as part of a Bachelor's dissertation. It combines the TMDb API with a custom backend to provide authentication, personal libraries, reviews and search functionality within a responsive MERN architecture.

---

## Highlights

- MERN Stack Architecture
- TMDb API Integration
- JWT Authentication
- Universal Search
- Personal Library (Favorites & Watchlist)
- MovieVerse Review System
- Responsive User Interface
- RESTful Backend API
- Layered Architecture (Controller → Service → Model)

# Technologies

### Frontend

- React.js
- React Router
- Vite
- Axios
- Context API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Helmet
- CORS
- Morgan

### External Services

- TMDb API

---

# 2. Requirements

## Requirements

- Node.js
- npm
- MongoDB
- TMDb API Key

---

# Installation

- Clone the repository:

```bash
git clone https://github.com/and-neo/MovieVerse
cd MovieVerse
```

- Install dependencies for both projects.

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

- Before running the application, create the required environment files.

Backend:
Create a .env file inside the backend directory based on env.example.

```js
The following values must be configured:
MONGODB_URI → MongoDB connection string.
JWT_SECRET → Secret key used to sign JWT tokens.
JWT_EXPIRES_IN → JWT expiration time.
TMDB_API_KEY → Personal TMDb API key.
TMDB_BASE_URL → TMDb API base URL.
```

Frontend:
Create a .env file inside the frontend directory.
Configure:

```js
VITE_API_BASE_URL=http://localhost:5000/api
```

Adjust the URL if the backend is hosted on a different server.

- Running the Application

The frontend and backend must be started separately.

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

Open the application in your browser using the URL provided by Vite (typically http://localhost:5173).

**Note**
This project was developed using the latest versions of the listed technologies at the time of development.
Depending on your operating system or environment, some package versions may differ.
If compatibility issues occur, install the latest compatible versions of the required dependencies.

---

# Project Structure

```text
MovieVerse/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── cast/
│   │   │   ├── common/
│   │   │   ├── home/
│   │   │   ├── library/
│   │   │   ├── media/
│   │   │   ├── profile/
│   │   │   └── reviews/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   │
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
│   │
│   └── ...
│
└── README.md
```

---

# Architecture

```text
React Components
        │
        ▼
Hooks / Context
        │
        ▼
Service Layer
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

---

# Application Features

MovieVerse allows users to:

- Browse trending and popular movies and TV shows.
- Search across both movies and TV shows from a single search bar.
- View detailed information including cast, reviews and similar media.
- Create, edit and delete personal reviews.
- Manage favorites and watchlist.
- Maintain a personal profile with authentication.

### Media

- Browse Movies
- Browse TV Shows
- Movie Details
- TV Show Details
- Frontend ↔ Backend Integration
- TMDb Data Normalization
- Loading & Error States
- Universal Search
- Search Suggestions
- Search Results Page

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Persistent Login
- User Profile Endpoint

### User Library

- Personal Library
- Favorites
- Watchlist
- Shared Library State
- Protected Library Page
- Live Library Synchronization

### Reviews

- MovieVerse Review System
- TMDb Reviews Integration
- Create Review
- Edit Own Review
- Delete Own Review
- Expandable Review Cards
- Review Validation
- Review Ownership Protection
- One Review per User and Media Item
- Live Review Updates

### User Interface

- Login UI
- Register UI
- Profile Page
- Library Page
- Search Suggestions Dropdown
- Edit Username
- Change Password
- Change Avatar
- Logout
- Delete Account Confirmation
- User Account Settings

### Future Improvements

- UI Polish

---

# API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

## Favorites

```http
GET    /api/favorites
POST   /api/favorites
DELETE /api/favorites/:contentType/:tmdbId
```

## Watchlist

```http
GET    /api/watchlist
POST   /api/watchlist
DELETE /api/watchlist/:contentType/:tmdbId
```

## Reviews

```http
POST   /api/reviews
GET    /api/reviews/:contentType/:tmdbId
PATCH  /api/reviews/:reviewId
DELETE /api/reviews/:reviewId
```

## Media

```http
GET /api/movies/trending
GET /api/movies/popular
GET /api/movies/:movieId

GET /api/tv/trending
GET /api/tv/popular
GET /api/tv/:tvId

GET /api/search?query={searchTerm}
```

---

# Current Progress

- [x] Project setup
- [x] React architecture
- [x] Routing
- [x] Layout
- [x] Media pages
- [x] Details pages
- [x] Authentication UI
- [x] Profile UI
- [x] Frontend component architecture
- [x] MongoDB schema design
- [x] Express server
- [x] MongoDB connection
- [x] Global error handling
- [x] JWT Authentication
- [x] User model
- [x] Review model
- [x] Favorites API
- [x] Watchlist API
- [x] Library service
- [x] Reviews API
- [x] Review service
- [x] Review ownership authorization
- [x] TMDb backend integration
- [x] Frontend and backend integration
- [x] Axios API layer
- [x] Movie service
- [x] TV service
- [x] Data normalization
- [x] Loading & error states
- [x] Authentication integration
- [x] Persistent login
- [x] Protected routes
- [x] Library page
- [x] Shared Library Context
- [x] Review UI integration
- [x] Universal Search
- [x] Search Suggestions
- [x] Search Results Integration
- [x] User Account Settings
- [ ] UI Polishing

---

# Completed Sprints

## Sprint 1 – Project Foundation

- Project setup
- React Router
- Main Layout
- Navbar
- Footer

## Sprint 2 – Home & Navigation

- Homepage
- Hero Section
- Search Bar
- Trending Section
- Responsive Layout

## Sprint 3 – Media Pages

- Movies Page
- TV Shows Page
- Search Results
- Reusable Media Components

## Sprint 4 – Media Details

- Dynamic Movie Details
- Dynamic TV Show Details
- MediaHero
- MediaOverview
- Cast
- Reviews
- Similar Media
- Scroll Restoration

## Sprint 5 – User Profile

- Login UI
- Register UI
- Reusable AuthForm
- Profile Page
- Account Actions
- Component Refactoring by Feature

## Sprint 6 – Backend Foundation

- Express Server
- MongoDB Connection
- User Model
- Review Model
- Global Error Handling
- JWT Authentication

## Sprint 7 – User Library

- Favorites API
- Watchlist API
- Generic Library Service
- Controller Refactoring
- Service Layer Architecture

## Sprint 8 – Reviews API

- Create Review
- Retrieve Reviews by Media Item
- Update Own Review
- Delete Own Review
- Review Service
- Ownership Authorization
- Duplicate Review Protection
- Postman Regression Testing

## Sprint 9 – TMDb Backend Integration

- TMDb Service
- Movie Endpoints
- TV Endpoints
- Search Endpoint
- External API Error Handling

## Sprint 10 – Frontend API Integration

- Axios Configuration
- Movie Service
- TV Service
- Home Integration
- Movies Integration
- TV Shows Integration
- Movie Details Integration
- TV Show Details Integration
- Data Normalization
- Loading & Error States

## Sprint 11 - Authentication Integration

- Auth Context
- JWT Persistence
- Protected Routes
- Login Integration
- Register Integration
- Profile Integration
- Navbar Authentication State
- Logout

## Sprint 12 – Library Integration

- Shared Library Context
- Favorites Integration
- Watchlist Integration
- Personal Library Page
- Library Navigation
- Live Profile Statistics

## Sprint 13 – Review UI Integration

- MovieVerse Reviews
- TMDb Reviews
- Unified Review Components
- Review Normalization
- Expandable Review Cards
- Review Form
- Create Review
- Edit Review
- Delete Review
- Login Prompt
- Live UI Synchronization

## Sprint 14 – Universal Search

- Search Service
- Search Results Integration
- SearchBar Navigation
- Debounced Search
- Search Suggestions
- Search Suggestions Dropdown
- Search Result Navigation
- Search UX Improvements
- User Settings

---

# Roadmap

## Sprint 15 – Polish

- UI Polish
- Performance Improvements
- Responsive Improvements
- Final Refactoring

---

# Project Status

🚧 Active Development

Current Progress: ~95% Complete
