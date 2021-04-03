const express = require('express');
// const multer = require('multer');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
require('dotenv').config();
const User = require('./db/user');
const { connect } = require('mongoose');

const PORT = process.env.PORT;
const DB_CONNECT = process.env.DB_CONNECT;

const mainRouter = require('./routers/main');
const authRouter = require('./routers/auth');
const userRouter = require('./routers/user');

const app = express();

app.use(
  session({
    secret: 'kukuruza_v_banke',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 60000 * 60,
    },
    store: MongoStore.create({ mongoUrl: DB_CONNECT }),
  })
);

app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.env.PWD, './public')));

app.use(async (req, res, next) => {
  const userId = req.session?.user?._id;
  if (userId) {
    const currentUser = await User.findById(userId);
    if (currentUser) {
      res.locals.username = currentUser.username;
      res.locals.email = currentUser.email;
      // console.log('middlware===>', res.locals);
    }
  }

  next();
});

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log('server started!');
  connect(
    DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('BASE is OK!!!')
  );
});
