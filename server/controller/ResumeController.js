const Resume = require("../models/Resume");
const Education = require("../models/Education");
const Experience = require("../models/Experience");
const Project = require("../models/Project");
const puppeteer = require('puppeteer');
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
    const pathname = image.path;
    console.log(pathname)
    
   
    
    

    let resume = await Resume.findByIdAndUpdate(
      resume_id,
      {
        personalInfo: {...data.personalInfo, image: ''},
        summary: data.summary,
        skills: data.skills,
        template: data.template,
        public: data.public,
        accent: data.accent,
        updatedAt: Date.now(),
        
      },
      { new: true }
    );

     if(image){
      const response = await client.files.upload({ file: fs.createReadStream(pathname), fileName: 'myresume.png', folder: 'user-resumes', transformation: {
      pre: 'w-300, h-300. fo-face, z-0.75' 
    } });

    resume.personalInfo.image = response.url;
    }

    if (!resume) return res.status(404).json({ message: "Resume not found" });

    // Delete old refs
    await Education.deleteMany({ _id: { $in: resume.education } });
    await Experience.deleteMany({ _id: { $in: resume.experiences } });
    await Project.deleteMany({ _id: { $in: resume.projects } });

    // Clear arrays
    resume.education = [];
    resume.experiences = [];
    resume.projects = [];

    // Recreate subdocs
    for (let edu of data.education) {
      const newEdu = new Education(edu);
      await newEdu.save();
      resume.education.push(newEdu._id);
    }

    for (let exp of data.experiences) {
      const newExp = new Experience(exp);
      await newExp.save();
      resume.experiences.push(newExp._id);
    }

    for (let proj of data.projects) {
      const newProj = new Project(proj);
      await newProj.save();
      resume.projects.push(newProj._id);
    }

    await resume.save();

    console.log(resume)

    const populatedResume = await Resume.findById(resume._id)
      .populate('education')
      .populate('experiences')
      .populate('projects');

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

const getPdf = async (req, res) => {
  const {  resume_id } = req.params;

  // You can either:
  // 1) Have your frontend page (http://localhost:5173/view/{resumeId}) render publicly when accessed
  // 2) Or build server-side HTML from DB and set page.setContent(html) — this is preferred for auth-free generation

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Option A: navigate to your client preview route (if accessible to server)
    const url = `http://localhost:5173/view/${resume_id}`;
    await page.goto(url, { waitUntil: "networkidle2" });

    // Make sure print background is enabled
    const pdfBuffer = await page.pdf({
      format: "A3",
      printBackground: true,
      margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
    });

    console.log("Buffer = " , pdfBuffer)
    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=resume-${resume_id}.pdf`);
    return res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "PDF generation failed" });
  }
}

module.exports = { createResume, updateResume, getAllResumes, deleteResume, getResumeById, getPdf };
