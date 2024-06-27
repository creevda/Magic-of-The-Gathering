const router = require('express').Router();
const { Post } = require('../../db/models');

router.post('/', async (req, res) => {
  const {
    name, category, price, city_owner, description, img, frazzle, sold, serialId,
  } = req.body;
  try {
    const card = await Post.create({
      name,
      category,
      price,
      city_owner,
      description,
      img,
      frazzle,
      sold,
      serialId,
    });
    res.json(card);
  } catch (error) {
    res.send(500);
  }
});

module.exports = router;
