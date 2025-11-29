const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Path to JSON database
const USERS_FILE = "./users.json";

// Load users safely
function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, "[]");
    }
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
}

// Save users safely
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Simple test route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Register endpoint
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    const users = loadUsers();

    // Check duplicate email
    if (users.some(u => u.email === email)) {
        return res.status(400).json({ message: "Email already registered" });
    }

    // Add new user
    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);

    res.json({ message: "Registration successful" });
});

// Login endpoint
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const users = loadUsers();

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(400).json({ message: "Invalid login credentials" });
    }

    res.json({ message: "Login successful", name: user.name });
});

// Start server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
