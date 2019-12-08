import express from 'express';
import User from '../../models/user';

const router = express.Router();

router.use(
  ['/register', '/seeker-register', '/creator-register'], (req, res, next) => {
    res.locals.options.page = 'register';
    next();
  });

// pre-register page
router.get('/register', (req, res) => {
  res.render('pre-register', res.locals.options);
});

// student-register form
router.get('/seeker-register', (req, res) => {
  res.locals.options.register_type = 'Event Seeker';
  res.render('register', res.locals.options);
});

// event-creator-register form
router.get('/creator-register', (req, res) => {
  res.locals.options.register_type = 'Event Creator';
  res.render('register', res.locals.options);
});

const checkRegisterError = async (username, email) => {
  let userNameCount = await User.count({ username });
  let emailCount = await User.count({ email });
  let err;
  if (userNameCount || emailCount) {
    if (userNameCount) {
      err = new Error('Username already exists.');
    } else {
      err = new Error('Email already exists.');
    }
    err.status = 409;
  }
  return err;
};

// handle form submission for student
router.post('/seeker-register', async (req, res, next) => {
  const { username, email, password } = req.body;
  const userType = 'Event Seeker';
  const err = await checkRegisterError(username, email);
  if (err) {
    return res.status(err.status).render('error_views/auth-error',
      { error: err.message, link: '/seeker-register' });
  }
  User.create({
    username, email, password, userType
  })
    .then(user => {
      req.session.username = user.username;
      res.redirect('/');
    })
    .catch(err => {
      next(err);
    });
});

// handle form submission for event-creator
router.post('/creator-register', async (req, res, next) => {
  const { username, email, password } = req.body;
  const userType = 'event-creator';
  const err = await checkRegisterError(username, email);
  if (err) {
    return res.status(err.status).render('error_views/auth-error',
      { error: err.message, link: '/creator-register' });
  }
  User.create({
    username, email, password, userType
  })
    .then(user => {
      req.session.username = user.username;
      res.redirect('/');
    })
    .catch(err => {
      next(err);
    });
});


export default router;