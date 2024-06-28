const router = require('express').Router();
const { Where } = require('sequelize/lib/utils');
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
})
.get('/', async (req, res) => {
  try {
    const entries = await Post.findAll();
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
})
.delete('/:id',  async (req, res) => {
  const { id } = req.params;

  try {
    const owner = await Stat.findByPk(id);
    const card = await Post.findByPk(id);
    if (res.locals.user.id === owner.user_id) {
      await card.destroy();
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.error(error);
    res.json(400);
  }
})
.put('/:id/edit', async (req, res) => {

  const { id } = req.params;
  const {name, category, price, city_owner,description,img,frazzle,sold  } = req.body;

  try {
    const card = await Post.findByPk(id);
    if (!card) {
      return res.status(404).json({ message: error });
    }

    card.name = name;
    card.category = category;
    card.price=price
    card.city_owner = city_owner;
    card.description=description
    card.img=img
    card.frazzle=frazzle
    card.sold=sold

    await card.save();

    res.json(card);
  } catch (error) {
    res.status(500).json({ message:  error });
  }
})
.put('/:id/buy', async (req, res) => {
  const { id } = req.params;
  const {serialId,
    name,
    category,
    city_owner,
    description,
    img,
    frazzle,
    sold}=req.body
  try {
    const [card, created] = await Post.findOrCreate({
      where:{serialId:id.toString()},
      defaults: {
        serialId,
        name,
        category,
        city_owner,
        description,
        img,
        frazzle,
        sold
      }
    });
    console.log((id),'+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    if (!card) {
      return res.status(404).json({ message: 'Карта не найдена' });
    }
    
    card.sold = true; 
    await card.save();

    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
     module.exports = router;
