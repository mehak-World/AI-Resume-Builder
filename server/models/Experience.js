const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
       company: {
        type: String,
        required: true
       },
       position: {
        type: String,
        required: true
       },
       startDate: {
        type: Date,
        required: true
       },
       endDate: {
        type: Date,
       },
       currentlyWorking: Boolean,
       jobDescription: String
})

module.exports = mongoose.model("Experience", experienceSchema)