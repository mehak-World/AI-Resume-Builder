const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
        institution: {
            type: String,
        },
        degree: {
            type: String,
        },
        field: {
            type: String,
        },
        gpa: Number,
        graduationDate: Date
})

module.exports = mongoose.model("Education", EducationSchema)