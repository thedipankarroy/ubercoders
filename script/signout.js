import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";


// Its to load environment variables
import dotenv from 'dotenv';
dotenv.config();


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle logout
document
  .getElementById("logout-button")
  .addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "sign-up-page.html";
    } catch (error) {
      console.error("Logout error:", error);
      alert(
        "Error logging out. Please try again."
      );
    }
  });

// Check auth state
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "sign-up-page.html";
  }
});
