export const handleSignup = () => {
  // The base URL for the backend mock server on port 3001:
  const backendUrl = "https://authin-8wef.onrender.com";

  const signupForm = document.getElementById("signup-form");
  if (!signupForm) return;

  signupForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const firstName = signupForm.querySelector('input[placeholder="FirstName"]').value;
    const lastName = signupForm.querySelector('input[placeholder="LastName"]').value;
    const email = signupForm.querySelector('input[type="email"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;
    const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;
    const gender = signupForm.querySelector("select").value;
    const age = signupForm.querySelector('input[type="number"]').value;

    // Use JavaScript RegExp objects, not strings:
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$#!%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
      alert("Invalid email format.");
      return;
    }
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters, include one uppercase letter, and one number.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, gender, age }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Registration Successful!");
        window.location.href = "/"; // Adjust if your actual route differs
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    }
  });
};
