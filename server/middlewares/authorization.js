const Resume = require("../models/Resume")

const isAuthorized = async (req, res, next) => {
  try {
    const { user_id, resume_id } = req.params;
    const resume = await Resume.findById(resume_id);
    if (user_id == resume.clerkUserId) {
      next();
    } else {
      res.status(400).send("You are not authorized to delete this resume");
    }
  } catch (err) {
      res.status(400).send("You are not authorized to delete this resume");
  }
};

module.exports = {isAuthorized}
