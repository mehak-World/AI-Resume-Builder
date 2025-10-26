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
    summary: String,
    personalInfo: {
      full_name: {
        type: String,
      },
      email: {
         type: String,
      },
      phone: String,
      location: String,
      linkedin: String,
      website: String,
      profession: String,
      image: {
        filename: String,
        url: String
      }
    },
    education: [
        {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Education"
        }
    ],
    experience: [
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
        enum: ["Classic", "Minimal", "Modern", "Minimal Image"]
    },
    color: String,
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

