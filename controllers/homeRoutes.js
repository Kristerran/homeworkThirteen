const router = require('express').Router();
const { User, Blog_post, Comments } = require('../models');

router.get('/', async (req, res) => {
   try {
     // Get all blogPost, sorted by name
     const blogData = await Blog_post.findAll({
       include: Comments
     });
     const blogPost = blogData.map((project) => project.get({ plain: true }));
       res.render('homepage', {blogPost, logged_in:req.session.logged_in});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    if(req.session.logged_in){
      // Get all posts, sorted by name
      const postData = await Blog_post.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
      // Serialize user data so templates can read it
      const blogPost = postData.map((project) => project.get({ plain: true }));
      // Pass serialized data into Handlebars.js template
      res.render('dashboard', { blogPost,
        logged_in: req.session.logged_in});
      } else {
      res.redirect('/login')
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});


router.get('/register', async (req, res) => {
  try {
        res.render('register');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
    else{
      res.render('post', {logged_in: req.session.logged_in} )
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
