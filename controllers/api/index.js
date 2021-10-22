const router = require('express').Router();
const {User, Blog_post, Comments} = require('../../models')
const commentRoute = require('./commentRoute')
const blogPostRoute = require('./blogPostRoute')
const userRoute = require('./userRoute')

router.use("/comment", commentRoute);
router.use("/blogPost", blogPostRoute);
router.use("/user", userRoute);


module.exports = router
