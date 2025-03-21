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
app.use(express.static(path.join(__dirname, "public")));

const dbFilePath = path.join(__dirname, "db.json");

const ensureDbExists = () => {
  if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify({ users: [] }, null, 2));
  }
};

const getUsers = () => {
  try {
    ensureDbExists();
    const data = fs.readFileSync(dbFilePath, "utf-8");
    const parsed = JSON.parse(data);
    return parsed.users || [];
  } catch (error) {
    console.error("Error reading db.json:", error);
    return [];
  }
};

const saveUsers = (users) => {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify({ users }, null, 2));
  } catch (error) {
    console.error("Error writing to db.json:", error);
  }
};

app.get("/", (req, res) => {
  res.send("Backend API is running.");
});

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
      res.json({ success: true, message: "Login successful", user, redirectUrl: "/navbar.html" });
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
