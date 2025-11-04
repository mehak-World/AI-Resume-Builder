const express = require("express");
const router = express.Router();
const {isAuthorized} = require("../middlewares/authorization")
const upload = require("../config/multer.js")
const {createResume, getAllResumes, updateResume, deleteResume, getResumeById, updateTitle} = require("../controller/ResumeController")

// Create Resume route
router.post("/:user_id", createResume)

// Get all resumes
router.get("/:user_id", getAllResumes)

// Update resume
router.post("/:user_id/:resume_id", isAuthorized, upload.single("image"), updateResume);

// Update resume title
router.post("/:user_id/:resume_id/updateTitle", isAuthorized, updateTitle)

// Delete resume
router.post("/:user_id/:resume_id/delete", isAuthorized, deleteResume)

// Get resume by id
router.get("/:user_id/:resume_id", isAuthorized, getResumeById)



module.exports = router;