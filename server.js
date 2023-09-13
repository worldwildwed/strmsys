const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');


const app = express();
const upload = multer({ dest: 'uploads/' }); // Specify the directory to store uploaded files

app.use(cors())

app.post('/upload', upload.single('videoFile'), (req, res) => {
    // console.table(req)
    // console.log(JSON.stringify(req, null, 4))
    console.log(req)
    console.log(typeof req.file)
    console.log(req.file)
    // console.log(req.file.length)
    console.log(' hit /upload ~~~ ')

    // Get the original file extension
  const originalExtension = path.extname(req.file.originalname);

  // Generate a new filename with the correct extension
  const newFilename = req.file.filename + originalExtension;

  // Rename the uploaded file
  fs.renameSync(req.file.path, path.join(req.file.destination, newFilename));

  if (!req.file) {
    return res.status(400).json({ error: 'No video file provided' });
  }

  // Process the uploaded file as needed (e.g., save it to a specific location, perform additional operations)

  res.status(200).json({ message: 'Video uploaded successfully' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});