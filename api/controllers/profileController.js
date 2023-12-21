// controllers/profileController.js

const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadProfilePicture = upload.single("profileImage");

const handleProfilePictureUpload = (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Save the file or its reference to the database
    // For simplicity, just return the file details for now
    res.status(200).json({ success: true, fileDetails: file });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  uploadProfilePicture,
  handleProfilePictureUpload,
};
