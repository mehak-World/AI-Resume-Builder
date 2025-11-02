const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
      name: {
        type: String,
      },
      type: {
        type: String,
      },
      description: String
})

module.exports = mongoose.model("Project", projectSchema)