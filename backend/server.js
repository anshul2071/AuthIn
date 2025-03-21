import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve the Vite build from "../dist" (assuming "server.js" is in "backend/")
app.use(express.static(path.join(__dirname, "../dist")));

const dbFilePath = path.join(__dirname, "db.json");

function ensureDbExists() {
  if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify({ users: [] }, null, 2));
  }
}

function getUsers() {
  try {
    ensureDbExists();
    const data = fs.readFileSync(dbFilePath, "utf-8");
    const parsed = JSON.parse(data);
    return parsed.users || [];
  } catch (error) {
    console.error("Error reading db.json:", error);
    return [];
  }
}

function saveUsers(users) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify({ users }, null, 2));
  } catch (error) {
    console.error("Error writing to db.json:", error);
  }
}

app.get("/users", (req, res) => {
  const users = getUsers();
  res.json(users);
});

app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      // Redirect to front-end root ("/"), which your SPA can handle
      res.json({
        success: true,
        message: "Login successful",
        user,
        redirectUrl: "src/components/navbar.js"
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/signup", (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, age } = req.body;
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }
    const newUser = {
      id: Math.random().toString(16).slice(2),
      firstName,
      lastName,
      email,
      password,
      gender,
      age
    };
    users.push(newUser);
    saveUsers(users);
    res.json({ success: true, message: "Signup successful", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// For a single-page app, serve index.html for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
