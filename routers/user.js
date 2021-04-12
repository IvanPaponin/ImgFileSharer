const { Router } = require('express');
const fs = require('fs');
const deleteFileCallback = require('../controllers/deleteFile');
const Images = require('../db/images');
const User = require('../db/user');
const { upload } = require('../controllers/uploaders');
const protection = require('../controllers/protection');

async function addToDb(files, userId) {
  const user = await User.findById(userId);

  for (let i = 0; i < files.length; i++) {
    const filename = files[i].filename;
    const image = await Images.create({ filename });
    user.gallery?.unshift(image);
    await user.save();
  }
}

const router = Router();

router
  .route('/')
  .get(protection, async (req, res) => {
    const user = await User.findById(req.session?.user?._id).populate(
      'gallery'
    );
    // console.log(user);
    const userImages = user.gallery.map((el) => el.filename);
    res.render('profile', { userImages });
  })
  .post(protection, (req, res) => {
    upload(req, res, (err) => {
      // console.log(req.files);
      if (err) {
        return res.render('profile', { msg: err });
      } else {
        if (!req.files) {
          return res.render('profile', {
            msg: 'Error: No File Selected!',
          });
        }
        addToDb(req.files, req.session?.user?._id);
        res.json(req.files);
      }
    });
  })
  .delete(protection, async (req, res) => {
    let user = await User.findById(req.session?.user?._id).populate('gallery');
    const img = req.body.filename;
    // console.log(req.body);
    user.gallery = user.gallery.filter((el) => el.filename !== img);
    // console.log(user.gallery);
    await user.save();

    await Images.deleteOne(req.body);
    
    fs.unlink(`./public/uploads/${img}`, deleteFileCallback);
    res.end();
  });

module.exports = router;
