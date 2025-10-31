const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    // Unique filename: timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({storage: storage})

module.exports = upload