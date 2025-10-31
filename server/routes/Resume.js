const express = require("express");
const router = express.Router();
const {isAuthorized} = require("../middlewares/authorization")
const upload = require("../config/multer.js")
const {createResume, getAllResumes, updateResume, deleteResume, getResumeById, getPdf} = require("../controller/ResumeController")

// Create Resume route
router.post("/:user_id", createResume)

// Get all resumes
router.get("/:user_id", getAllResumes)

// Update resume
router.post("/:user_id/:resume_id", isAuthorized, upload.single("image"), updateResume);

// Delete resume
router.post("/:user_id/:resume_id/delete", isAuthorized, deleteResume)

// Get resume by id
router.get("/:user_id/:resume_id", isAuthorized, getResumeById)


// Get pdf from the browser route
router.get("/:user_id/:resume_id/pdf", getPdf)


module.exports = router;