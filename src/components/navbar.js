export function Navbar() {
    const navbar = document.createElement("nav");
    navbar.classList.add("navbar");
    navbar.style.display = "none";
    navbar.innerHTML = `
      <div class="nav-container">
        <h2 class="logo"> Anshul's Website</h2>
        <ul class="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#" id="logout">Logout</a></li>
        </ul>
      </div>
    `;
    document.body.prepend(navbar);
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        navbar.style.display = "none";
        window.location.href = "index.html";
      });
    }
    if (localStorage.getItem("isLoggedIn") === "true") {
      navbar.style.display = "block";
    }
  }
  