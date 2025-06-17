# CineSpark 🎬

CineSpark is a dynamic movie browsing application built with React, offering an immersive experience for movie enthusiasts. Powered by the TMDB API for real-time movie data, it features trailer playback, personalized filtering, a watchlist, and a GPT-powered search. With a responsive design and seamless navigation, CineSpark delivers a Netflix-inspired platform.

## Features

### Authentication
- **Login/Signup Page**: Secure authentication using Firebase.
- **Sign In/Sign Up Form**: Intuitive forms with validation.
- **Redirects**: Redirect to `/login` if not authenticated, or to `/browse` after login.
- **User Profile**: Update display name and profile picture during signup.
- **Sign Out**: Seamless logout with authentication state cleanup.

### Browse (After Authentication)
- **Header**: Responsive navigation bar.
- **Main Movie Section**:
  - Background trailer playback (YouTube video, auto-playing and muted).
  - Movie title and description styled with Tailwind CSS.
- **Movie Suggestions**:
  - Multiple movie lists (Now Playing, Popular, Trending, etc.) via TMDB API.
  - Custom hooks (`useNowPlayingMovies`, `usePopularMovies`) for data fetching.
- **Filters for User Preferences**: Filter movies by genres, ratings, or release dates.
- **Watchlist Option**: Add/remove movies to a persistent watchlist (stored locally).

### CineSpark-GPT (Movie Search)
- **Search Bar**: GPT-powered movie recommendation search.
- **Movie Suggestions**: Fetch suggestions from TMDB based on GPT API results.
- **Multi-Language Support**: Toggle search bar language for accessibility.

### Performance & Optimization
- **Memoization**: Cache API data in Redux to avoid redundant calls.
- **Responsive Design**: Fully responsive UI with Tailwind CSS.

## Tech Stack
- **Frontend**: JavaScript, React, Tailwind CSS 
- **State Management**: Redux (`userSlice`, `movieSlice`, `gptSlice`)
- **Authentication**: Firebase
- **APIs**: TMDB API, Open AI GPT API
- **Routing**: React Router
- **Deployment**: Deployed to production (e.g., Vercel/Netlify)
- **Environment**: Secured API keys in `.env` file

## Project Structure
- **Login/Signup**: Authentication forms and routing logic.
- **Browse Page**:
  - `MainContainer`: Main movie with trailer background.
  - `SecondaryContainer`: Movie suggestion lists with filtering and watchlist.
- **CineSpark-GPT**: Search bar and movie suggestion container.
- **Custom Hooks**: `useNowPlayingMovies`, `usePopularMovies`, `useMovieTrailer`.
- **Components**: `Header`, `MovieCard`, `MovieList`.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Firebase account
- TMDB API key
- Open AI API key

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/cinespark.git
   cd cinespark
