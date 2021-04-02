const protection = function (req, res, next) {
  if (!req.session?.user) {
    // console.log(req.session?.user.username);
    res.redirect('/auth/signin');
    return;
  }
  next();
};
 module.exports = protection;
