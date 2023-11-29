const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewRouter = require('./reviews.js');
const spotImageRouter = require('./spotImages.js');
const reviewImageRouter = require('./reviewImages.js');
const { setTokenCookie, restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewRouter);

router.use('/spot-images', spotImageRouter)

router.use('/review-images', reviewImageRouter)

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
  });


module.exports = router;
