const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const ResumeRouter = require("./routes/Resume.js")


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
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


app.listen(process.env.PORT, () => {
  console.log("The server is listening at PORT: ", process.env.PORT);
});
