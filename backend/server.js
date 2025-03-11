const express = require("express");
const cors = require("cors");
const { registerUser, loginUser } = require("./config/db"); // Import JSON-based DB functions

const app = express();
app.use(express.json());
app.use(cors());
const axios = require('axios');
require('dotenv').config();

// Register API
app.post("/api/register", async (req, res) => {
    try {
        console.log("Received /api/register request");
        console.log("Request Body:", req.body); // Debugging log

        const result = await registerUser(req.body.username, req.body.password);
        
        console.log("Register Result:", result); // Debugging log

        if (result.success) {
            res.json({ message: "User registered successfully" });
        } else {
            res.status(400).json({ error: result.error });
        }
    } catch (error) {
        console.error("Registration Error:", error); // Debugging log
        res.status(500).json({ error: "Registration failed" });
    }
});

// Start Server

// Login API
app.post("/api/login", async (req, res) => {
    try {
        const result = await loginUser(req.body.email, req.body.password);
        if (result.success) {
            res.json({ token: "dummy-jwt-token" }); // Replace with real JWT logic
        } else {
            res.status(401).json({ error: "Invalid credentials !!!" });
        }
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});

app.get('/api/weather', async (req, res) => {
    try {
        const { city } = req.query;
        const apiKey = process.env.WHEATHER_API_KEY; // Check if this is correct
        console.log("API Key:", apiKey);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Weather API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));