const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const File = require('./models/user'); // Corrected path to `user.js`

const app = express();

// Middleware setup
app.set("view engine", "ejs"); // Correctly structured
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Route: Home - Show list of files
app.get('/', async (req, res) => {
    try {
        const fileDocs = await File.find({}); // Using async/await for Mongoose query
        res.render('index', { files: fileDocs });
    } catch (err) {
        console.error("Error retrieving files from MongoDB:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route: View file content
app.get('/files/:filename', async (req, res) => {
    const filename = req.params.filename;

    try {
        const fileDoc = await File.findOne({ name: filename });
        if (!fileDoc) {
            return res.status(404).send("File not found");
        }
        res.render('show', { filename: fileDoc.name, filedata: fileDoc.details });
    } catch (err) {
        console.error("Error retrieving file from MongoDB:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route: Create a new file
app.post('/create', async (req, res) => {
    const { name, details, date } = req.body;

    try {
        const newFile = new File({ name, details, date });
        await newFile.save();
        res.redirect("/");
    } catch (err) {
        console.error("Error saving file to MongoDB:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:4000");
});
