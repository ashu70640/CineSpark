// Global navigation/header: owns auth lifecycle wiring, GPT toggle, language
// selection, and watchlist entry point. Intentionally kept state-light.
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/GptSlice";
import { changeLanguage } from "../utils/configSlice";

export const Header = ({ onWatchlistClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const watchlistCount = useSelector((store) => store.watchlist.items.length);

  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Let the auth observer drive navigation and store cleanup.
      })
      .catch((error) => {
        navigate("/error");
        // Centralize error handling on a dedicated route to keep header lean.
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Mirror Firebase user into Redux so the rest of the app can remain
        // auth-agnostic and just consume `store.user`.
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // Keep subscription scoped to this header instance to avoid duplicate
    // listeners when the shell is ever refactored.
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearchClick = () => {
    //toggle GPT Search button
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/100 to-transparent pointer-events-none" />

      <nav className="relative flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 md:py-4">
        {/* Logo */}
        <Link
          to="/browse"
          className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-amber-400/80 rounded-lg"
        >
          <img
            className="h-8 sm:h-9 md:h-10 w-auto"
            src={LOGO}
            alt="CineSpark"
          />
        </Link>

        {/* Right side */}
        {user && (
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-3 md:gap-4">
            {/* Language selector — hide on mobile */}
            {showGptSearch && (
              <select
                className="hidden sm:block h-9 pl-3 pr-8 rounded-lg
                       bg-white/10 text-white text-sm font-medium
                       border border-white/20 backdrop-blur-sm
                       hover:bg-white/15 focus:outline-none
                       focus:ring-2 focus:ring-amber-400/60"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option
                    key={lang.identifier}
                    value={lang.identifier}
                    className="bg-gray-900 text-white"
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            {/* Watchlist is intentionally hidden in the GPT surface to keep the
                experience focused and avoid overlapping navigation paradigms. */}
            {!showGptSearch && (
              <button
                onClick={onWatchlistClick}
                className="relative h-9 w-9 rounded-lg
                       flex items-center justify-center
                       bg-white/10 hover:bg-white/20
                       transition-colors"
              >
                ❤️
                {watchlistCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1
                           bg-red-600 text-white
                           text-[10px] rounded-full
                           px-1.5 py-0.5"
                  >
                    {watchlistCount}
                  </span>
                )}
              </button>
            )}

            {/* GPT Search */}
            <button
              type="button"
              onClick={handleGptSearchClick}
              className="h-9 px-3 sm:px-4 rounded-lg
                     bg-amber-500 text-gray-900
                     text-xs sm:text-sm font-semibold
                     shadow-lg shadow-amber-500/25
                     hover:bg-amber-400
                     active:scale-[0.98]
                     transition-all duration-200"
            >
              {showGptSearch ? "Home" : "GPT"}
            </button>

            {/* Divider — hide on mobile */}
            <div className="hidden md:block w-px h-6 bg-white/20" />

            {/* Profile + Sign out */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Avatar */}
              <div
                className="w-8 h-8 md:w-9 md:h-9 rounded-full
                          overflow-hidden ring-2 ring-white/30
                          bg-gray-700 flex-shrink-0"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center
                              text-amber-400 font-semibold text-sm"
                  >
                    {user?.displayName?.[0] || user?.email?.[0] || "?"}
                  </div>
                )}
              </div>

              {/* Username — hide on mobile */}
              <span className="hidden md:inline text-white/90 text-sm font-medium max-w-[120px] truncate">
                {user?.displayName || user?.email?.split("@")[0]}
              </span>

              {/* Sign out — hide on mobile */}
              <button
                type="button"
                onClick={handleSignOut}
                className="hidden md:flex items-center justify-center
             h-9 px-4 rounded-lg
             text-white/90 text-sm font-medium
             border border-white/20
             hover:bg-white/10 hover:border-white/30
             active:scale-[0.98]
             transition-all duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
