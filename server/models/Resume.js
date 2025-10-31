const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
     title: {
        type: String,
        required: true
    },
    clerkUserId: {
        type: String,
        required: true
    },
    summary: {type: String, default: ''},
    personalInfo: {
      full_name: {
        type: String,
        default: ""
      },
      email: {
         type: String,
         default: "",
      },
      phone: {type: String, default: ''},
      location: {type: String, default: ''},
      linkedin: {type: String, default: ''},
      website: {type: String, default: ''},
      profession: {type: String, default: ''},
      image: {type: String, default: ''}
    },
    education: [
        {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Education"
        }
    ],
    experiences: [
        {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Experience"
        }
    ],
    projects: [
        {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Project"
        }
    ],
    skills: [{type: String}],
    template: {
        type: String,
        default: "Classic"
    },
    accent: {type: String, default: "black"},
    public: {
        type: Boolean,
        default: false
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})
   
module.exports  = mongoose.model("Resume", resumeSchema)

