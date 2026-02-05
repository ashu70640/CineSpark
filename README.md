# 🎬 CineSpark — AI-Powered Movie Discovery Platform

CineSpark is a modern cinematic movie discovery platform designed to deliver an immersive browsing experience with intelligent recommendations, dynamic trailer previews, and responsive UI.

The application combines real-time movie data from TMDB with AI-inspired search capabilities to create a seamless exploration workflow — focused on performance, scalability, and clean UX.

---

## 🚀 Product Overview

CineSpark allows users to:

- Discover trending and popular movies
- Watch trailers instantly within a cinematic layout
- Use AI-style search for curated movie suggestions
- Maintain a personal watchlist
- Explore movie details via interactive modal overlays

The UI prioritizes immersive visuals, fast interaction, and smooth responsiveness across devices.

---

## ✨ Core Features

### 🔐 Authentication

- Firebase Authentication integration
- Sign Up / Sign In workflow
- Form validation with error handling
- Profile update support
- Protected routes with automatic redirection
- Real-time auth state monitoring

### 🎥 Movie Browsing Experience

- Cinematic hero section with trailer background
- Autoplay trailer support using React Player
- Dynamic main featured movie
- Horizontal scrollable movie rows
- Reusable movie card components
- TMDB image CDN integration

### 🤖 AI-Inspired Movie Discovery

- GPT-style search interface
- Debounced search to prevent excessive API calls
- AI-generated movie suggestions
- TMDB data enrichment
- Multi-language support

### ❤️ Watchlist System

- Add movies to personal watchlist
- Redux-based global state management
- Navbar indicator with live updates

### 🎬 Trailer & Movie Details

- Modal-based trailer playback
- Detailed movie information overlay
- React Portal usage for layered UI rendering

### 📱 Responsive Design

- Mobile-first Tailwind CSS approach
- Adaptive layouts across devices
- Touch-friendly interactions for mobile users
- Cinematic responsive hero section

---

## 🧱 Tech Stack

### Frontend

- React
- Redux Toolkit
- Tailwind CSS

### APIs & Services

- TMDB API (movie data & trailers)
- Firebase Authentication
- OpenAI / GPT-style recommendation logic

### Libraries

- React Player
- React Router
- Custom Hooks architecture

---

## 🏗 Architecture Overview

The application follows a modular and scalable component architecture.

### UI Components

- Header
- MainContainer
- VideoTitle
- VideoBackground
- MovieCard
- MovieList
- TrailerModal
- MovieInfoModal
- GPT Search components

### State Management

Redux Toolkit slices:

- `userSlice` → Authentication state
- `moviesSlice` → Movie data & trailer state
- `watchlistSlice` → User watchlist
- `gptSlice` → AI search results
- `configSlice` → Language configuration

### Data Layer

Custom hooks manage async logic:

- Fetch now-playing movies
- Fetch trailer video data
- Memoization to prevent unnecessary API calls

---

## ⚡ Performance Optimizations

- Debounced search input
- Memoization via Redux store
- Conditional rendering for heavy components
- React Portal for modal performance and z-index isolation
- Optimized Tailwind responsive utilities

---

## 📁 Project Structure

```bash
src/
 ├── components/
 ├── hooks/
 ├── utils/
 ├── store/
 ├── constants/
```

---

## 🔧 Setup Instructions

### Clone repository

```bash
git clone <repository-url>
```

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build production version

```bash
npm run build
```

---

## 🔐 Environment Variables

Create `.env` file in project root:

```env
VITE_TMDB_API_KEY=
VITE_FIREBASE_CONFIG=
VITE_OPENAI_API_KEY=
```
