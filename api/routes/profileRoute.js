// routes/profileRoute.js

const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

// Endpoint for handling profile picture uploads
router.post(
  "/upload",
  profileController.uploadProfilePicture,
  profileController.handleProfilePictureUpload
);

module.exports = router;
