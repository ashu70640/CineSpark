# CineSpark 🎬

CineSpark is a trailer-centric application built with React, designed to immerse users in a world of movie trailers. Powered by the TMDB API for real-time trailer data, CineSpark allows users to browse, filter, and save trailers to a watchlist, with a GPT-powered search for trailer recommendations. Featuring a responsive design and seamless trailer playback, CineSpark offers a Netflix-inspired platform for trailer enthusiasts.

## Features

### Authentication
- **Login/Signup Page**: Secure authentication using Firebase.
- **Sign In/Sign Up Form**: Intuitive forms with validation.
- **Redirects**: Redirect to `/login` if not authenticated, or to `/browse` after login.
- **User Profile**: Update display name and profile picture during signup.
- **Sign Out**: Seamless logout with authentication state cleanup.

### Browse (After Authentication)
- **Header**: Responsive navigation bar for easy access.
- **Featured Trailer Section**:
  - Background trailer playback (YouTube video, auto-playing and muted).
  - Trailer title and description styled with Tailwind CSS.
- **Trailer Collections**:
  - Multiple trailer lists (Now Playing, Popular, Trending, etc.) fetched via TMDB API.
  - Custom hooks (`useNowPlayingMovies`, `usePopularMovies`) to fetch movies and extract trailers.
- **Filters for User Preferences**: Filter trailers by movie genres, ratings, or release dates.
- **Watchlist Option**: Add/remove trailers to a persistent watchlist (stored locally).

### CineSpark-GPT (Trailer Search)
- **Search Bar**: GPT-powered search for trailer recommendations.
- **Trailer Suggestions**: Fetch trailers from TMDB based on GPT API results.
- **Multi-Language Support**: Toggle search bar language for accessibility.

### Performance & Optimization
- **Memoization**: Cache API data in Redux to avoid redundant calls.
- **Responsive Design**: Fully responsive UI with Tailwind CSS.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **State Management**: Redux (`userSlice`, `movieSlice`, `gptSlice`)
- **Authentication**: Firebase
- **APIs**: TMDB API (for trailer data), Open AI GPT API (for search recommendations)
- **Routing**: React Router
- **Deployment**: Deployed to production (e.g., Vercel/Netlify)
- **Environment**: Secured API keys in `.env` file

## Project Structure
- **Login/Signup**: Authentication forms and routing logic.
- **Browse Page**:
  - `MainContainer`: Displays the featured trailer with playback.
  - `SecondaryContainer`: Lists trailer collections with filtering and watchlist features.
- **CineSpark-GPT**: Search bar and trailer suggestion container.
- **Custom Hooks**: `useNowPlayingMovies`, `usePopularMovies`, `useMovieTrailer` for trailer data.
- **Components**: `Header`, `MovieCard`, `MovieList` (adapted for trailers).

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
