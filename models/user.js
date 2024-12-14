const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/techTalk", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB successfully.");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

// Define the File Schema
const fileSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Unique file name
    details: { type: String, required: true },           // File details
    date: { type: Date, required: true }                 // Creation date
});

module.exports = mongoose.model('File', fileSchema);
