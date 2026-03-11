const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());
app.use(express.json());

const USERS_FILE = "./users.json";

function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, "[]");
    }
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
}

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const users = loadUsers();

    if (users.some(u => u.email === email)) {
        return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        name,
        email,
        password: hashedPassword
    };

    users.push(newUser);
    saveUsers(users);

    res.json({ message: "Registration successful" });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const users = loadUsers();

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).json({ message: "Invalid login credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid login credentials" });
    }

    res.json({ message: "Login successful", name: user.name });
});

app.post("/contact", (req, res) => {
    try {
        const { email, message } = req.body;

        if (!email || !message) {
            return res.status(400).json({ message: "Email and message are required." });
        }

        const MESSAGES_FILE = "./messages.json";

        if (!fs.existsSync(MESSAGES_FILE)) {
            fs.writeFileSync(MESSAGES_FILE, "[]");
        }

        const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf8"));

        const newMessage = {
            email,
            message,
            date: new Date().toISOString()
        };

        messages.push(newMessage);

        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));

        res.json({ message: "Thank you for your message. We will get back to you soon." });
    } catch (error) {
        console.error("Contact route error:", error);
        res.status(500).json({ message: "Server error while saving message." });
    }
});