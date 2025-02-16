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
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById(
      "userName"
    ).textContent = user.displayName;
  }
});

const initialEvents = [
  {
    date: "2024-12-30",
    title: "Mock GSOC Interview",
  },
  {
    date: "2025-01-05",
    title: "DSA Problem Solving Session",
  },
  {
    date: "2025-01-10",
    title: "Project Review Meeting",
  },
  {
    date: "2025-01-15",
    title: "GSOC Organization Research",
  },
];



document.addEventListener(
  "DOMContentLoaded",
  () => {
    document.getElementById(
      "userName"
    ).textContent = userData.name;
    document.getElementById(
      "problemsSolved"
    ).textContent = userData.problemsSolved;
    document.getElementById(
      "githubStreak"
    ).textContent = userData.githubStreak;
    document.getElementById(
      "projectsCompleted"
    ).textContent = userData.projectsCompleted;
    document.getElementById(
      "gsocProgress"
    ).style.width = `${userData.gsocProgress}%`;
    document.getElementById(
      "progressPercent"
    ).textContent = userData.gsocProgress;

    const tabButtons = document.querySelectorAll(
      ".tab-button"
    );
    const tabContents = document.querySelectorAll(
      ".tab-content"
    );

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabName =
          button.getAttribute("data-tab");

        tabButtons.forEach((btn) =>
          btn.classList.remove("active")
        );
        button.classList.add("active");

        tabContents.forEach((content) => {
          content.classList.remove("active");
          if (content.id === tabName) {
            content.classList.add("active");
          }
        });
      });
    });

    const checkboxes = document.querySelectorAll(
      ".task-checkbox"
    );
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener(
        "change",
        updateProgress
      );
    });

    function updateProgress() {
      const totalTasks = checkboxes.length;
      const completedTasks = Array.from(
        checkboxes
      ).filter(
        (checkbox) => checkbox.checked
      ).length;
      const newProgress = Math.round(
        (completedTasks / totalTasks) * 100
      );

      document.getElementById(
        "gsocProgress"
      ).style.width = `${newProgress}%`;
      document.getElementById(
        "progressPercent"
      ).textContent = newProgress;
    }

    document
      .getElementById("logout-button")
      .addEventListener("click", async () => {
        try {
          await signOut(auth);
          window.location.href =
            "sign-up-page.html";
        } catch (error) {
          console.error("Logout error:", error);
          alert(
            "Error logging out. Please try again."
          );
        }
      });
  }
);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "sign-up-page.html";
  }
});

const userData = {
  name: "",
  problemsSolved: 0,
  githubStreak: 0,
  projectsCompleted: 0,
  gsocProgress: 0,
};

// Fetch user data from backend
async function fetchUserData() {
  try {
    const response = await fetch("/api/user");
    if (!response.ok) {
      throw new Error(
        "Network response was not ok"
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "There was a problem with the fetch operation:",
      error
    );
  }
}

// Update user data with fetched data
fetchUserData().then((data) => {
  if (data) {
    userData.name = data.name;
    userData.problemsSolved = data.problemsSolved;
    userData.githubStreak = data.githubStreak;
    userData.projectsCompleted =
      data.projectsCompleted;
    userData.gsocProgress = data.gsocProgress;
  }
});

// Initialize dashboard
document.addEventListener(
  "DOMContentLoaded",
  () => {
    // Update user info
    const userNameElem =
      document.getElementById("userName");
    if (userNameElem)
      userNameElem.textContent = userData.name;

    const problemsSolvedElem =
      document.getElementById("problemsSolved");
    if (problemsSolvedElem)
      problemsSolvedElem.textContent =
        userData.problemsSolved;

    const githubStreakElem =
      document.getElementById("githubStreak");
    if (githubStreakElem)
      githubStreakElem.textContent =
        userData.githubStreak;

    const projectsCompletedElem =
      document.getElementById(
        "projectsCompleted"
      );
    if (projectsCompletedElem)
      projectsCompletedElem.textContent =
        userData.projectsCompleted;

    const gsocProgressElem =
      document.getElementById("gsocProgress");
    if (gsocProgressElem) {
      gsocProgressElem.style.width = `${userData.gsocProgress}%`;
      gsocProgressElem.setAttribute(
        "aria-valuenow",
        userData.gsocProgress
      );
    }

    const progressPercentElem =
      document.getElementById("progressPercent");
    if (progressPercentElem)
      progressPercentElem.textContent =
        userData.gsocProgress;

    // Populate events
    const eventsList =
      document.getElementById("eventsList");
    initialEvents.forEach((event) => {
      const eventDiv =
        document.createElement("div");
      eventDiv.className = "event-item";
      // check Box is created
      const checkbox = document.createElement("input");
       checkbox.type = "checkbox";
       checkbox.className = "event-checkbox";
       checkbox.style.marginRight = "10px";
      eventDiv.innerHTML = `
            <h3>${event.title}</h3>
            <p class="date">${event.date}</p>
        `;
      // calling prepend on h3 so checkbox placed before event title  
      eventDiv.querySelector("h3").prepend(checkbox); 
      eventsList.appendChild(eventDiv);
      
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll(
      ".tab-button"
    );
    const tabContents = document.querySelectorAll(
      ".tab-content"
    );

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabName =
          button.getAttribute("data-tab");

        // Update active button
        tabButtons.forEach((btn) =>
          btn.classList.remove("active")
        );
        button.classList.add("active");

        // Update active content
        tabContents.forEach((content) => {
          content.classList.remove("active");
          if (content.id === tabName) {
            content.classList.add("active");
          }
        });
      });
    });

    // Task progress tracking
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener(
        "change",
        updateProgress
      );
    });

    /**
     * Updates the progress bar and percentage text based on the number of completed tasks.
     *
     * This function calculates the percentage of completed tasks by checking the state of checkboxes,
     * then updates the width of the progress bar and the text content of the progress percentage display.
     *
     * @function
     */
    function updateProgress() {
      const totalTasks = checkboxes.length;
      const completedTasks = Array.from(
        checkboxes
      ).filter(
        (checkbox) => checkbox.checked
      ).length;
      const newProgress = Math.round(
        (completedTasks / totalTasks) * 100
      );

      document.getElementById(
        "gsocProgress"
      ).style.width = `${newProgress}%`;
      document.getElementById(
        "progressPercent"
      ).textContent = newProgress;
    }
  }
);
// Add session timeout
let sessionTimeout;

function resetSessionTimeout() {
  clearTimeout(sessionTimeout);
  sessionTimeout = setTimeout(() => {
    signOut(auth);
    window.location.href = "sign-up-page.html";
  }, 1 * 10 * 1000); // 10 seconds
}

document.addEventListener(
  "mousemove",
  resetSessionTimeout
);
document.addEventListener(
  "keypress",
  resetSessionTimeout
);
