const { Router } = require('express');
// const fs = require('fs');
// const deleteFileCallback = require('../controllers/deleteFile');
const Images = require('../db/images');
const User = require('../db/user');
const { upload } = require('../controllers/uploaders');
const protection = require('../controllers/protection');

async function addToDb(files, userId) {
  for (let i = 0; i < files.length; i++) {
    const filename = files[i].filename;
    await Images.create({ filename });
    const user = await User.findById(userId);
    user.gallery?.push(filename);
    await user.save();
  }
}

const router = Router();

router.get('/profile', protection, async (req, res) => {
  const user = await User.findOne();
  const userImages = user.gallery;
  // console.log(userImages);
  res.render('profile', { userImages });
});

router
  .route('/upload')
  .get(protection, (req, res) => res.render('imgUploader'))
  .post((req, res) => {
    upload(req, res, (err) => {
      // console.log(req.files);
      if (err) {
        return res.render('imgUploader', { msg: err });
      } else {
        if (!req.files) {
          return res.render('imgUploader', {
            msg: 'Error: No File Selected!',
          });
        }
        addToDb(req.files, req.session?.user?._id);
        res.render('imgUploader', {
          msg: 'Files Uploaded!',
          // file: uploads/${req.files[0].filename}
          files: req.files,
        });
      }
    });
  });

module.exports = router;
