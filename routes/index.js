const postRouter = require('./posts');
const userRouter = require('./user');

const router = require('express').Router();

router.use('/posts', postRouter);
router.use('/users', userRouter);

module.exports = router;