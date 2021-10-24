//CHANGE ME

const router = require("express").Router();
const { Comments } = require("../../models");


router.post("/:id", async (req, res) => {
  try {
    console.log(req.body)
    const comment = await Comments.create({
      ...req.body,
      post_id: req.params.id,
      user_id: req.session.user_id });
    console.log(comment);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const comment = await Comments.destroy({
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