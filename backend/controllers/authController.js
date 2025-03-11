const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");
const { readDatabase, writeDatabase } = require("../db");


const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        let db = readDatabase();
        console.log("Database before registration:", db.users);  // Debug log

        const existingUser = db.users.find(user => user.username === username);
        if (existingUser) {
            console.log("User already exists:", username);
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        db.users.push({ username, password: hashedPassword });

        writeDatabase(db);
        console.log("Database after registration:", db.users);  // Debug log

        res.json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Error in registration:", err);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Read database
        const db = readDatabase();
        // Find user in JSON database
        const user = db.users.find(user => user.username === username);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { login, register };