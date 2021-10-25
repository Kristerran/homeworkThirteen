const User = require('./User');
const Blog_post = require('./Blog_post');
const Comments = require('./Comments')

User.hasMany(Blog_post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog_post.belongsTo(User, {
    foreignKey: 'user_id'
})

Blog_post.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})

Comments.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

module.exports = { User, Blog_post, Comments};
