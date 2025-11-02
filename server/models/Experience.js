const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
       company: {
        type: String,
       },
       position: {
        type: String,
       },
       startDate: {
        type: Date,
       },
       endDate: {
        type: Date,
       },
       currentlyWorking: Boolean,
       jobDescription: String
})

module.exports = mongoose.model("Experience", experienceSchema)