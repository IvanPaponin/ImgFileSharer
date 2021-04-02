const multer = require('multer');
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});
const path = require('path');

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 100},
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).any('myImage');

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

module.exports = { upload, checkFileType };
