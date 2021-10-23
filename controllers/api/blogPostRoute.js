const router = require("express").Router();
const { Blog_post } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Blog_post.findAll();
    res.status(200).json(postData)
  } catch (err) {
    console.log(err);
    res.json(err)
  }
})

router.post("/", async (req, res) => {
  try {
    const blogPost = await Blog_post.create({
      ...req.body,
    user_id: req.session.user_id});
    console.log(blogPost);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const blogPost = await Blog_post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!projectData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(projectData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;