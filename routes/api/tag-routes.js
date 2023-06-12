const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
    const tagData = await Tag.findAll({
    // be sure to include its associated Product data
    include: [{ model: Product }],
  });
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    const tagData = await Tag.findByPk(req.params.id, {
    // be sure to include its associated Product data
    include: [{ model: Product }],
    });

    // If no tag is found, return a 404 error
    if (!tagData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    // Otherwise, return the category data
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);

    // If the tag is successfully posted, return a message
    if (tagData) {
      res.status(200).json({ message: 'Tag posted!' });
      return;
    }

    // If the tag is not successfully posted, return an error
    if (!tagData) {
      res.status(404).json({ message: 'Tag not posted!' });  
      return;
    }

    // If the tag is successfully created, return the new tag data
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // If the tag is successfully updated, return a message
    if (tagData) {
      res.status(200).json({ message: 'Tag updated!' });
      return;
    }

    // If the tag is not successfully updated, return an error
    if (!tagData) {
      res.status(404).json({ message: 'Tag not updated!' });  
      return;
    }

    // If the tag is successfully updated, return the updated tag data
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const tagData = Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If the tag is successfully deleted, return a message
    if (tagData) {
      res.status(200).json({ message: 'Tag deleted!' });
      return;
    }

    // If the tag is not successfully deleted, return an error
    if (!tagData) {
      res.status(404).json({ message: 'Tag not deleted!' });  
      return;
    }

    // If the tag is successfully deleted, return the deleted tag data
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
