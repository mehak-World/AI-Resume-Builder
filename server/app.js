const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const Resume = require("./models/Resume.js");
const Education = require("./models/Education.js");
const Experience = require("./models/Experience.js");
const Project = require("./models/Project.js");
const multer = require("multer");
const upload = multer({dest: "uploads/"});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const authMiddleware =  async (req, res, next) => {
      const {user_id, resume_id} = req.params;
      console.log(user_id);
      const resume = await Resume.findById(resume_id);
      if(user_id == resume.clerkUserId){
        next();
      }
      else{
        res.status(400).send("You do not have the right to delete this resume");
      }
}

// Database connection
main()
  .then(() => console.log("Successfully connected to the database"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://mehaknarang75419:${process.env.DATABASE_PASS}@cluster0.6tuitqz.mongodb.net/ResumeBuilder?appName=Cluster0`
  );
}

// Create resume route
app.post("/:user_id/resumes", async (req, res) => {
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
});

// Get all resumes
app.get("/:user_id/resumes", async (req, res) => {
  const {user_id} = req.params;

  const allResumes = await Resume.find({clerkUserId: user_id});
  res.send(allResumes);
})

// Update resume
app.post("/:user_id/resumes/:resume_id", upload.single("image"), async (req, res) => {
  const { user_id } = req.params;
  const { data } = req.body;

  const resume = await Resume.findByIdAndUpdate(
    req.params.resume_id,
    {
      ...data,
      education: data?.education || [],
      experiences: data?.experiences || [],
      image: "",
    },
    { new: true }
  );
  console.log("Updated res: " , resume)
  res.send(resume);
});

// Delete resume
app.post("/:user_id/resumes/:resume_id/delete", authMiddleware, async (req, res) => {
  // Get the user id and the resume id
  const {user_id, resume_id} = req.params;

  const deletedResume = await Resume.findByIdAndDelete(resume_id);
  console.log(deletedResume);
  res.send(deletedResume);
})

app.listen(process.env.PORT, () => {
  console.log("The server is listening at PORT: ", process.env.PORT);
});
