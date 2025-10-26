const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      description: String
})

module.exports = mongoose.model("Project", projectSchema)