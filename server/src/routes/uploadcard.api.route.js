/* eslint-disable linebreak-style */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable prefer-template */
const router = require('express').Router();
const { Post } = require('../../db/models');

router.post('/posts:id', async (req, res) => {
  try {
    const post = await Post.create({
      user_id: req.params.id,
      description: req.body.description,
      frazzle: req.body.frazzle,
      rarity: req.body.rarity,
      price: req.body.price,
      name: req.body.name,
      category: req.body.category,
      img: req.body.img,
      artist: req.body.artist,
      type: req.body.type,
      setName: req.body.setName,
    });
    res.status(200).json({ message: 'Данные успешно сохранены', post });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при сохранении данных', error });
  }
});

module.exports = router;