// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";


// Its to load environment variables
import dotenv from 'dotenv';
dotenv.config();


// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Sign Up
const signupForm = document.querySelector(
  "#signup-form form"
);
signupForm.addEventListener(
  "submit",
  async (e) => {
    e.preventDefault(); // Prevent default form submission

    const username = document
      .getElementById("signup-username")
      .value.trim();
    const email = document
      .getElementById("signup-email")
      .value.trim();
    const password = document.getElementById(
      "signup-password"
    ).value;

    function validatePassword(password) {
      const minLength = 6;
      const hasNumber = /\d/;
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
      const hasUpperCase = /[A-Z]/;

      return (
        password.length >= minLength &&
        hasNumber.test(password) &&
        hasSpecialChar.test(password) &&
        hasUpperCase.test(password)
  );
    }

    if (!validatePassword(password)) {
      alert(
        "Password must be at least 6 characters long."
      );
      return;
    }

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      const user = userCredential.user;

      // Success
      alert(
        `Welcome, ${username}! Your account has been created.`
      );
      signupForm.reset();
      // Redirect to dashboard
      window.location.href = "dashboard.html";
    } catch (error) {
      // Handle errors
      console.error("Error signing up:", error);
      alert(error.message);
    }
  }
);

// Handle Log In
const loginForm = document.querySelector(
  "#login-form form"
);
loginForm.addEventListener(
  "submit",
  async (e) => {
    e.preventDefault(); // Prevent default form submission

    const email = document
      .getElementById("login-email")
      .value.trim();
    const password = document.getElementById(
      "login-password"
    ).value;

    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      const user = userCredential.user;

      // Success
      alert(
        `Welcome back, ${user.email}! You are now logged in.`
      );
      loginForm.reset();
      // Redirect to dashboard
      window.location.href = "dashboard.html";
    } catch (error) {
      // Handle errors
      console.error("Error logging in:", error);
      alert(error.message);
    }
  }
);

// Detect User Authentication State
onAuthStateChanged(auth, (user) => {
  if (
    window.location.pathname.endsWith(
      "sign-up-page.html"
    ) ||
    window.location.pathname === "/"
  ) {
    if (user) {
      // User is logged in
      console.log(
        "User is logged in:",
        user.email
      );
      // If already on login or signup page, redirect to dashboard
      if (
        window.location.href.includes(
          "sign-up-page.html"
        ) ||
        window.location.href.endsWith("/")
      ) {
        window.location.href = "dashboard.html";
      }
    } else {
      // User is logged out
      console.log("User is logged out");
      // If on dashboard page, redirect to login page
      if (
        window.location.href.includes(
          "dashboard.html"
        )
      ) {
        window.location.href =
          "sign-up-page.html";
      }
    }
  }
});

// Handle Log Out
const logoutButton = document.getElementById(
  "logout-button"
);
if (logoutButton !== null) {
  logoutButton.addEventListener(
    "click",
    async () => {
      try {
        await signOut(auth);
        alert("You have been logged out.");
        window.location.href =
          "sign-up-page.html";
      } catch (error) {
        console.error(
          "Error logging out:",
          error
        );
      }
    }
  );
}
