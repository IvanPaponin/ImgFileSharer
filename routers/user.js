const { Router } = require('express');
// const fs = require('fs');
// const deleteFileCallback = require('../controllers/deleteFile');
const { upload } = require('../controllers/uploaders');
const protection = require('../controllers/protection');


const router = Router();

router.get('/profile', protection, (req, res) => res.render('profile'));

router.route('/upload').get(protection, (req, res) => res.render('imgUploader'))
.post((req, res) => {
  upload(req, res, (err) => {
    console.log(req.files);
    if(err) {
      return res.render('imgUploader', {msg: err})
    } else {
      if(!req.files) {
        return res.render('imgUploader', {
          msg: 'Error: No File Selected!'
        });
      }
      res.render('imgUploader', {
        msg: 'Files Uploaded!',
      // file: uploads/${req.files[0].filename}
      files: req.files,
    });
    }
  });
});


module.exports = router;
