const router = require('express').Router();
const statsRouter = require('./stats.api.router');
const tokensRouter = require('./tokens.api.router');
const cardsRouter = require('./cards.api.router');
const authRouter = require('./auth.api.router');

router.use('/auth', authRouter);
router.use('/tokens', tokensRouter);
router.use('/cards', cardsRouter);
router.use('/stats', statsRouter);

module.exports = router;
