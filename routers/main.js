const { Router } = require('express');
const Images = require('../db/images');

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    const images = await Images.find();
    const userId = req.session?.user?._id;

    res.render('main', { images, userId });
  })
  .patch(async (req, res) => {
    const image = await Images.findOne(req.body);
    const userId = req.session?.user?._id;

    if (image.likes.find((el) => String(el) === String(userId))) {
      image.likes = image.likes.filter((el) => String(el) !== String(userId));
      // console.log(image.likes);
      await image.save();
      return res.json({
        index: -1,
      });
    } else {
      image.likes?.push(userId);
      await image.save();
      return res.json({
        index: 1,
      });
    }
  });

module.exports = router;
