# MovieVerse

MovieVerse is a full-stack web application for discovering movies and TV shows, creating reviews, and managing personal favorites and watchlists.

The application is being developed as part of a Bachelor's dissertation in Computing using the MERN technology stack.

---

# Technologies

### Frontend

- React.js
- React Router
- Vite

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
React Frontend
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
Mongoose Models
        │
        ▼
MongoDB
```

---

# Current Features

### Media

- Browse Movies
- Browse TV Shows
- Movie Details
- TV Show Details
- Frontend ↔ Backend Integration
- TMDb Data Normalization
- Loading & Error States
- Search Movies & TV Shows

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- User Profile Endpoint

### User Library

- Add to Favorites
- Remove from Favorites
- View Favorites
- Add to Watchlist
- Remove from Watchlist
- View Watchlist

### Reviews

- Create Review
- View Reviews by Movie or TV Show
- Update Own Review
- Delete Own Review
- Rating Validation
- Review Ownership Protection
- One Review per User and Media Item

### User Interface

- Login UI
- Register UI
- Profile Page
- Edit Username
- Change Password
- Change Avatar
- Logout
- Delete Account Confirmation

### Coming Soon

- Library Page
- Review UI Integration
- User Settings

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
- [ ] Library page integration
- [ ] Review UI integration

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

GET /api/search
```

---

# Roadmap

## Sprint 11

- Authentication Integration
- Persistent Login
- Protected Routes

## Sprint 12

- Favorites & Watchlist Integration
- Library Page

## Sprint 13

- Review UI Integration

## Sprint 14

- Search Integration
- UI Polish
- Performance Improvements
- Final Refactoring

---

# Project Status

🚧 Under Development
