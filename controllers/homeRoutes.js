const router = require('express').Router();
const { User, Blog_post } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all blogPost, sorted by name
    const blogData = await Blog_post.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    // Serialize user data so templates can read it
    const blogPost = blogData.map((project) => project.get({ plain: true }));

    // Pass serialized data into Handlebars.js template
    res.render('homepage', { users });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
