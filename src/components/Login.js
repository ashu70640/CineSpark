import React, { useRef, useState } from "react";
import { Header } from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const handleButtonClick = () => {
    //validate the form data
    //checkValidData(email, password);

    const message = isSignInForm
      ? checkValidData(email.current.value, password.current.value)
      : checkValidData(
          email.current.value,
          password.current.value,
          name.current.value,
        );
    setErrorMessage(message);

    if (message) return;

    //SignIn and SignUp Logic

    if (!isSignInForm) {
      //Sign up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!

              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }),
              );

              // ...
            })
            .catch((error) => {
              // An error occurred

              setErrorMessage(error.message);
              // ...
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      //Sign In Logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed in - userCredential.user available if needed
          void userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  const toggleSignInForm = () => {
    // Add code to toggle the sign-in form
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="relative min-h-screen bg-black">
      {/* Header (logo only looks good here) */}
      <Header />

      {/* Background */}
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src={BG_URL}
          alt="background"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Auth Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md bg-black/80 backdrop-blur-xl
                   border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          {/* Brand + Tagline */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-white tracking-wide">
              CineSpark
            </h1>
            <p className="text-sm text-amber-400 mt-1">
              Trailers you love, one place.
            </p>
          </div>

          {/* Title */}
          <h2 className="text-xl font-medium text-white mb-6">
            {isSignInForm ? "Welcome back" : "Create your account"}
          </h2>

          {/* Name */}
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="w-full mb-4 px-4 py-3 rounded-lg
                       bg-white/10 text-white placeholder-white/50
                       focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          )}

          {/* Email */}
          <input
            ref={email}
            type="email"
            placeholder="Email address"
            className="w-full mb-4 px-4 py-3 rounded-lg
                     bg-white/10 text-white placeholder-white/50
                     focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          {/* Password */}
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 rounded-lg
                     bg-white/10 text-white placeholder-white/50
                     focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          {/* Error */}
          {errorMessage && (
            <p className="text-red-400 text-sm mb-4">{errorMessage}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            onClick={handleButtonClick}
            className="w-full py-3 rounded-lg bg-amber-400
                     text-black font-semibold
                     hover:bg-amber-300 active:scale-[0.98]
                     transition-all duration-200"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          {/* Toggle */}
          <p
            className="mt-6 text-sm text-white/70 text-center cursor-pointer
                     hover:text-amber-400 transition-colors"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New to CineSpark? Create an account"
              : "Already a member? Sign in"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
