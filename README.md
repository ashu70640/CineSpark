## CineSpark – AI‑powered movie discovery

-create react app
-configured tailwind css
-header
-Routing of App
-Login Form
-Sign Up form
-Form Validation
-useRef Hook
-Used Firebase for building authentication
-Deploying our app to production
-Create SignUp User Account
-Impliment Sign In user Api
-Created Redux Store with userSlice
-Implimented sign out
-Update Profile
-Bugfix:sign up user displayname and profile picture update
-bigfix:-if the user is not logged in redirect to /login page and vice-versa
-ubsubscribe to the onAuthStateChanges callback
-Add hardcoded value to the constants file
-Register TMDB API & create an app & get access token
-Get Data from TMDB now playing movies list API
-Custom hook for now playing Movies
-create movieSlice
-Update Store with movies Data
-Planning for MainContainer & secondaryContainer
-fetch Data for Trailer video data
-Update store with trailer video data
-embedded the youtube video and make it autoplay and mute
-tailwind classes to make main Container look awesome
-Build Secondary Component
-Build the movie list
-build movies card
-found out tmdb image CDN URL
-made the browse page better with tailwindcss
-usePopularmovies custom hook
-gpt search feature
-Gpt search bar
-(Bonus) Multi-language Feature in our App.
-Integrate the Gpt API
-GPT Search Open AI Api Key
-GPT search api call
-fetched GPT movie suggestion from TMDB API
-Created gptSlices added data
-Reused movie list component to make movie suggestion container
-Memoisation of api data
-added .env file
-Made our Site Responsive

# Features

->login/signup page
-sign In/sign up Form  
-redirect to browse page

->Browse(after authentication)
-->Header
-->Main Movie
-Trailer in background
-Title and discription
---->Movie suggestions
-movies list\*N

->netflix-gpt
-search bar
-movie suggestion

->used a concept of memoisation to avoid making api calls again and again instead will pick the data from redux store.
