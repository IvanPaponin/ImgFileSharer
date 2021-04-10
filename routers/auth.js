const { Router } = require('express');
const User = require('../db/user');

const router = Router();

router
  .route('/signup')
  .get((req, res) => res.render('signup'))
  .post(async (req, res) => {
    const check = await User.findOne({ email: req.body.email });

    if (!check) {
      // console.log(' BODY  ==>>>', req.body);
      const newUser = await User.create(req.body);
      // console.log(newUser);
      if (newUser) {
        req.session.user = newUser;
      }
      return res.redirect('/');
    } else {
      res.locals.signupError = 'Такой пользователь уже зарегистрирован!';
      return res.render('signup');
    }
  });

router.route('/signin').get((req, res) => res.render('signin'))
.post(async (req, res) => {
  // console.log(' BODY  ==>>>', req.body);
  // const { username, password } = req.body;
  const dbUser = await User.findOne(req.body);
  // console.log(dbUser);
  if (dbUser) {
    req.session.user = dbUser;
    // console.log(dbUser);
    res.locals.username = dbUser.username;

    res.redirect('/');
    return;
  }
  res.locals.signinError = 'Неправильный пароль или адрес почты!!';
  res.render('signin');
});

router.get('/signout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
