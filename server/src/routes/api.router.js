const router = require('express').Router();
const authRouter = require('./auth.api.router');


router.use('/auth', authRouter);

module.exports = router;