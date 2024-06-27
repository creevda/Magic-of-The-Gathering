const router = require('express').Router();
const { Stat } = require('../../db/models');

router.post('/', async (req, res) => {
  const { user_id, post_id, serialId } = req.body;
  try {
    const stat = await Stat.create({ user_id, post_id, serialId });
    res.json(stat);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
