# MovieVerse

MovieVerse is a full-stack web application for discovering movies and TV
shows, creating reviews, and managing personal favorites and watchlists.

The application is being developed as part of a Bachelor's dissertation
in Computing using the MERN technology stack.

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

- Reviews API
- TMDb Backend Integration
- Library Page
- User Settings
- Admin Dashboard (Optional)

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
- [x] Error handling
- [x] JWT Authentication
- [x] User model
- [x] Review model
- [x] Favorites API
- [x] Watchlist API
- [x] Service layer
- [ ] Reviews API
- [ ] TMDb integration
- [ ] Frontend ↔ Backend integration

---

# Completed Sprints

## Sprint 1 -- Project Foundation

- Project setup
- React Router
- Main Layout
- Navbar
- Footer

## Sprint 2 -- Home & Navigation

- Homepage
- Hero Section
- Search Bar
- Trending Section
- Responsive Layout

## Sprint 3 -- Media Pages

- Movies Page
- TV Shows Page
- Search Results
- Reusable Media Components

## Sprint 4 -- Media Details

- Dynamic Movie Details
- Dynamic TV Show Details
- MediaHero
- MediaOverview
- Cast
- Reviews
- Similar Media
- Scroll Restoration

## Sprint 5 -- User Profile

- Login UI
- Register UI
- Reusable AuthForm
- Profile Page
- Account Actions
- Component Refactoring by Feature

## Sprint 6 -- Backend Foundation

- Express Server
- MongoDB Connection
- User Model
- Review Model
- Global Error Handling
- JWT Authentication

## Sprint 7 -- User Library

- Favorites API
- Watchlist API
- Generic Library Service
- Controller Refactoring
- Service Layer Architecture

---

# API Endpoints

## Authentication

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile

## Favorites

- GET /api/favorites
- POST /api/favorites
- DELETE /api/favorites/:contentType/:tmdbId

## Watchlist

- GET /api/watchlist
- POST /api/watchlist
- DELETE /api/watchlist/:contentType/:tmdbId

---

# Roadmap

## Sprint 8

- Reviews API
- Review CRUD
- Update Review
- Delete Review

## Future Sprints

- TMDb Backend Integration
- Frontend API Integration
- User Library Page
- User Settings
- Admin Dashboard (Optional)

---

# Project Status

🚧 Under Development
