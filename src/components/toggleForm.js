export const toggleForm = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const showLogin = document.getElementById("show-login");
    const showRegister = document.getElementById("show-register");

    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // If logged in, hide both forms so only the navbar (and other content) are seen
    if (isLoggedIn) {
      if (signupForm) signupForm.style.display = "none";
      if (loginForm) loginForm.style.display = "none";
      return; // Exit early, no need to set up toggle logic
    }

    // Otherwise, user is not logged in: show signup by default, allow toggling
    if (!signupForm || !loginForm) return;

    // Display the signup form by default
    signupForm.style.display = "block";
    loginForm.style.display = "none";

    if (showLogin) {
      showLogin.addEventListener("click", (event) => {
        event.preventDefault();
        signupForm.classList.add("fade-out");
        setTimeout(() => {
          signupForm.style.display = "none";
          loginForm.style.display = "block";
          loginForm.classList.add("fade-in");
          signupForm.classList.remove("fade-out");
        }, 300);
      });
    }

    if (showRegister) {
      showRegister.addEventListener("click", (event) => {
        event.preventDefault();
        loginForm.classList.add("fade-out");
        setTimeout(() => {
          loginForm.style.display = "none";
          signupForm.style.display = "block";
          signupForm.classList.add("fade-in");
          loginForm.classList.remove("fade-out");
        }, 300);
      });
    }
  });
};
