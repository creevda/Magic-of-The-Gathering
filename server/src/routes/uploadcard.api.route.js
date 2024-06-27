/* eslint-disable linebreak-style */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable prefer-template */
const router = require('express').Router();
const { Post } = require('../../db/models');

router.post('/posts', async (req, res) => {
  try {
    const post = await Post.create({
      img: req.file.filename,
      description: req.body.description,
      frazzle: req.body.frazzle,
      rarity: req.body.rarity,
      price: req.body.price,
    });

    res.status(200).json({ message: 'Данные успешно сохранены', post });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при сохранении данных', error });
  }
});

module.exports = router;