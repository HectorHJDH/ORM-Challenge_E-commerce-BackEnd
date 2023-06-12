const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
    // be sure to include its associated Products
    include: [{ model: Product }], 
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
    // be sure to include its associated Products
      include: [{ model: Product }], 
    });

    // If no category is found, return a 404 error
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    // Otherwise, return the category data
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);

    // If the category is successfully posted, return a message
    if (categoryData) {
      res.status(200).json({ message: 'Category posted!' });
      return;
    }

    // If the category is not successfully posted, return an error
    if (!categoryData) {
      res.status(404).json({ message: 'Category not posted!' });  
      return;
    }

    // If the category is successfully created, return the new category data
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
    try {
      const categoryData = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      // If no category is found, return a 404 error
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }

      // If the category is successfully updated, return a message
      if (categoryData) {
        res.status(200).json({ message: 'Category updated!' });
        return;
      }

      // Otherwise, return the category data
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // If no category is found, return a 404 error
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    // Otherwise, return the category data
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
