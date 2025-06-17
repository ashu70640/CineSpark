CineSpark
CineSpark is a modern, responsive web application built with React, integrating TMDB API for movie data and Firebase for authentication. It provides a Netflix-like experience with features like movie browsing, personalized recommendations, GPT-powered search, user preference filters, and a watchlist. The app is styled with Tailwind CSS and optimized with memoization for performance.
Features
Authentication

Login/Sign-Up Page: Users can sign in or create an account using email and password.
Form Validation: Ensures valid inputs for login and sign-up forms using React's useRef hook.
Firebase Authentication: Secure user authentication with Firebase, including sign-in, sign-up, and sign-out functionality.
Profile Management: Users can update their display name and profile picture.
Redirect Logic: 
Unauthenticated users are redirected to the /login page.
Authenticated users are redirected to the /browse page.


Sign-Out: Users can log out, unsubscribing from Firebase's onAuthStateChanged callback.

Browse Page (Post-Authentication)

Header: Consistent navigation bar across the app.
Main Movie Section:
Displays a trailer video in the background (YouTube embedded, auto-played, and muted).
Shows the movie title and description.


Movie Suggestions:
Multiple horizontally scrollable movie lists (e.g., Now Playing, Popular).
Each movie is displayed as a card with images sourced from TMDB's CDN.


Custom Hooks:
useNowPlayingMovies: Fetches and stores data from TMDB's Now Playing Movies API.
usePopularMovies: Fetches and stores data from TMDB's Popular Movies API.


Redux Store: 
Manages user data (userSlice), movie data (movieSlice), and trailer data.
Memoization prevents redundant API calls by caching data in the store.



CineSpark Search

Search Bar: Powered by Open AI's GPT API for intelligent movie recommendations.
Multi-Language Support: Users can search in multiple languages.
Movie Suggestions: Fetches movie suggestions from TMDB based on GPT API results.
Reusable Components: Uses the MovieList component for displaying search results.

Additional Features

User Preference Filters: Allows users to filter movie suggestions based on genres, ratings, or other preferences.
Watchlist: Users can add movies to a personal watchlist for later viewing.
Responsive Design: Optimized for desktops, tablets, and mobile devices using Tailwind CSS.

Tech Stack

Frontend: React, Tailwind CSS, React Router
State Management: Redux Toolkit
Authentication: Firebase
APIs: 
TMDB API (Now Playing, Popular Movies, and search)
Open AI GPT API (search suggestions)


Deployment: Production-ready, deployed using a hosting platform
Optimization: Memoization, environment variables (.env file), and custom hooks
Other: Babel for JSX, CDN-hosted React dependencies

Setup and Installation

Clone the Repository:git clone <repository-url>
cd cinespark


Install Dependencies:npm install


Configure Environment Variables:
Create a .env file in the root directory.
Add the following variables:REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_OPENAI_API_KEY=your_openai_api_key




Run the App:npm start


Build for Production:npm run build



Project Structure

Components: Reusable UI components (e.g., Header, MovieCard, MovieList).
Hooks: Custom hooks for API calls (e.g., useNowPlayingMovies, usePopularMovies).
Slices: Redux slices for state management (userSlice, movieSlice, gptSlice).
Constants: Hardcoded values stored in a constants file.
Routes: Configured with React Router for navigation between pages.
Styles: Tailwind CSS classes for responsive and modern UI.

APIs Used

TMDB API: 
Registered an app and obtained an access token.
Fetches movie data (Now Playing, Popular, and search results).


Open AI GPT API: 
Powers the CineSpark search feature for intelligent movie suggestions.
Integrated with TMDB API to fetch movie data based on GPT results.



Optimizations

Memoization: Prevents redundant API calls by caching data in the Redux store.
Environment Variables: Sensitive keys stored in .env file.
Custom Hooks: Encapsulate API logic for reusability and cleaner code.
Responsive Design: Tailwind CSS ensures a seamless experience across devices.

Bug Fixes

Fixed user display name and profile picture updates during sign-up.
Ensured proper redirection based on authentication status.
Unsubscribed from Firebase's onAuthStateChanged callback to prevent memory leaks.

Future Improvements

Add more filter options (e.g., by release year, language).
Implement offline support using service workers.
Enhance watchlist with sharing and notification features.

License
This project is licensed under the MIT License.
