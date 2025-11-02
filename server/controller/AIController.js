const ai = require("../config/ai");
const Experience = require("../models/Experience");
const Resume = require("../models/Resume");
const Project = require("../models/Project");
const Education = require("../models/Education");

const enhanceProfSummary = async (req, res) => {
  try {
    const { resume_id } = req.params;
    const { summary } = req.body;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: `You are a professional resume builder. Enhance this following summary to make it more professional and enhance it. Keep it 1-2 sentences long. ${summary}. Return ONLY the enhanced summary text`,
    });

    const enhancedSummary = response.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(enhancedSummary);

    // Update the database with that summary

    await Resume.findById(resume_id, { summary: response });

    res.status(200).send(enhancedSummary);
  } catch (err) {
    res.status(400).send("Error enhancing ai");
  }
};

const enhanceJobdesc = async (req, res) => {
  try {
    const { resume_id } = req.params;
    const { experienceId, jobDescription } = req.body;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: `You are a professional resume builder. Enhance this following job description to make it more professional and enhance it. Keep it 1-2 sentences long. ${jobDescription}. Return ONLY the enhanced jobDescription text`,
    });

    const enhancedDesc = response.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(enhancedDesc);

    // Update the database with that summary
    await Experience.findByIdAndUpdate(experienceId, {
      jobDescription: enhancedDesc,
    });

    res.status(200).send(enhancedDesc);
  } catch (err) {
    res.status(400).send("Error enhancing ai");
  }
};

const suggestSkills = async (req, res) => {
  try {
    const { resumeData } = req.body;
    console.log(resumeData);

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: `You are a professional resume builder. Suggest me 10 skills based on the experience, education, summary, and projects: ${JSON.stringify(
        resumeData,
        null,
        2
      )}. Just return an array with skill names`,
    });

    res.status(200).send(response.candidates?.[0]?.content?.parts?.[0]?.text);
  } catch (err) {
    res.status(400).send("Error suggesting skills");
  }
};

const uploadExistingResume = async (req, res) => {
  const { user_id } = req.params;
  const { resumeText, resumeTitle } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: `You are a professional resume builder. Extract the details from this resumeText ${resumeText} and return a resume object based on the following resume model:
      
      {
    personalInfo: {
      full_name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      profession: "",
      image: "",
    },
    title: "",
    summary: "",
    education: [{
        institution: "",
        degree: "",
        field: "",
        graduationDate: "",
        gpa: ""
    }],
    experiences: [{
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        jobDescription: "",
        currentlyWorking: false
    }],
    public: false,
    skills: [],
    projects: [{
        name: "",
        type: "",
        description: ""
    }],
    template: "Classic",
    accent: "black",
  }
      
      Limit the skills to 10 please. No more than 10 skills.
      
      `,
    });

    const resume = JSON.parse(
      response.candidates?.[0]?.content?.parts?.[0]?.text
        .replace(/```json|```/g, "")
        .trim()
    );
    console.log(resume);

    // Store the resume in the database

    const newRes = new Resume({
      personalInfo: { ...resume.personalInfo, image: "" },
      summary: resume.summary,
      skills: resume.skills,
      template: resume.template,
      public: resume.public,
      accent: resume.accent,
      updatedAt: Date.now(),
      clerkUserId: user_id,
      title: resumeTitle,
    });

    for (let edu of resume.education) {
      const newEdu = new Education(edu);
      await newEdu.save();
      newRes.education.push(newEdu._id);
    }

    for (let exp of resume.experiences) {
      console.log(exp);
      if (exp.endDate == "Present") exp.endDate = Date.now();
      const newExp = new Experience(exp);
      await newExp.save();
      newRes.experiences.push(newExp._id);
    }

    for (let proj of resume.projects) {
      const newProj = new Project(proj);
      await newProj.save();
      newRes.projects.push(newProj._id);
    }

    await newRes.save();
    console.log(newRes);
    res.status(200).send(newRes);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

module.exports = {
  enhanceProfSummary,
  enhanceJobdesc,
  suggestSkills,
  uploadExistingResume,
};
