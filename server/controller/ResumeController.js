const Resume = require("../models/Resume");
const Education = require("../models/Education");
const Experience = require("../models/Experience");
const Project = require("../models/Project");
const fs = require('fs');
const client = require("../config/imageKit")

const createResume = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { title } = req.body;

    // Create a resume
    const resume = new Resume({ clerkUserId: user_id, title: title });
    await resume.save();

    console.log(resume);
    res.status(200).send(resume);
  } catch (err) {
    res.status(500).send(err?.message);
  }
};

const getAllResumes = async (req, res) => {
  try {
    const { user_id } = req.params;
   
    const allResumes = await Resume.find({ clerkUserId: user_id });
    res.send(allResumes);
  } catch (err) {
    res.status(400).json("Error fetching resumes");
  }
};

const updateResume = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    const { resume_id } = req.params;
    const image = req.file;

    // Fetch resume first
    let resume = await Resume.findById(resume_id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    let newImageURL = resume.personalInfo.image; // keep old image by default

    // If a new image was uploaded, upload to ImageKit first
    if (image) {
      const pathname = image.path;

      const response = await client.files.upload({
        file: fs.createReadStream(pathname),
        fileName: `resume-${Date.now()}.png`,
        folder: "user-resumes",
        transformation: { pre: "w-300, h-300, fo-face, z-0.75" },
      });

      newImageURL = response.url;

      fs.unlink(pathname, (err) =>
        err && console.error("Temp file delete error:", err)
      );
    }

    // Update main fields
    resume.personalInfo = { ...data.personalInfo, image: newImageURL };
    resume.summary = data.summary;
    resume.skills = data.skills;
    resume.template = data.template;
    resume.public = data.public;
    resume.accent = data.accent;
    resume.updatedAt = Date.now();

    // Delete old subdocs (AFTER image upload succeeded)
    await Education.deleteMany({ _id: { $in: resume.education } });
    await Experience.deleteMany({ _id: { $in: resume.experiences } });
    await Project.deleteMany({ _id: { $in: resume.projects } });

    // Reset arrays
    resume.education = [];
    resume.experiences = [];
    resume.projects = [];

    // Recreate new ones
    for (let edu of data.education) {
      const newEdu = await new Education(edu).save();
      resume.education.push(newEdu._id);
    }

    for (let exp of data.experiences) {
      const newExp = await new Experience(exp).save();
      resume.experiences.push(newExp._id);
    }

    for (let proj of data.projects) {
      const newProj = await new Project(proj).save();
      resume.projects.push(newProj._id);
    }

    await resume.save();

    const populatedResume = await Resume.findById(resume._id)
      .populate("education")
      .populate("experiences")
      .populate("projects");

    res.status(200).json({
      message: "Successfully updated",
      resume: populatedResume,
    });
  } catch (err) {
    console.error("Error updating resume:", err);
    res.status(400).json({ message: "Error updating the resume", error: err.message });
  }
};


const deleteResume = async (req, res) => {
  try {
    // Get the user id and the resume id
    const { user_id, resume_id } = req.params;

    const deletedResume = await Resume.findByIdAndDelete(resume_id);
     await Education.deleteMany({ _id: { $in: deleteResume.education } });
    await Experience.deleteMany({ _id: { $in: deletedResume.experiences } });
    await Project.deleteMany({ _id: { $in: deletedResume.projects } });
    res.send(deletedResume);
  } catch (err) {
    res.status(400).send("Error deleting resume");
  }
};

const getResumeById = async (req, res) => {
    try{
        const {resume_id} = req.params;
        const resume = await Resume.findById(resume_id).populate("education").populate("experiences").populate("projects");
        res.status(200).send(resume);
    }
    catch(err){
        res.status(400).send("Error fetching resume");
    }
}


module.exports = { createResume, updateResume, getAllResumes, deleteResume, getResumeById };
