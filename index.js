const express = require("express");
const multer = require("multer");

const app = express();
const port = process.env.PORT || 3000;

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/upload"); // Set the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use a unique filename
  },
});

const upload = multer({ storage: storage });

// Set up a route for file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No files were uploaded.");
  }
  res.send("File uploaded successfully.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
