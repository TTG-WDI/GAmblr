const db = require('../db/config');

module.exports = {

  //return every card in the database
  populateFeed() {
    return db.any(`SELECT *
                  FROM followers
                  INNER JOIN posts ON followers.following_id = posts.user_id
                  INNER JOIN users ON users.id = followers.following_id
                  WHERE followers.follower_id = 1`);
  },
  populateLikes() {
    return db.any(`SELECT * FROM posts
                  INNER JOIN likes ON posts.id = likes.post_id WHERE
                  likes.user_id = 1`)
  },

  addLike(post) {
    return db.one(`INSERT INTO likes (post_id, user_id)
                  VALUES ($[post_id], '1') RETURNING *`, post)
  },

  removeLike(post) {
    return db.none(`DELETE FROM likes WHERE post_id=$[post_id] and user_id = 1`, post)
  },

  createPost(post) {
  return db.one(`INSERT INTO posts (type, content, user_id, likes)
                VALUES ($[type], $[content], '1', $[likes])
                RETURNING *`, post)
  },

  userPage(user) {
    return db.any('SELECT users.user_name, users.pic, users.bg, users.blog_name, users.blog_desc, type, content, notes FROM users INNER JOIN posts on posts.user_id = users.id WHERE users.id = 1', user)
  }



//  addNote(post) {
//    return db.one('')
//  },
//  removeNote(post) {
//
//  }

}
