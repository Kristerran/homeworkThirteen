const { Blog_post } = require('../models');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
      // Get all posts, sorted by name
      const postData = await Blog_post.findAll({
        where: {
            user_id: req.session.user_id,
          },
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      });
      if(!postData){
        res.render('./login')
      } else {
          // Pass serialized data into Handlebars.js template
          const blogPosts = postData.map((project) => project.get({ plain: true }));
          // Serialize user data so templates can read it
          res.render('profile', { blogPosts });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;