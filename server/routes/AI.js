const express = require("express");
const aiRouter = express.Router();
const {isAuthorized} = require("../middlewares/authorization")
const {enhanceProfSummary, enhanceJobdesc, suggestSkills, uploadExistingResume} = require("../controller/AIController")

aiRouter.post("/:user_id/:resume_id/enhanceProfSumm", isAuthorized, enhanceProfSummary);
aiRouter.post("/:user_id/:resume_id/enhanceJobDesc", isAuthorized, enhanceJobdesc);
aiRouter.post("/:user_id/:resume_id/suggestSkills", isAuthorized, suggestSkills);
aiRouter.post("/:user_id/uploadResume", uploadExistingResume)

module.exports = aiRouter;