# Simple File Viewer and Creator

This is a basic web application built with Node.js, Express.js, and MongoDB that allows users to view a list of files and their content, as well as create new files with a name, details, and date.

## Features

* **View File List:** Displays a list of all files stored in the MongoDB database on the homepage (`/`).
* **View File Content:** Allows users to click on a filename to view the detailed content of that file (`/files/:filename`).
* **Create New File:** Provides a form to create new files by specifying a name, details, and date, which are then saved to the database (`/create`).

## Technologies Used

* **Node.js:** JavaScript runtime environment for server-side development.
* **Express.js:** Minimal and flexible Node.js web application framework.
* **MongoDB:** NoSQL database to store file information.
* **Mongoose:** MongoDB object modeling tool designed to work in an asynchronous environment.
* **EJS (Embedded JavaScript templates):** Simple templating language to generate dynamic HTML views.

## Prerequisites

Before running this application, ensure you have the following installed:

* **Node.js:** Download and install from [https://nodejs.org/](https://nodejs.org/)
* **npm (Node Package Manager):** Usually comes bundled with Node.js.
* **MongoDB:** Install and set up a MongoDB server. You can follow the installation guide for your operating system on the official MongoDB website: [https://www.mongodb.com/docs/manual/installation/](https://www.mongodb.com/docs/manual/installation/)

## Setup and Installation

1.  **Clone the repository (if you have it on GitHub):**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure MongoDB Connection:**
    * Ensure your MongoDB server is running.
    * Open the main application file (e.g., `server.js` or the name of your main `.js` file).
    * **You will need to add the MongoDB connection URI.** This is typically done using Mongoose's `mongoose.connect()` method. Add the following line at the beginning of your file (replace `<your_mongodb_uri>` with your actual MongoDB connection string):

        ```javascript
        const mongoose = require('mongoose');

        mongoose.connect('<your_mongodb_uri>', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }).then(() => console.log('Connected to MongoDB'))
          .catch(err => console.error('Could not connect to MongoDB', err));

        // ... rest of your Express app code
        ```

        **Example MongoDB URI (for a local server):** `mongodb://127.0.0.1:27017/your_database_name` (replace `your_database_name`)

4.  **Create the `models` directory and `user.js` file:**
    * If you haven't already, create a directory named `models` in the root of your project.
    * Inside the `models` directory, create a file named `user.js` (as referenced in your code).
    * In `models/user.js`, define the Mongoose schema for your file data:

        ```javascript
        const mongoose = require('mongoose');

        const fileSchema = new mongoose.Schema({
          name: {
            type: String,
            required: true,
            unique: true // Optional: Ensures file names are unique
          },
          details: {
            type: String,
            required: true
          },
          date: {
            type: Date,
            default: Date.now
          }
        });

        module.exports = mongoose.model('File', fileSchema);
        ```

5.  **Create the `views` directory and EJS files:**
    * Create a directory named `views` in the root of your project.
    * Inside the `views` directory, create the following EJS files:
        * **`index.ejs` (for displaying the list of files):**
            ```html
            <!DOCTYPE html>
            <html>
            <head>
                <title>File List</title>
                <link rel="stylesheet" type="text/css" href="/css/style.css">
            </head>
            <body>
                <h1>Available Files</h1>
                <ul>
                    <% if (files.length > 0) { %>
                        <% files.forEach(file => { %>
                            <li><a href="/files/<%= file.name %>"><%= file.name %></a></li>
                        <% }); %>
                    <% } else { %>
                        <p>No files available.</p>
                    <% } %>
                </ul>

                <h2>Create New File</h2>
                <form action="/create" method="POST">
                    <div>
                        <label for="name">File Name:</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div>
                        <label for="details">Details:</label>
                        <textarea id="details" name="details" rows="5" required></textarea>
                    </div>
                    <div>
                        <label for="date">Date:</label>
                        <input type="date" id="date" name="date">
                    </div>
                    <button type="submit">Create File</button>
                </form>
            </body>
            </html>
            ```
        * **`show.ejs` (for displaying the content of a single file):**
            ```html
            <!DOCTYPE html>
            <html>
            <head>
                <title><%= filename %></title>
                <link rel="stylesheet" type="text/css" href="/css/style.css">
            </head>
            <body>
                <h1><%= filename %></h1>
                <p><strong>Details:</strong></p>
                <pre><%= filedata %></pre>
                <p><a href="/">Back to File List</a></p>
            </body>
            </html>
            ```

6.  **Create the `public` directory and `css` file (optional but recommended):**
    * Create a directory named `public` in the root of your project.
    * Inside the `public` directory, create a `css` directory.
    * Inside the `css` directory, create a file named `style.css` (or any other name you prefer) for your basic styling:

        ```css
        /* public/css/style.css */
        body {
            font-family: sans-serif;
            margin: 20px;
        }

        h1, h2 {
            color: #333;
        }

        ul {
            list-style: none;
            padding: 0;
        }

        li {
            margin-bottom: 5px;
        }

        a {
            text-decoration: none;
            color: blue;
        }

        a:hover {
            text-decoration: underline;
        }

        form div {
            margin-bottom: 10px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        input[type="text"],
        input[type="date"],
        textarea {
            width: 300px;
            padding: 8px;
            border: 1px solid #ccc;
            box-sizing: border-box;
        }

        button[type="submit"] {
            padding: 10px 15px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }

        button[type="submit"]:hover {
            background-color: #0056b3;
        }

        pre {
            white-space: pre-wrap; /* Preserve whitespace and wrap lines */
            background-color: #f4f4f4;
            padding: 10px;
            border: 1px solid #ddd;
            overflow-x: auto;
        }
        ```

## Running the Application

1.  Open your terminal or command prompt.
2.  Navigate to the root directory of your project.
3.  Start the server using the command:
    ```bash
    node <your_main_app_file_name>.js
    ```
    (Replace `<your_main_app_file_name>.js` with the actual name of your main JavaScript file, likely the one you provided in the initial code snippet).

4.  Open your web browser and navigate to `http://localhost:3000` (or `http://localhost:4000` as per your `listen()` call).

You should now be able to see the list of files (if any exist), click on them to view their content, and use the form to create new files.

## Further Improvements

This is a basic application and can be further improved with features like:

* **Error Handling:** More robust error handling and user feedback.
* **Styling:** More advanced and user-friendly CSS styling.
* **Data Validation:** Input validation on the server-side to ensure data integrity.
* **Editing and Deleting Files:** Functionality to modify or remove existing files.
* **User Authentication:** Security measures to control who can create and view files.
* **Search and Filtering:** Options to search for specific files or filter them based on criteria.

