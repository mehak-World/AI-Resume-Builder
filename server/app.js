const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const ResumeRouter = require("./routes/Resume.js");
const aiRouter = require("./routes/AI.js");
const path = require("path")

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(
  cors()
);

// Database connection
main()
  .then(() => console.log("Successfully connected to the database"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://mehaknarang75419:${process.env.DATABASE_PASS}@cluster0.6tuitqz.mongodb.net/ResumeBuilder?appName=Cluster0`
  );
}

app.use("/resumes", ResumeRouter )
app.use("/ai", aiRouter)

// Serve React frontend for all other routes
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


app.listen(process.env.PORT, () => {
  console.log("The server is listening at PORT: ", process.env.PORT);
});
