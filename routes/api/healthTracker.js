const router = require('express').Router();
const db = require('../../controllers');

// Matches with "/api/healthTracker"
router.post('/newUser', (req, res) => {
  db.User.createUser(req, res);
});

router.post('/newDay', (req, res) => {
  db.Day.createDay(req, res);
});

router.post('/newExercise', (req, res) => {
  db.Exercise.addExercise(req, res);
});

router.get('/user/:id', (req, res) => {
  db.User.findUserById(req, res);
});

router.get('/day/:id', (req, res) => {
  db.Day.findDayByID(req, res);
});

//---------------------------------------------------------DUMMY AUTH ROUTES-------------------->>>>>>>>

const passport = require('passport');
require('../../config/passport')(passport);
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      console.log('user is loggd in to the get route');
      // Book.find((err, books) => {
      //   if (err) return next(err);
      //   res.json(books);
      // });
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      console.log('user is logged in to the post route');
      // Book.create(req.body, (err, post) => {
      //   if (err) return next(err);
      //   res.json(post);
      // });
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  }
);

getToken = function(headers) {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
