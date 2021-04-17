const { Router } = require('express');
const Images = require('../db/images');
const protection = require('../controllers/protection');

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    const images = await Images.find().sort({ createdAt: -1 });
    // console.log(images);
    const userId = req.session?.user?._id;

    res.render('main', { images, userId });
  })
  .patch(protection, async (req, res) => {
    // Likes
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

router
  .route('/card/:filename')
  .get(async (req, res) => {
    const img = await Images.findOne(req.params);
    const user = req.session?.user;
    res.render('image', { img, user });
  })
  .post(protection, async (req, res) => {
    // const user = req.session?.user;
    const img = await Images.findOne(req.params);
    img.comments?.unshift(req.body);
    await img.save();
    let newComment = img.comments.find(
      (comment) => comment.commentText === req.body.commentText
    );
    newComment = newComment._id;
    // console.log(req.params.filename);
    // console.log(newComment);
    res.json({ newCommentId: newComment, imgFilename: req.params.filename });
  })
  .delete(protection, async (req, res) => {
    const commentToDelete = req.body.commentToDelete;
    // console.log(req.params);
    // console.log(req.body);
    const img = await Images.findOne(req.params);
    img.comments = img.comments.filter(
      (comment) => String(comment._id) !== String(commentToDelete)
    );
    await img.save();
    res.end();
  });

module.exports = router;
