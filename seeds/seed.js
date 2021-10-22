const sequelize = require('../config/connection');
const { User, Blog_post } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json')
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Blog_post.bulkCreate(blogPostData, {
    individualHooks: true,
    returning: true,
  })

  process.exit(0);
};

seedDatabase();
