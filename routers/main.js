const { Router } = require('express');
const Images = require('../db/images');

const router = Router();

router.get('/', async (req, res) => {
  const images = await Images.find();
  const gallery = [];
  images.forEach( el => {
    gallery.push(el.filename);
  });
  res.render('main', {gallery})
});

module.exports = router;
