const router = require('express').Router();
const { User, Blog_post } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all blogPost, sorted by name
    const blogData = await Blog_post.findAll({
    });

    // Serialize user data so templates can read it
    const blogPost = blogData.map((project) => project.get({ plain: true }));
    console.log(blogPost)
    // Pass serialized data into Handlebars.js template
    res.render('homepage', {blogPost});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    // Get all posts, sorted by name
    const postData = await Blog_post.findAll({
      where: {
          user_id: req.session.user_id,
        },
    });
    if(!postData){
      res.render('./login')
    } else {
        // Pass serialized data into Handlebars.js template
        const blogPost = postData.map((project) => project.get({ plain: true }));
        // Serialize user data so templates can read it
        res.render('profile', { blogPost });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
